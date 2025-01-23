import React from 'react';

const Step = ({ title, icon, text }) => {
    return (
        <div className="text-center flex flex-col h-full">
            {title &&
                <div className="flex justify-center mb-2">
                    <div className="inline-block py-[8px] px-[12px]">
                        <h3>{title}</h3>
                    </div>
                </div>
            }
            <div className="bg-cardBG p-4 rounded-tr-[16px] rounded-bl-[16px] flex flex-col items-center gap-4 flex-grow">
                <div className="mb-4">
                    {icon}
                </div>
                <p className="text-left text-gray-200 text-base font-ibm-plex-mono">{text}</p>
            </div>
        </div>
    );
};

export default Step;