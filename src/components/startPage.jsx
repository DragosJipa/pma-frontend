import React from 'react';
import { useNavigate } from 'react-router-dom';
import './landingPage.css';

const StartPage = () => {
    const navigate = useNavigate();

    const handleStart = () => {
        navigate('/assessment');
    };

    const handleDisclaimer = () => {
        navigate('/disclaimer');
    };

    const handlePrevious = () => {
        navigate('/');
    };

    return (
        <div className="relative flex flex-col min-h-[100dvh] bg-startBG text-white 3xl:px-80">
            <div className="flex items-center justify-between w-full p-4 large:hidden">
                <button className='mt-2' onClick={handlePrevious}>
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 13.63 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M12.63 24L1 12L12.63 0L13.63 1.04L3.09 12L13.63 22.96L12.63 24Z"
                            fill="white"
                        />
                    </svg>
                </button>

                <h1 className="text-left lg:hidden w-full font-ibm-plex-mono text-lg tracking-wide ml-2 mt-2">
                    Product{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 font-bold">
                        Maturity
                    </span>{' '}
                    Assessment
                </h1>
            </div>
            {/* Main Content Container */}
            <div className="flex flex-col items-start justify-start flex-grow mobile-s:px-5 md:px-40 2xl:px-[17rem] 3xl:px-72 pt-20 3xl:pt-96">
                {/* Heading and Description */}
                <span className='mb-20'>
                    <img src='/moduscreate.svg' alt='Modus Create' />
                </span>
                <div className="w-full max-w-full flex flex-col gap-4 lg:gap-10">
                    <h1 className="hidden large:block font-ibm-plex-mono gradient-color-text font-semibold text-2xl lg:text-3xl xl:text-[36px] leading-tight lg:leading-snug xl:leading-[46.8px] tracking-wide">
                        Product Maturity Assessment
                    </h1>
                    <p className="font-ibm-plex-mono font-light text-3xl lg:text-4xl xl:text-[48px] leading-tight lg:leading-snug xl:leading-[62.4px] tracking-wide">
                        Let's embark on a journey to uncover your{' '}
                        <span className=" font-bold">
                            product's full potential!
                        </span>{' '}
                        🚀
                    </p>
                    <p className='text-disclaimerTextBG text-lg lg:text-xl font-ibm-plex-mono'>Set aside 15-20 minutes to gain valuable insights into your product's maturity.</p>
                    <button
                        onClick={handleStart}
                        className="hidden large:flex flex items-center justify-start text-white font-ibm-plex-mono font-normal text-xl group mt-10 w-max"
                    >
                        Let's go!
                        <span className="flex items-center justify-center bg-gradient-to-r from-[#624BED] to-[#CE5682] rounded-full w-10 h-10 ml-2 transform transition-transform duration-300 group-hover:translate-x-1">
                            <img src={'./ArrowRightIcon.svg'} alt="Arrow Right" className="w-full h-full" />
                        </span>
                    </button>
                    <button className='hidden large:flex mt-28 border border-white hover:border-white text-white px-3 py-1 rounded-full font-ibm-plex-mono text-sm w-max' onClick={handleDisclaimer}>
                        Disclaimer
                    </button>
                </div>
            </div>

            {/* Mobile Button Positioned Bottom-Right */}
            <div className="large:hidden fixed bottom-4 right-4 w-full">
                <div className='flex flex-row items-center justify-between mobile-s:pl-10'>
                    {/* <button className='border border-white hover:border-white text-white px-6 py-3 ml-10 font-ibm-plex-mono text-sm' onClick={handleDisclaimer}> */}
                    <button className='border border-white hover:border-white text-white px-3 py-1 rounded-full font-ibm-plex-mono text-sm' onClick={handleDisclaimer}>

                        {/* className=" mobile-s:text-sm mobile-m:text-lg rounded-full transition duration-300" */}

                        Disclaimer
                    </button>
                    <button
                        onClick={handleStart}
                        className="flex items-center h-12 px-5 text-white font-ibm-plex-mono font-normal text-lg leading-snug tracking-wide hover:bg-white hover:text-gray-900 transition-colors duration-300 ease-in-out rounded-lg"
                    >
                        Let's go!
                        <span className="flex items-center justify-center w-10 h-10 ml-2 ">
                            <img src={'./ArrowRightIcon.svg'} alt="Arrow Right" className="w-full h-full" />
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default StartPage;
