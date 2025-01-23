// client/src/components/navigation.js

import React, { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './navigation.css'; // Import the CSS file
import { AssessmentContext } from '../context/assessmentContext'; // Import AssessmentContext

function BottomNavigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setAssessmentData } = useContext(AssessmentContext); // Use context to set assessment data

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleReplayAssessment = () => {
    setAssessmentData(null); // Clear the assessment data in the context
    navigate('/'); // Navigate to the form page
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="bottom-nav-container">
      {/* Left Side Buttons */}
      <div className="flex space-x-4">
        {/* Replay Assessment Button */}
        <button
          className={`bottom-nav-button replay-assessment ${
            isActive('/') ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : ''
          }`}
          onClick={handleReplayAssessment} // Use the handleReplayAssessment function
          disabled={isActive('/')}
        >
          Replay Assessment
        </button>

        {/* Edit Responses Button */}
        <button
          className={`bottom-nav-button edit-responses ${
            isActive('/') ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : ''
          }`}
          onClick={() => handleNavigation('/')}
          disabled={isActive('/')}
        >
          Edit Responses
        </button>
      </div>

      {/* Right Side Buttons */}
      <div className="flex space-x-4">
        {/* Summary Button */}
        <button
          className={`bottom-nav-button summary ${
            isActive('/summary') ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : ''
          }`}
          onClick={() => handleNavigation('/summary')}
          disabled={isActive('/summary')}
        >
          Summary
        </button>

        {/* Dashboard Button */}
        <button
          className={`bottom-nav-button report ${
            isActive('/report') ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : ''
          }`}
          onClick={() => handleNavigation('/report')}
          disabled={isActive('/report')}
        >
          All details
        </button>

        {/* Roadmap Button */}
        <button
          className={`bottom-nav-button roadmap ${
            isActive('/roadmap') ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : ''
          }`}
          onClick={() => handleNavigation('/roadmap')}
          disabled={isActive('/roadmap')}
        >
          Roadmap
        </button>
      </div>
    </div>
  );
}

export default BottomNavigation;
