import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import './landingPage.css';

const GoalCard = ({ goal, title, milestone, milestoneTitle, question, answer, hovered, onMouseEnter, onMouseLeave }) => {
    const filter = <svg width="24" height="28" viewBox="0 0 24 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M24 9.28571C24 8.57321 23.4268 8 22.7143 8H1.28571C0.573214 8 0 8.57321 0 9.28571C0 9.99821 0.573214 10.5714 1.28571 10.5714H22.7143C23.4268 10.5714 24 9.99821 24 9.28571ZM24 17.8571C24 17.1446 23.4268 16.5714 22.7143 16.5714H8.14286C7.43036 16.5714 6.85714 17.1446 6.85714 17.8571C6.85714 18.5696 7.43036 19.1429 8.14286 19.1429H22.7143C23.4268 19.1429 24 18.5696 24 17.8571ZM13.7143 26.4286C13.7143 27.1411 14.2875 27.7143 15 27.7143H22.7143C23.4268 27.7143 24 27.1411 24 26.4286C24 25.7161 23.4268 25.1429 22.7143 25.1429H15C14.2875 25.1429 13.7143 25.7161 13.7143 26.4286Z" fill="white" />
    </svg>
    const plus = <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13.3848 1.3835C13.3848 0.616167 12.7675 -0.00115967 12.0001 -0.00115967C11.2328 -0.00115967 10.6155 0.616167 10.6155 1.3835V10.6146H1.3844C0.617068 10.6146 -0.000259399 11.2319 -0.000259399 11.9992C-0.000259399 12.7666 0.617068 13.3839 1.3844 13.3839H10.6155V22.6149C10.6155 23.3823 11.2328 23.9996 12.0001 23.9996C12.7675 23.9996 13.3848 23.3823 13.3848 22.6149V13.3839H22.6158C23.3832 13.3839 24.0005 12.7666 24.0005 11.9992C24.0005 11.2319 23.3832 10.6146 22.6158 10.6146H13.3848V1.3835Z" fill="url(#paint0_linear_2332_3544)" />
        <defs>
            <linearGradient id="paint0_linear_2332_3544" x1="2.98304" y1="2.69294" x2="28.0142" y2="13.8357" gradientUnits="userSpaceOnUse">
                <stop stopColor="#624BED" />
                <stop offset="1" stopColor="#CE5682" />
            </linearGradient>
        </defs>
    </svg>
    const [isExpanded, setIsExpanded] = useState(false);
    const minus = (
        <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 8.98753C16 9.49907 15.5885 9.91061 15.0769 9.91061H0.923077C0.411538 9.91061 0 9.49907 0 8.98753C0 8.47599 0.411538 8.06445 0.923077 8.06445H15.0769C15.5885 8.06445 16 8.47599 16 8.98753Z" fill="url(#paint0_linear_2332_3544)" />
            <defs>
                <linearGradient id="paint0_linear_2332_3544" x1="2.98304" y1="2.69294" x2="28.0142" y2="13.8357" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#624BED" />
                    <stop offset="1" stopColor="#CE5682" />
                </linearGradient>
            </defs>
        </svg>
    );

    return (
        <div
            className={`mobile-s:max-w-[360px] mobile-m:max-w-[400px] sm:max-w-full bg-textAreaBG gradient-border-card text-white ${hovered ? 'hover' : ''}`}
            style={{ borderBottomLeftRadius: '16px', borderTopRightRadius: '16px' }}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <div className="mobile-s:text-center sm:text-left p-6 bg-cardBG" style={{ borderTopRightRadius: '16px' }}>
                <div className="inline-block px-4 py-2 rounded-full border border-[#FFFFFF1A] text-white text-base sm:text-lg mb-2 font-ibm-plex-mono">
                    {goal}
                </div>
                <div className="text-sm sm:text-2xl font-ibm-plex-mono">{title}</div>
            </div>

            {/* Milestone Section */}
            <div className="mobile-s:text-center sm:text-left relative 3xl:p-6 px-6 pt-3">
                <div className="absolute inset-x-0 top-0 border-t border-lineBG"></div>
                <div>
                    <div className="inline-block px-4 py-2 rounded-full border border-[#FFFFFF1A] text-white text-sm sm:text-base mb-2 font-ibm-plex-mono">
                        {milestone}
                    </div>

                    <div className="flex text-left items-center gap-5 3xl:pt-2">
                        <div className="flex items-center justify-center h-full text-white mb-2">{filter}</div>
                        <div className="text-2xl font-ibm-plex-mono">{milestoneTitle}</div>
                    </div>
                </div>
            </div>

            {/* Question/Answer Section */}
            <div className={`p-6 group ${hovered ? 'hover' : ''}`}>
                {question && (
                    <div className="p-[1px] rounded-lg group-hover:bg-gradient-to-r from-[#624BED] to-[#CE5682]">
                        <div className="bg-cardBG rounded-lg p-4 ">
                            <div className="flex justify-between items-center  mb-3">
                                <div className="text-white font-ibm-plex-mono font-normal text-base">{question}</div>
                                <button onClick={() => setIsExpanded(!isExpanded)}>
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={isExpanded ? "minus" : "plus"}
                                            initial={{ opacity: 0, rotate: 90 }}
                                            animate={{ opacity: 1, rotate: 0 }}
                                            exit={{ opacity: 0, rotate: -90 }}
                                            transition={{ duration: 0.1 }}
                                        >
                                            {isExpanded ? minus : plus}
                                        </motion.div>
                                    </AnimatePresence>
                                </button>
                            </div>
                            <AnimatePresence>
                                {isExpanded && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="bg-cardBG text-gray-300 px-4 py-2 rounded-md font-ibm-plex-mono font-thin text-xs">
                                            {answer}
                                        </div>
                                        <div className="inline-block px-4 py-2 rounded-full border border-[#FFFFFF] text-white text-xs 3xl:text-sm my-2 font-ibm-plex-mono cursor-pointer">
                                            Define Your Strategy
                                        </div>

                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                )}
            </div>

        </div>
    );
};

export default GoalCard;