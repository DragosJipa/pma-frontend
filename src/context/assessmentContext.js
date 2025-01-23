// client/src/context/assessmentContext.js
import React, { createContext, useState, useMemo } from 'react';

export const AssessmentContext = createContext();

export const AssessmentProvider = ({ children }) => {
  const [assessmentData, setAssessmentData] = useState(null);

  // Optional function to clear the assessment data
  const clearAssessmentData = () => {
    setAssessmentData(null);
  };

  // Memoize the context value to avoid unnecessary re-renders
  const contextValue = useMemo(() => ({
    assessmentData,
    setAssessmentData,
    clearAssessmentData, // Provide clear function in context
  }), [assessmentData]);

  return (
    <AssessmentContext.Provider value={contextValue}>
      {children}
    </AssessmentContext.Provider>
  );
};