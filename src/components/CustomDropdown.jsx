import React, { useState } from 'react';

const CustomDropdown = ({ options, value, onChange, isDashboard = false }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOptionClick = (optionValue) => {
        onChange(optionValue);
        setIsOpen(false);
    };

    return (
        <div className="relative w-full">
            <div
                className={`w-full ${isDashboard ? 'bg-blackBox' : 'bg-selectBG'} text-white py-3 px-4 pr-8 rounded appearance-none focus:outline-none focus-gradient sm:text-lg font-ibm-plex-mono font-light leading-[41.6px] tracking-[0.75px] text-left cursor-pointer`}
                onClick={() => setIsOpen(!isOpen)}
            >
                {options.find(option => option.value === value)?.label || 'Select an option'}
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                    />
                </svg>
            </div>
            {isOpen && (
                <div className={`absolute w-full ${isDashboard ? 'bg-blackBox' : 'bg-selectBG'} text-white mt-1 rounded shadow-lg z-10 font-ibm-plex-mono max-h-[40vh] overflow-y-auto scrollbar-hide`}>
                    {options.map((option, index) => (
                        <div
                            key={index}
                            className="py-2 px-4 hover:bg-gray-700 cursor-pointer"
                            onClick={() => handleOptionClick(option.value)}
                        >
                            {option.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CustomDropdown;