import { useEffect } from 'react';

/**
 * Custom hook that detects clicks outside of a specified element.
 * Useful for closing dropdowns, modals, or menus when the user clicks elsewhere.
 *
 * @param {React.RefObject} ref - The ref of the element to detect clicks outside of.
 * @param {Function} handler - The function to call when a click outside is detected.
 */
export function useClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      // Call the handler if the click is outside
      handler(event);
    };

    // Add event listeners for mouse clicks and touch events
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    // Cleanup event listeners on component unmount or when ref/handler changes
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}