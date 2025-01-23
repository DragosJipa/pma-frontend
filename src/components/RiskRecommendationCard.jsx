import React, { useState } from "react";

const RiskRecommendationCard = ({ title, icon, items }) => {
    const [expandedIndices, setExpandedIndices] = useState(new Set());

    const toggleExpanded = (index) => {
        setExpandedIndices(prev => {
            const newSet = new Set(prev);
            if (newSet.has(index)) {
                newSet.delete(index);
            } else {
                newSet.add(index);
            }
            return newSet;
        });
    };
    const rightArrow = <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.8018 9.54595C14.9277 9.40532 15 9.20843 15 9.00217C15 8.7959 14.9277 8.60214 14.8018 8.45838L10.0875 3.20805C9.83036 2.92053 9.42321 2.93303 9.17946 3.23305C8.93571 3.53307 8.94375 4.0081 9.20089 4.29249L12.7527 8.25212H3.64286C3.28661 8.25212 3 8.58651 3 9.00217C3 9.41782 3.28661 9.75221 3.64286 9.75221H12.7527L9.19821 13.7087C8.94107 13.9962 8.93304 14.4681 9.17679 14.7682C9.42054 15.0682 9.82768 15.0775 10.0848 14.7932L14.7991 9.54282L14.8018 9.54595Z" fill="white" />
    </svg>;
    const closeIcon = (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L13 13M1 13L13 1" stroke="white" strokeWidth="2" />
        </svg>
    );

    const isRisk = title === 'Risks';
    return (
        <div>
            <h2 className="text-white text-lg font-ibm-plex-mono mb-4">{title}</h2>
            <ul className="space-y-4">
                {items.map((item, index) => (
                    <li key={index}
                        className={`flex items-center space-x-3 bg-cardBG mobile-s:p-4 sm:p-8 ${isRisk ? 'pl-5' : ''} ${expandedIndices.has(index)
                            ? 'gradient-border-active'
                            : 'gradient-border'
                            }`}
                        style={{
                            borderRadius: expandedIndices.has(index) ? '16px 0 16px 0' : '0 16px 0 16px'
                        }}
                    >
                        {isRisk ? (
                            <>
                                <span className="bg-[#161616] rounded-full p-1 flex items-center justify-center">{icon}</span>
                                <span className="font-ibm-plex-mono  text-gray-300">{item}</span>
                            </>
                        ) : (
                            <div className="flex flex-col h-full w-full">
                                <span className="font-ibm-plex-mono text-gray-300 mb-20 pb-5 flex-grow relative">
                                    <div className={`absolute top-0 left-0 transition-all duration-300 ${expandedIndices.has(index) ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
                                        {item.action}
                                    </div>
                                    <div className={`absolute top-0 left-0 transition-all duration-300 ${expandedIndices.has(index) ? 'opacity-0 z-0' : 'opacity-100 z-10'}`}>
                                        {item.description}
                                    </div>
                                </span>
                                <div className="flex justify-between items-center mt-auto pt-5">
                                    {expandedIndices.has(index) ? (
                                        <button
                                            className="flex items-center gap-2 text-gray-300 hover:text-white"
                                            onClick={() => toggleExpanded(index)}
                                        >
                                            <span className="font-ibm-plex-mono text-sm 3xl:text-base">Close</span>
                                            {closeIcon}
                                        </button>
                                    ) : (
                                        <>
                                            <span className="bg-cardBG px-4 py-2 rounded-full text-sm font-ibm-plex-mono"
                                                style={{ border: '1px solid #FFFFFF1A' }}
                                            >
                                                {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                                            </span>
                                            <button
                                                className="group relative font-ibm-plex-mono text-sm 3xl:text-base"
                                                onClick={() => toggleExpanded(index)}
                                            >
                                                <span className="inline-flex items-center relative gap-1">
                                                    Action Plan {rightArrow}
                                                    <span className="absolute left-0 right-0 bottom-0 h-[1px] bg-gray-300 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
                                                </span>
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RiskRecommendationCard;