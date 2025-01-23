// client/src/components/openEndedQuestions.js

import React from 'react';

function OpenEndedQuestions({ questions, formData, handleInputChange }) {
  // Function to render each open-ended question
  const renderQuestion = (question, index) => (
    <div key={index} className="mb-6">
      <label
        className="block text-xl font-medium mb-4 text-gray-700"
        htmlFor={question.id} // Link label to textarea for accessibility
      >
        {question.question}
      </label>
      <textarea
        id={question.id}
        name={question.id}
        value={formData[question.id] || ''}
        onChange={(e) => handleInputChange(question.id, e.target.value)}
        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        rows="4"
        placeholder="Enter your response here..." // Placeholder for user guidance
        aria-describedby={`${question.id}-desc`} // Accessibility improvement
      ></textarea>
    </div>
  );

  return (
    <>
      {questions.map((question, index) => renderQuestion(question, index))}
    </>
  );
}

export default OpenEndedQuestions;
