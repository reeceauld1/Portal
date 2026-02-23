//  Import required modules
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const os = require("os");
require("dotenv").config();

// Initialize Express application
const app = express();
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse JSON request bodies

// Database connection configuration
const poolConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME || "userpass",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 15000,
};

// Set host and port from environment variables or defaults
poolConfig.host = process.env.DB_HOST || "127.0.0.1";
poolConfig.port = Number(process.env.DB_PORT || 8889);

// Create a MySQL connection pool
const pool = mysql.createPool(poolConfig);

// Test the database connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Successfully connected to the database.");
  connection.release();
});

// Route to fetch all departments
app.get("/departments", (req, res) => {
  pool.query("SELECT id, department FROM departmenttable", (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Database error: " + err.message });
    }
    res.json(results);
  });
});

// Route to fetch all users with their department names
app.get("/userpasstable", (req, res) => {
  const sql = `
    SELECT u.*, d.department
    FROM userpasstable u
    LEFT JOIN departmenttable d ON u.dept_id = d.id
  `;
  pool.query(sql, (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Database error: " + err.message });
    }
    res.json(results);
  });
});

// Route for creating a new user (registration)
app.post("/register", (req, res) => {
  console.log("Register request received:", req.body);
  const { username, password, agegroup, dept_id } = req.body;
  if (!username || !password || agegroup === undefined || !dept_id) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  // Set a default avatar on registration
  const defaultAvatar = "avatar.jpg";
  const sql =
    "INSERT INTO userpasstable (username, password, agegroup, avatar, dept_id) VALUES (?, ?, ?, ?, ?)";
  pool.query(sql, [username, password, agegroup, defaultAvatar, dept_id], (err, results) => {
    if (err) {
      console.error("Insert error:", err);
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ error: "Username already taken." });
      }
      return res.status(500).json({ error: "Insert failed: " + err.message });
    }
    res.status(201).json({ id: results.insertId, username, agegroup });
  });
});

// Route for handling user login
app.post("/userpass", (req, res) => {
  console.log("Login request received:", req.body);
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "username and password are required" });
  }

  // Query to find user by credentials and join with department info
  const sql = `
    SELECT u.*, d.department, d.staff
    FROM userpasstable u
    LEFT JOIN departmenttable d ON u.dept_id = d.id
    WHERE u.username = ? AND u.password = ?
  `;
  pool.query(sql, [username, password], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ success: false, message: "Database error: " + err.message });
    }
    if (results.length > 0) {
      const user = results[0];
      res.json({ success: true, message: "Login successful!", agegroup: user.agegroup, avatar: user.avatar, department: user.department, staff: user.staff, created_at: user.created_at });
    } else {
      res.status(401).json({ success: false, message: "Invalid username or password." });
    }
  });
});

// Route for updating user details (username and password)
app.put("/user/:currentUsername", (req, res) => {
  const { currentUsername } = req.params;
  const { newUsername, newPassword } = req.body;

  // Check if the new username is already taken by another user
  const checkSql = "SELECT * FROM userpasstable WHERE username = ? AND username != ?";
  pool.query(checkSql, [newUsername, currentUsername], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ success: false, message: "Database error" });
    }
    if (results.length > 0) {
      return res.status(409).json({ success: false, message: "Username already taken." });
    }

    // Proceed with the update
    const updateSql = "UPDATE userpasstable SET username = ?, password = ? WHERE username = ?";
    pool.query(updateSql, [newUsername, newPassword, currentUsername], (err, updateResult) => {
      if (err) {
        console.error("Update error:", err);
        return res.status(500).json({ success: false, message: "Update failed" });
      }
      if (updateResult.affectedRows === 0) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
      res.json({ success: true, message: "Profile updated successfully." });
    });
  });
});

// Route for updating a user's avatar
app.put("/user/:username/avatar", (req, res) => {
  const { username } = req.params;
  const { avatar } = req.body;

  if (!avatar) {
    return res.status(400).json({ success: false, message: "Avatar is required." });
  }

  const sql = "UPDATE userpasstable SET avatar = ? WHERE username = ?";
  pool.query(sql, [avatar, username], (err, results) => {
    if (err) {
      console.error("Avatar update error:", err);
      return res.status(500).json({ success: false, message: "Avatar update failed." });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ success: false, message: "User not found." });
    }
    res.json({ success: true, message: "Avatar updated successfully." });
  });
});

// Start the server
const port = Number(process.env.PORT || 4000);
app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on port ${port}`);
  const networkInterfaces = os.networkInterfaces();
  Object.keys(networkInterfaces).forEach((interfaceName) => {
    networkInterfaces[interfaceName].forEach((iface) => {
      if (iface.family === 'IPv4' && !iface.internal) {
        console.log(`Network URL: http://${iface.address}:${port}`);
      }
    });
  });
});
