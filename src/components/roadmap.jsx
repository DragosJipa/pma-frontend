// client/src/components/roadmap.js
import React, { useContext, useState } from 'react';
import './roadmap.css';
import BottomNavigation from './navigation'; // Import BottomNavigation
import { AssessmentContext } from '../context/assessmentContext'; // Import AssessmentContext

const Roadmap = () => {
  const { assessmentData } = useContext(AssessmentContext); // Access assessment data from context

  // State to track which milestone is hovered
  const [hoveredMilestone, setHoveredMilestone] = useState(null);

  // Check if assessment data and interpretation are available
  if (!assessmentData || !assessmentData.interpretation) {
    return (
      <div className="flex items-center justify-center min-h-screen text-xl font-semibold text-gray-600">
        No roadmap data available. Please complete the assessment first.
      </div>
    );
  }

  const { roadmap_milestones: milestones, roadmap_phases: phases } = assessmentData.interpretation; // Destructure from interpretation

  // Ensure roadmap data is available and correctly structured
  if (!milestones || !phases || milestones.length === 0 || phases.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen text-xl font-semibold text-gray-600">
        No roadmap data available. Please complete the assessment first.
      </div>
    );
  }

  // Convert milestones to structured format
  const structuredMilestones = milestones.map((milestone, index) => {
    let position = 'center'; // Default position for first and last milestones

    if (index > 0 && index < milestones.length - 1) {
      // Determine position based on index for alternating UI pattern, excluding the first and last
      //position = index % 2 === 0 ? 'above' : 'below';
    }

    return {
      id: milestone.milestone_id,
      title: milestone.title,
      description: milestone.description,
      position,
    };
  });

  // Initialize cumulative left position for phases and milestones
  let cumulativeLeft = 0; // Track cumulative left position in percentage

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-4 bg-gradient-to-r from-blue-50 to-blue-100">
      <div className="roadmap-container mb-16"> {/* Added mb-16 for space for bottom navigation */}
        <h2 className="roadmap-title">Roadmap - Improve Product Maturity</h2>
        <div className="roadmap-line">

          {/* Inject "Start" milestone at the beginning */}
          <div
            className="roadmap-milestone"
            style={{
              left: '0%', // Start at the beginning
              bottom: 'auto', // Default position for milestone
              position: 'absolute', // Absolute positioning
            }}
            onMouseEnter={() => setHoveredMilestone('start')} // Set hovered milestone on mouse enter
            onMouseLeave={() => setHoveredMilestone(null)} // Reset hovered milestone on mouse leave
          >
            <div className="phase-boundary"></div>
            <div className="milestone-marker">Start</div>
            <div className={`milestone-text center`}>
              <h3> </h3>
              {/* Show description only on hover */}
              {hoveredMilestone === 'start' && (
                <p>The beginning of the roadmap.</p>
              )}
            </div>
          </div>

          {/* Render all phases and their corresponding milestones */}
          {phases.map((phase, index) => {
            // Calculate the current phase width based on duration
            const phaseWidth = parseFloat(phase.duration);
            cumulativeLeft += phaseWidth; // Update cumulative position for the milestone

            return (
              <React.Fragment key={phase.phase_id}>
                {/* Render Phase Container */}
                <div
                  className="phase-container"
                  style={{
                    width: `${phaseWidth}%`, // Phase width as a percentage
                    left: `${cumulativeLeft - phaseWidth}%`, // Position based on cumulative left
                    bottom: '200px', // Keep existing bottom positioning
                    position: 'absolute', // Absolute positioning for flexibility
                  }}
                >
                  <span className="phase-text">{phase.title}</span>
                </div>

                {/* Render Corresponding Milestone */}
                <div
                  className="roadmap-milestone"
                  style={{
                    left: index === structuredMilestones.length - 1 ? 'calc(100% - 70px)' : `${cumulativeLeft}%`, // Adjust for the last item
                    bottom: structuredMilestones[index].position === 'above' ? '30px' : 'auto', // Ensure bottom position for 'above'
                    top: structuredMilestones[index].position === 'below' ? '30px' : 'auto',  // Ensure top position for 'below'
                    position: 'absolute', // Maintain absolute positioning
                  }}
                  onMouseEnter={() => setHoveredMilestone(structuredMilestones[index].id)} // Set hovered milestone on mouse enter
                  onMouseLeave={() => setHoveredMilestone(null)} // Reset hovered milestone on mouse leave
                >
                  {/* Render boundary line for milestones */}
                  <div className="phase-boundary"></div>
                  <div className="milestone-marker">{structuredMilestones[index].id}</div>
                  <div className={`milestone-text ${structuredMilestones[index].position}`}>
                    <h3>{structuredMilestones[index].title}</h3>
                    {/* Show description only on hover */}
                    {hoveredMilestone === structuredMilestones[index].id && (
                      <p>{structuredMilestones[index].description}</p>
                    )}
                  </div>
                </div>
              </React.Fragment>
            );
          })}

          {/* Inject "End" milestone at the end */}
          <div
            className="roadmap-milestone"
            style={{
              left: 'calc(100% + 5px)', // Position at the end with a 70px offset
              bottom: 'auto', // Default position for milestone
              position: 'absolute', // Absolute positioning
            }}
            onMouseEnter={() => setHoveredMilestone('end')} // Set hovered milestone on mouse enter
            onMouseLeave={() => setHoveredMilestone(null)} // Reset hovered milestone on mouse leave
          >
            <div className="milestone-marker">End</div>
            <div className={`milestone-text center`}>
              <h3> </h3>
              {/* Show description only on hover */}
              {hoveredMilestone === 'end' && (
                <p>The end of the roadmap.</p>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default Roadmap;
