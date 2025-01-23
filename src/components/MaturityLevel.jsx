import React from 'react';
import MaturityLevelCard from './MaturityLevelCard';
import MetricCard from './MetricCard';
import { featuredIcon } from '../utils/icons';

const MaturityLevel = ({ maturityLevel }) => {
    return (
        <>
            <div className="text-left px-2">
                <span className='block mobile-s:text-4xl md:text-5xl lg:text-5xl 3xl:text-8xl font-bold gradient-color-text font-ibm-plex-mono'>
                    Understanding Your
                    <br className='hidden sm:block' />
                    {' '}
                    Product's Maturity
                </span>
            </div>
            <div className="flex flex-wrap lg:flex-nowrap gap-12">
                <div className="flex-1 flex justify-center">
                    <MaturityLevelCard
                        level={maturityLevel.level}
                        description={maturityLevel.description}
                        status={maturityLevel.status}
                    />
                </div>

                <div className="flex-1">
                    {/* <div className="bg-cardBG rounded-2xl p-5 shadow-md mb-6"> */}
                    <h3 className="text-xl 3xl:text-2xl font-ibm-plex-mono flex items-center text-white/75 mb-6 px-2">Maturity Levels</h3>
                    {/* </div> */}
                    <section className="grid grid-cols-1 min-[1025px]:grid-cols-2 gap-6">
                        <MetricCard title="Strategy" value={maturityLevel.strategy.level} label={maturityLevel.strategy.label} />
                        <MetricCard title="Processes" value={maturityLevel.processes.level} label={maturityLevel.processes.label} />
                        <MetricCard title="Technology" value={maturityLevel.technology.level} label={maturityLevel.technology.label} />
                        <MetricCard title="Culture" value={maturityLevel.culture.level} label={maturityLevel.culture.label} />
                    </section>
                    <div className="bg-cardBG rounded-2xl p-5 shadow-md mb-6 mt-6">
                        <div className="flex flex-col-2 items-center gap-4">
                            {featuredIcon}
                            <div className="flex flex-col">
                                <h3 className="text-xl 3xl:text-2xl font-ibm-plex-mono text-white">Ready to Level Up Your Product?</h3>
                                <p className="text-sm 3xl:text-base text-white/65 font-ibm-plex-mono">Modus can help you implement these recommendations and achieve your product goals faster.</p>
                                <button className="mt-4 px-4 py-2 font-ibm-plex-mono border border-white rounded-full text-xs 3xl:text-sm text-white hover:bg-black transition-colors self-start">
                                    Partner with Modus
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MaturityLevel;