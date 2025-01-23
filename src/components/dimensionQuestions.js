// client/src/components/dimensionQuestions.js

import React from 'react';

function DimensionQuestions({ questions, formData, handleInputChange }) {
  // Function to render radio options
  const renderRadioOptions = (question) => {
    return question.options.map((option) => (
      <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
        <input
          type="radio"
          name={question.id}
          value={option.value}
          checked={formData[question.id] === option.value}
          onChange={() => handleInputChange(question.id, option.value)}
          className="hidden"
          aria-checked={formData[question.id] === option.value} // Accessibility improvement
        />
        <span
          className={`w-5 h-5 inline-block border-2 rounded-full ${
            formData[question.id] === option.value ? 'bg-blue-500 border-blue-500' : 'bg-white border-gray-300'
          } flex-shrink-0`}
        >
          {formData[question.id] === option.value && (
            <span className="block w-3 h-3 bg-white rounded-full mx-auto mt-1"></span>
          )}
        </span>
        <span className="text-gray-800">{option.label}</span>
      </label>
    ));
  };

  return (
    <>
      {questions.map((question, index) => (
        <div key={index} className="mb-6">
          <label
            className="block text-xl font-medium mb-4 text-gray-700"
            htmlFor={question.id} // Link label to input for accessibility
          >
            {question.question}
          </label>
          <div className="space-y-4">
            {renderRadioOptions(question)} {/* Use function to render options */}
          </div>
        </div>
      ))}
    </>
  );
}

export default DimensionQuestions;
