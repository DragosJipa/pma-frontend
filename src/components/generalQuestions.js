// client/src/components/generalQuestions.js
import React from 'react';

function GeneralQuestions({ questions, formData, handleInputChange }) {
  return (
    <>
      {questions.map((question, index) => (
        <div key={index} className="mb-6">
          <label
            className="block text-xl font-medium mb-2 text-gray-700"
            htmlFor={question.id} // Link label to input for accessibility
          >
            {question.question}
          </label>

          {/* Render input for text or email types */}
          {question.type === 'text' || question.type === 'email' ? (
            <input
              type={question.type}
              id={question.id}
              name={question.id}
              value={formData[question.id] || ''}
              onChange={(e) => handleInputChange(question.id, e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your response" // Placeholder for better UX
            />
          ) : question.type === 'select' ? (
            // Render select for dropdown types
            <select
              id={question.id}
              name={question.id}
              value={formData[question.id] || ''}
              onChange={(e) => handleInputChange(question.id, e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select an option</option>
              {question.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : (
            // Render options for radio buttons
            question.options.map(option => (
              <label
                key={option.value}
                className="flex items-center space-x-3 cursor-pointer"
              >
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
            ))
          )}
        </div>
      ))}
    </>
  );
}

export default GeneralQuestions;
