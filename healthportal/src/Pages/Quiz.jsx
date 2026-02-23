import React, { useState } from "react";
import { useAgeGroup } from '../AgeGroupContext';
import "./Quiz.css";




/**
 * Quiz Page Component
 * Displays a quiz with questions tailored to the user's age group.
 * Tracks score and provides feedback on answers.
 */
export default function Quiz() {
  // Access the current age group from context to select appropriate questions
  const ageGroup = useAgeGroup();

  // Define questions for different age groups
  const questionsByAge = {
    '5': [
      {
        question: "What is 2 + 2?",
        answers: ["3", "4", "5", "6"],
        correct: 1,
      },
      {
        question: "Which animal says 'moo'?",
        answers: ["Dog", "Cat", "Cow", "Duck"],
        correct: 2,
      },
      {
        question: "What color is a banana?",
        answers: ["Red", "Blue", "Yellow", "Green"],
        correct: 2,
      },
      {
        question: "How many wheels are on a bicycle?",
        answers: ["1", "2", "3", "4"],
        correct: 1,
      },
      {
        question: "What shape is a ball?",
        answers: ["Square", "Triangle", "Circle", "Star"],
        correct: 2,
      },
    ],
    '12': [
      {
        question: "What is the value of 7 × 8?",
        answers: ["56", "64", "40", "48"],
        correct: 0,
      },
      {
        question: "What is the square root of 144?",
        answers: ["11", "12", "13", "14"],
        correct: 1,
      },
      {
        question: "What is 12 × 4?",
        answers: ["24", "36", "48", "60"],
        correct: 2,
      },
      {
        question: "What is the capital of France?",
        answers: ["London", "Berlin", "Paris", "Madrid"],
        correct: 2,
      },
      {
        question: "What is 15% of 200?",
        answers: ["15", "20", "25", "30"],
        correct: 3,
      },
    ],
    '17': [
      {
        question: "What is the chemical symbol for Gold?",
        answers: ["Ag", "Au", "Pb", "Fe"],
        correct: 1,
      },
      {
        question: "Who wrote 'Romeo and Juliet'?",
        answers: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
        correct: 1,
      },
      {
        question: "What is the powerhouse of the cell?",
        answers: ["Nucleus", "Ribosome", "Mitochondrion", "Cell Wall"],
        correct: 2,
      },
      {
        question: "Solve for x: 2x + 5 = 15",
        answers: ["x = 5", "x = 10", "x = 7.5", "x = 2.5"],
        correct: 0,
      },
      {
        question: "In which year did World War II end?",
        answers: ["1942", "1945", "1950", "1939"],
        correct: 1,
      },
    ],
  };

  // Select questions based on age group, defaulting to age 12 if not found
  const questionsData = questionsByAge[ageGroup] || questionsByAge['12'];
  
  // State for quiz progress and user interaction
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);

  // Handler for selecting an answer option
  const handleSelect = (index) => {
    setSelectedAnswer(index);
  };

  // Handler for moving to the next question
  const handleNext = () => {
    if (selectedAnswer === null) return;

    // Check if the selected answer is correct
    const correct = selectedAnswer === questionsData[currentQuestion].correct;
    setIsCorrect(correct);
    setShowFeedback(true);

    // Update score if correct
    if (correct) setScore(score + 1);

    // Delay moving to the next question to show feedback
    setTimeout(() => {
      setShowFeedback(false);
      setSelectedAnswer(null);

      if (currentQuestion + 1 < questionsData.length) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setQuizComplete(true);
      }
    }, 1000);
  };

  // Handler to restart the quiz
  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowFeedback(false);
    setIsCorrect(false);
    setQuizComplete(false);
  };

  // Render completion screen if quiz is finished
  if (quizComplete) {
    return (
      <div className="quizCon">
        <div className="questionCon2">
        <h1>Quiz Complete!</h1>
        <div className="quizScore">
        <p>
          {score >= 3
            ? `You Passed with ${score} / ${questionsData.length} correct!`
            : `You Failed with ${score} / ${questionsData.length} correct!`}
        </p>
        </div>
        <button onClick={handleRestart} className="restartButton">
          Restart Quiz
        </button>
      </div>
      </div>
    );
  }

  // Get current question data
  const question = questionsData[currentQuestion];

  return (
    <div className="quizCon">
      <div className="questionCon">
        <h1>
          Question {currentQuestion + 1} / {questionsData.length}
        </h1>
        <h2>{question.question}</h2>
        <div className="quizScore">
          <h3>Score: {score} / {questionsData.length}</h3>
        </div>
        {/* Display feedback message */}
        {showFeedback && (
          <div
            className={`answerFeedback ${isCorrect ? "correct" : "incorrect"}`}
          >
            {isCorrect
              ? `Correct! The answer was ${question.answers[question.correct]}`
              : `Incorrect! The answer was ${
                  question.answers[question.correct]
                }`}
          </div>
        )}
        <div className="answerCon">
          {/* Render answer buttons */}
          {question.answers.map((answer, index) => (
            <button
              key={index}
              onClick={() => handleSelect(index)}
              className={`answerButton 
                ${selectedAnswer === index ? "selected" : ""} 
                ${
                  showFeedback && index === question.correct
                    ? "correctAnswer"
                    : ""
                } 
                ${
                  showFeedback && selectedAnswer === index && !isCorrect
                    ? "wrongAnswer"
                    : ""
                }
              `}
            >
              {answer}
            </button>
          ))}
        </div>

        

        <button id="nextButton" onClick={handleNext} disabled={selectedAnswer === null}>
          Next
        </button>


      </div>
    </div>
  );
}
