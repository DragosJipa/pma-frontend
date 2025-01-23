// client/src/components/summaryResults.js

import React, { useContext } from 'react';
import MaturityLevelHeatMap from './maturityLevelHeatMap';
import BottomNavigation from './navigation';
import { AssessmentContext } from '../context/assessmentContext';

const SummaryResults = () => {
  const { assessmentData } = useContext(AssessmentContext);

  // Check if assessment data is available
  if (!assessmentData || !assessmentData.interpretation) {
    return (
      <div className="flex items-center justify-center h-screen text-xl font-semibold text-gray-600">
        No results to display. Please complete the assessment first.
      </div>
    );
  }

  const { interpretation } = assessmentData;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 text-lg font-medium bg-gray-100">
      <div className="bg-white p-8 shadow-md rounded-md max-w-3xl w-full mb-16">
        {/* Maturity Level Heat Map */}
        <MaturityLevelHeatMap
          maturityLevel={interpretation.maturity_level}
          dimensionScores={interpretation.dimension_score}
        />

        {/* Display the Summary */}
        <div className="mt-6 mb-12">
          <p className="text-gray-700 text-center">{interpretation.summary}</p>
        </div>

        {/* Dimension Scores Section */}
        <div className="mb-10 w-full flex flex-col items-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">Dimension Scores</h2>
          <div className="w-full max-w-md mx-auto">
            {Object.entries(interpretation.dimension_score).map(([dimension, score], index) => (
              <div key={index} className="flex items-center justify-between mb-4">
                <span className="text-gray-700 font-medium w-1/3 text-right pr-4">{dimension}</span>
                <div className="flex-1 bg-gray-200 rounded-full h-4 relative mr-4">
                  <div
                    className="bg-blue-500 h-4 rounded-full"
                    style={{ width: `${(score / 5) * 100}%` }}
                  ></div>
                </div>
                <span className="text-gray-700 w-1/6 text-left">{score} / 5</span>
              </div>
            ))}
          </div>
        </div>


      </div>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}

export default SummaryResults;
