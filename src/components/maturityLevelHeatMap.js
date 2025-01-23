// client/src/components/maturityLevelHeatMap.js

import React, { useState } from 'react';

function MaturityLevelHeatMap({ maturityLevel, dimensionScores }) {
  const [tooltipVisible, setTooltipVisible] = useState(false);
  
  // Calculate the percentage based on the maturity level (e.g., 3 out of 5)
  const percentage = (maturityLevel / 5) * 100;

  return (
    <div className="flex flex-col items-center mt-6 mb-6 p-4 bg-white shadow-lg rounded-lg">
      {/* Title */}
      <div className="text-2xl font-bold text-gray-800 mb-4">Product Maturity</div>

      {/* Heat Map Container */}
      <div 
        className="relative w-full max-w-md h-8 bg-gray-300 rounded-full overflow-hidden shadow-md"
        style={{ cursor: 'pointer' }} // Cursor change on hover
        onMouseEnter={() => setTooltipVisible(true)}
        onMouseLeave={() => setTooltipVisible(false)}
      >
        {/* Gradient Background */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to right, red, orange, yellow, green)',
            borderRadius: '30px', // Rounded corners
            transition: 'background-color 0.3s ease' // Smooth transition for hover
          }}
        ></div>

        {/* Current Level Indicator */}
        <div
          className="absolute top-1/2 transform -translate-y-1/2 h-6 w-6 bg-black rounded-full"
          style={{
            left: `calc(${percentage}% - 12px)`, // Center the indicator at the score
            transition: 'left 0.5s ease', // Smooth transition effect for indicator
          }}
          onMouseEnter={() => setTooltipVisible(true)}
          onMouseLeave={() => setTooltipVisible(false)}
        >
          {/* Tooltip for the indicator */}
          {tooltipVisible && (
            <div 
              className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs p-1 rounded shadow-lg"
              style={{ whiteSpace: 'nowrap' }} // Tooltip styling
            >
              {`Maturity Level: ${maturityLevel} / 5`}
            </div>
          )}
        </div>
      </div>

      {/* Text Label for the Score */}
      <div className="mt-4 text-2xl font-bold text-gray-800">{maturityLevel} / 5</div>

     

      
    </div>
  );
}

export default MaturityLevelHeatMap;
