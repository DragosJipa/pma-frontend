import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StarBackground from './StarBackground';
import './landingPage.css';
import Step from './Step';
import {
    handDrawnUnnderlines, step1, step2, step3, step4, step5, step6,
    handDrawnAccents, handDrownArrow,
    github, youtube, x, linkedin, facebook, modus,
} from '../utils/icons';

const stepsData = [
    {
        title: "Step 1",
        icon: (
            step1
        ),
        text: "Answer a few key questions about your product."
    },
    {
        title: "Step 2",
        icon: (
            step2
        ),
        text: "Our AI algorithms analyze your responses to determine your product's maturity level."
    },
    {
        title: "Step 3",
        icon: (
            step3
        ),
        text: "Get a personalized report with targeted recommendations and strategies for improvement."
    },
    {
        icon: (
            step4
        ),
        text: "Modus Create experts can help you implement the recommendations from your assessment."
    },
    {
        icon: (
            step6
        ),
        text: 'We provide guidance on strategy, process optimization, technology upgrades, and cultural transformation.'
    },
    {
        icon: (
            step4
        ),
        text: 'Our team can help you build a roadmap for success and achieve your product goals faster.'
    }
];

const LandingPage = () => {
    const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 1200);

    useEffect(() => {
        const handleResize = () => {
            setIsLargeScreen(window.innerWidth > 1200);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const navigate = useNavigate();
    return (
        <div className='bg-selectBG min-h-screen'>
            <div className="text-white mobile-l:p-8 mobile-s:pb-0 mobile-l:pb-0 bg-selectBG min-h-screen z-10">
                <div className="absolute inset-0 z-0">
                    <StarBackground />
                </div>

                <main className='relative overflow-hidden flex flex-col items-center justify-center 3xl:px-80 font-ibm-plex-mono text-gray-200'>
                    <span className='mobile-s:px-5 mobile-s:py-5 md:px-40 2xl:px-60 3xl:px-72 w-full flex justify-start md:py-10'>
                        <img src='/moduscreate.svg' alt='Modus Create' />
                    </span>
                    <div className='md:px-40 2xl:px-60 3xl:px-72 mobile-s:px-5'>
                        <span className='text-left mobile-s:text-4xl xl:text-6xl 2xl:text-6xl 3xl:text-8xl font-bold gradient-color-text font-ibm-plex-mono'>
                            Accelerate Product Growth with Our Free Assessment
                        </span>
                        <p className='mobile-s:text-justify md:text-left text-xl xl:text-2xl 3xl:text-3xl font-ibm-plex-mono mobile-s:pt-10 md:pt-10 md:pr-60'>
                            Feeling stuck in your product's journey? Unsure of the next steps to drive growth and innovation?
                        </p>

                        <div className='flex flex-col md:flex-row justify-between pt-10'>
                            <div className='order-2 md:order-1 w-full md:w-1/2 mb-10 md:mb-0'>
                                <p className='mobile-s:text-justify md:text-left text-lg lg:text-lg 3xl:text-2xl font-ibm-plex-mono mb-10'>
                                    Our AI-powered product maturity assessment analyzes your product strategy, processes, technology, and culture to identify areas for improvement. Receive a customized roadmap with actionable recommendations to optimize your product development lifecycle.
                                </p>
                                <div className="flex justify-start">
                                    <button
                                        onClick={() => navigate('/start')}
                                        className="inline-flex mobile-s:justify-center justify-normal items-center gap-2 font-ibm-plex-mono text-white rounded-full px-6 py-2 text-lg font-bold 3xl:text-2xl font-medium transition-all bg-gradient-to-r from-[#624BED] to-[#CE5682] w-full md:w-auto">
                                        Take the Free Assessment
                                    </button>
                                </div>
                            </div>
                            {/* <div className='order-1 md:order-2 w-full md:w-auto flex justify-center md:justify-start mobile-s:pb-10 md:pb-0'>
                                <div className='w-[250px] h-[340px] bg-blackBox rounded-2xl'>
                                    <img src='./book.svg' alt='book' className='w-full h-full' />
                                </div>
                            </div> */}
                        </div>
                    </div>
                    <div className="max-w-3xl mx-auto">
                        <div className="mt-32">
                            <div className="flex justify-center">
                                <p className='gradient-color-text font-ibm-plex-mono text-xl font-semibold'>
                                    How it works
                                </p>
                            </div>
                            <h2 className="text-4xl font-bold text-center mb-12 mt-6" style={{ lineHeight: '62.4px', letterSpacing: -0.75 }}>
                                Get Your Product Maturity <br />
                                <div className="inline-flex flex-col items-center">
                                    Score in Minutes
                                    <span className="relative inline-flex flex-col items-center">
                                        <span className="absolute pl-40">{handDrawnUnnderlines}</span>
                                    </span>
                                </div>
                            </h2>
                            <div className="grid grid-cols-1 large:grid-cols-3 gap-8 text-lg">
                                {stepsData.slice(0, 3).map((step, index) => (
                                    <Step key={index} title={step.title} icon={step.icon} text={step.text} />
                                ))}
                            </div>
                            {isLargeScreen && (
                                <div className='relative'>
                                    <div className='absolute -mt-10' style={{ left: '95%' }}>
                                        {handDrownArrow}
                                    </div>
                                    <div className='absolute -mt-10' style={{ left: '115%' }}>
                                        {handDrawnAccents}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="mt-24 text-center">
                            <div className="flex justify-center">
                                <p className='gradient-color-text font-ibm-plex-mono text-xl font-semibold'>
                                    How Modus Can Help
                                </p>
                            </div>

                            <h2 className="text-4xl font-bold text-center mb-12 mt-6" style={{ lineHeight: '62.4px', letterSpacing: -0.75 }}>
                                Partner with Modus Create to <br />
                                Achieve Product Excellence
                            </h2>
                            <div className="grid grid-cols-1 large:grid-cols-3 gap-8">
                                {stepsData.slice(3, 6).map((step, index) => (
                                    <Step key={index} icon={step.icon} text={step.text} />
                                ))}
                            </div>
                            <div className="mt-5 bg-cardBG rounded-tr-[16px] rounded-bl-[16px] flex flex-col items-center gap-4 flex-grow">
                                <div className="mb-4 mt-10 text-base">
                                    Trusted by 4,000+ Companies Worldwide
                                </div>
                                <div className="mb-10 text-left text-gray-200 text-base font-ibm-plex-mono grid grid-cols-2 mobile-s:grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-5 justify-items-center max-w-6xl mx-4">
                                    <img src='amazon.svg' alt='amazon' />
                                    <img src='acer.svg' alt='acer' />
                                    <img src='adidas.svg' alt='adidas' />
                                    <img src='ford.svg' alt='ford' />
                                    <img src='audi.svg' alt='audi' />
                                    <img src='jeep.svg' alt='jeep' />
                                    <img src='pbs.svg' alt='pbs' />
                                    <img src='nasa.svg' alt='nasa' />
                                    <img src='lg.svg' alt='lg' />
                                    <img src='burgerking.svg' alt='burgerking' />
                                    <img src='cisco.svg' alt='cisco' />
                                    <img src='comcast.svg' alt='comcast' />
                                    <img src='toyota.svg' alt='toyota' className="col-start-2 mobile-s:col-start-1 md:col-start-3" />
                                    <img src='uniqlo.svg' alt='uniqlo' className="col-start-3 mobile-s:col-start-2 md:col-start-4" />
                                </div>
                            </div>
                        </div>
                        <div className="mt-44 mini:mb-20 mb-10 text-center">
                            <div className='content-container'>
                                <div className="flex justify-center">
                                    <p className='gradient-color-text font-ibm-plex-mono text-xl font-semibold'>
                                        What you can do
                                    </p>
                                </div>
                                <h2 className="mobile-s:text-3xl sm:text-4xl font-bold text-center mobile-l:mb-2 sm:mb-12 mt-6" style={{ lineHeight: '52.4px', letterSpacing: -0.75 }}>
                                    Ready to Take Action?
                                </h2>
                                <div className="flex flex-col mini:flex-row justify-center gap-4 w-full">
                                    <button
                                        onClick={() => navigate('/start')}
                                        className="md:inline-flex items-center gap-2 font-ibm-plex-mono text-white rounded-full px-6 py-2 mobile-s:text-sm mobile-m:text-base mobile-l:text-lg font-medium transition-all bg-gradient-to-r from-[#624BED] to-[#CE5682]">
                                        Take the Free Assessment
                                    </button>
                                    <a href="https://moduscreate.com/contact/"
                                        className="border border-white hover:border-white text-white px-6 py-3 mobile-s:text-sm mobile-m:text-lg rounded-full transition duration-300"
                                    >
                                        Talk to an Expert
                                    </a>
                                </div>
                            </div>
                            <img src="/planet.svg" alt="planet" className="planet-image"
                            />
                        </div>
                    </div>
                </main>
            </div>
            {/* <div className="relative">
                <div className="planet-container relative">
                </div>
            </div> */}
            <footer className="font-ibm-plex-mono relative z-10">
                <div className="bg-[#161616] px-8 py-12">
                    <div className="max-w-7xl mx-auto grid grid-cols-2 large:grid-cols-5 gap-8">
                        <div>
                            <h4 className="font-semibold mb-4 gradient-color-text-2">What We Do</h4>
                            <ul className="space-y-2 text-sm text-gray-400">
                                <li>Digital Strategy</li>
                                <li>Platform & Cloud</li>
                                <li>Product Development</li>
                                <li>Digital Operations</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-white font-semibold mb-4 gradient-color-text-2">Our Partners</h4>
                            <ul className="space-y-2 text-sm text-gray-400">
                                <li>Atlassian</li>
                                <li>Aha!</li>
                                <li>AWS</li>
                                <li>Github</li>
                                <li>Ionic</li>
                                <li>Other Partners</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-white font-semibold mb-4 gradient-color-text-2">Who We Are</h4>
                            <ul className="space-y-2 text-sm text-gray-400">
                                <li>Our Story</li>
                                <li>
                                    <span>Careers</span>
                                    <span
                                        className="border border-white/10 text-white rounded-full px-2 py-1 text-xs ml-2 hover:opacity-90 transition duration-300"
                                    >
                                        We're hiring!
                                    </span>
                                </li>
                                <li>Open Source</li>
                            </ul>
                            <h4 className="text-white font-semibold mt-6 mb-4 gradient-color-text-2">Our Work</h4>
                            <ul className="text-sm text-gray-400">
                                <li>Case Studies</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-white font-semibold mb-4 gradient-color-text-2">Our Resources</h4>
                            <ul className="space-y-2 text-sm text-gray-400">
                                <li>Blog</li>
                                <li>Innovation Podcast</li>
                                <li>Guides & Playbooks</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-white font-semibold mb-4 gradient-color-text-2">Get Weekly Digital Transformation Insights</h4>
                            <div className="space-y-4">
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    className="w-full px-4 py-2 bg-[#232323] rounded-md text-white text-sm border border-gray-700 focus:outline-none focus-gradient"
                                />
                                {/* <button className="px-6 py-2 bg-gradient-to-r from-[#624BED] to-[#CE5682] text-white rounded-full text-sm hover:opacity-90 transition duration-300">
                                    Stay Informed
                                </button> */}
                                <button
                                    className="border border-white hover:border-white text-white px-6 py-2 mobile-s:text-xs rounded-full transition duration-300"
                                >
                                    Stay Informed
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-[#121212] px-8 py-6">
                    <div className="max-w-7xl mx-auto flex flex-col large:flex-row justify-between items-center space-y-4 large:space-y-0">
                        <div className="flex items-center space-x-6">
                            <img src='/moduscreate.svg' alt='Modus Create' />


                            <span className="text-sm text-gray-400">© 2025 Modus Create, LLC</span>
                        </div>

                        <div className="flex items-center space-x-6 text-sm text-gray-400">
                            <a href="https://moduscreate.com/privacy-policy/" className="hover:text-white">Privacy Policy</a>
                            <a href="https://moduscreate.com/sitemap/" className="hover:text-white">Sitemap</a>
                            <div className="flex items-center space-x-4">
                                <a href="https://github.com/moduscreateorg" className="hover:text-white">
                                    {github}
                                </a>
                                <a href="https://www.youtube.com/moduscreate" className="hover:text-white">
                                    {youtube}
                                </a>
                                <a href="https://x.com/moduscreate" className="hover:text-white">
                                    {x}
                                </a>
                                <a href="https://www.linkedin.com/company/modus-create" className="hover:text-white">
                                    {linkedin}
                                </a>
                                <a href="https://www.facebook.com/moduscreate/" className="hover:text-white">
                                    {facebook}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
