import React from 'react';
import HalfCircleProgressBar from './HalfCircleProgressBar';
import './landingPage.css';

export default function MaturityLevelCard({ level, description, status }) {
    return (
        <div className="relative gradient-border-large p-6 rounded-3xl shadow-md text-center flex flex-col items-center justify-start">
            {/* halfcircleprogressbar should sit on top of this div */}

            <HalfCircleProgressBar progress={level} status={status} />


            <p className="text-left leading-7 tracking-wider font-ibm-plex-mono font-thin text-white mt-14 text-lg 3xl:text-xl">{description}</p>
        </div>
    );
}