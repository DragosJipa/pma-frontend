import React from "react";

const SWOTCard = ({ title, icon, items }) => {
    return (
        <div>
            <h2 className="text-white mobile-s:text-lg font-medium font-ibm-plex-mono mb-4">{title}</h2>
            <ul className="space-y-4">
                {items.map((item, index) => (
                    <li key={index} className="flex gradient-border items-center space-x-3 bg-cardBG p-3 lg:p-6 3xl:p-8"
                        style={{
                            borderRadius: '0 16px 0 16px'
                        }}>
                        <span>{icon}</span>
                        <span className="font-ibm-plex-mono text-gray-300">{item}</span>
                    </li>
                ))}
            </ul>
        </div >
    );
};

export default SWOTCard;