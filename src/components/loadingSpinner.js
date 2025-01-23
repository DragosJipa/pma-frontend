// client/src/components/loadingSpinner.js
import React, { useEffect, useState, useMemo } from 'react';

const LoadingSpinner = () => {
  const [messageIndex, setMessageIndex] = useState(0);

  // Array of messages to rotate
  const messages = [
    "Submitting data...",
    "Analyzing your responses...",
    "Generating recommendations...",
    "Almost there! Preparing your roadmap...",
    "Thank you for your patience, we're almost done!",
  ];

  // Memoize the timings array so it doesn't trigger re-renders
  const messageTimings = useMemo(() => [
    3000, // Time for first message (3 seconds)
    5000, // Time for second message (5 seconds)
    4000, // Time for third message (4 seconds)
    4000, // Time for fourth message (4 seconds)
    null  // Last message stays until loading ends (no timeout)
  ], []);

  useEffect(() => {
    // Function to handle message switching based on the timing array
    const updateMessage = () => {
      if (messageIndex < messages.length - 1) {
        setMessageIndex((prevIndex) => prevIndex + 1);
      }
    };

    // If the current message has a duration, set a timeout
    if (messageTimings[messageIndex] !== null) {
      const timeout = setTimeout(updateMessage, messageTimings[messageIndex]);
      return () => clearTimeout(timeout); // Cleanup on component unmount
    }

  }, [messageIndex, messages.length, messageTimings]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-customBG font-ibm-plex-mono">
      <div className="flex justify-center items-center space-x-2">
        {/* Spinning Loader */}
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
      </div>
      <div className="mt-6 text-xl font-semibold text-gray-200 text-center px-4">
        {/* Rotating message */}
        {messages[messageIndex]}
      </div>
      {/* Static time duration message */}
      <div className="mt-4 text-sm text-gray-500 text-center px-4">
        This process usually takes about 30 seconds to 1 minute to complete.
      </div>
    </div>
  );
};

export default LoadingSpinner;
