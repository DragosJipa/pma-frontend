import React, { useState, useContext, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import MaturityLevel from './MaturityLevel';
import DetailedAnalysis from './DetailedAnalysis';
import Risks from './Risks';
import './landingPage.css';
import { motion, AnimatePresence } from 'framer-motion';
import Roadmapc from './Roadmapc';
import StarBackground from './StarBackground';
import { AssessmentContext } from '../context/assessmentContext';
import CustomDropdown from './CustomDropdown';
import axios from 'axios';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const Dashboard = () => {
    const navigate = useNavigate();
    const { assessmentData } = useContext(AssessmentContext);
    const [direction, setDirection] = useState(0);
    const [activeTab, setActiveTab] = useState('maturityLevel');
    const [storedAssessmentData, setStoredAssessmentData] = useState(() => {
        const savedData = sessionStorage.getItem('assessmentData');
        return savedData ? JSON.parse(savedData) : null;
    });
    const pdfRef = useRef(null);

    console.log('assessmentData:', assessmentData);

    useEffect(() => {
        if (assessmentData) {
            sessionStorage.setItem('assessmentData', JSON.stringify(assessmentData));
            setStoredAssessmentData(assessmentData);
        }
    }, [assessmentData]);

    useEffect(() => {
        if (!assessmentData && !storedAssessmentData) {
            navigate('/');
        }
    }, [assessmentData, storedAssessmentData, navigate]);

    const maturity_level = storedAssessmentData?.interpretation?.maturity_level || assessmentData?.interpretation?.maturity_level;
    const detailed_analysis = storedAssessmentData?.interpretation?.detailed_analysis || assessmentData?.interpretation?.detailed_analysis;
    const risks = storedAssessmentData?.interpretation?.risks || assessmentData?.interpretation?.risks;
    const goalCards = storedAssessmentData?.interpretation?.roadmap || assessmentData?.interpretation?.roadmap;

    if (!storedAssessmentData && !assessmentData) {
        return null;
    }

    const downloadIcon = (
        <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.5625 4.06179C9.5625 3.75004 9.31172 3.49924 9 3.49924C8.68828 3.49924 8.4375 3.75004 8.4375 4.06179V10.3929L6.21094 8.16609C5.99062 7.94575 5.63437 7.94575 5.41641 8.16609C5.19844 8.38642 5.19609 8.7427 5.41641 8.96069L8.60156 12.1485C8.82188 12.3688 9.17812 12.3688 9.39609 12.1485L12.5859 8.96069C12.8062 8.74036 12.8062 8.38407 12.5859 8.16609C12.3656 7.9481 12.0094 7.94575 11.7914 8.16609L9.56484 10.3929V4.06179H9.5625ZM6.01875 10.6249H4.5C3.67266 10.6249 3 11.2976 3 12.1251V14.0002C3 14.8277 3.67266 15.5004 4.5 15.5004H13.5C14.3273 15.5004 15 14.8277 15 14.0002V12.1251C15 11.2976 14.3273 10.6249 13.5 10.6249H11.9813L10.8563 11.75H13.5C13.7063 11.75 13.875 11.9188 13.875 12.1251V14.0002C13.875 14.2065 13.7063 14.3753 13.5 14.3753H4.5C4.29375 14.3753 4.125 14.2065 4.125 14.0002V12.1251C4.125 11.9188 4.29375 11.75 4.5 11.75H7.14375L6.01875 10.6249ZM13.125 13.0626C13.125 12.9134 13.0657 12.7704 12.9602 12.6649C12.8548 12.5594 12.7117 12.5001 12.5625 12.5001C12.4133 12.5001 12.2702 12.5594 12.1648 12.6649C12.0593 12.7704 12 12.9134 12 13.0626C12 13.2118 12.0593 13.3549 12.1648 13.4604C12.2702 13.5659 12.4133 13.6252 12.5625 13.6252C12.7117 13.6252 12.8548 13.5659 12.9602 13.4604C13.0657 13.3549 13.125 13.2118 13.125 13.0626Z" fill="white" />
        </svg>
    );

    const pageVariants = {
        enter: (direction) => ({
            x: direction > 0 ? "100%" : "-100%",
            opacity: 0,
        }),
        center: {
            x: 0,
            opacity: 1,
        },
        exit: (direction) => ({
            x: direction > 0 ? "-100%" : "100%",
            opacity: 0,
        }),
    };

    const pageTransition = {
        type: "tween",
        duration: 0.35,
        ease: "easeInOut"
    };


    const handleTabChange = (newTab) => {
        const tabOrder = ['maturityLevel', 'detailedAnalysis', 'risksRecommendations', 'roadmap'];
        const oldIndex = tabOrder.indexOf(activeTab);
        const newIndex = tabOrder.indexOf(newTab);
        setDirection(newIndex > oldIndex ? 1 : -1);
        setActiveTab(newTab);
    };

    // const baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : 'https://product-maturity.onrender.com';
    const baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : 'https://api.pma.moduscreate.com';

    const handleDownload = async () => {
        try {
            if (!assessmentData?.interpretation?.pdf) {
                throw new Error('No PDF data available');
            }

            let base64Data = assessmentData.interpretation.pdf;

            // if (!base64Data.startsWith('data:application/pdf;base64,')) {
            //     base64Data = `data:application/pdf;base64,${base64Data}`;
            // }

            const link = document.createElement('a');
            link.href = base64Data;
            link.download = 'product-maturity-report.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            console.log('PDF downloaded successfully');

            await axios.post(`${baseURL}/api/mail`, {
                pdf: base64Data,
                email: assessmentData?.responses?.email
            });
            console.log('Email sent successfully');
        } catch (error) {
            console.error('Error handling download:', error);
        }
    };
    // const handleDownload = async () => {
    //     try {
    //         // await axios.post(`${baseURL}/api/mail`);
    //         console.log('Email sent successfully');

    //         if (assessmentData?.interpretation?.pdf) {
    //             const pdfBase64 = assessmentData.interpretation.pdf;
    //             const pdfBlob = new Blob(
    //                 [Uint8Array.from(atob(pdfBase64), c => c.charCodeAt(0))],
    //                 { type: 'application/pdf' }
    //             );
    //             console.log('gets here?');
    //             const link = document.createElement('a');
    //             link.href = URL.createObjectURL(pdfBlob);
    //             link.download = 'product-maturity-report.pdf';
    //             link.click();

    //             console.log('PDF downloaded successfully');

    //         } else {
    //             console.log('Error during download');
    //         }
    //         // downloadPDF12();
    //     } catch (error) {
    //         console.error('Error sending email:', error);
    //     }
    // };

    const downloadPDF = async () => {
        // const element = pdfRef.current;
        // if (!element) {
        //     console.error("PDF content not found!");
        //     return;
        // }

        // Generate the PDF
        // const canvas = await html2canvas(element, { scale: 2 });

        const element = document.getElementById('report-page');
        const canvas = await html2canvas(element, { scale: 2 });
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgWidth = 210;
        const pageHeight = 297;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        let heightLeft = imgHeight;
        let position = 0;

        while (heightLeft > 0) {
            pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
            position -= pageHeight;
            if (heightLeft > 0) pdf.addPage();
        }

        pdf.save('report.pdf');
    };

    const downloadPDF12 = async () => {
        const element = document.getElementById('report-page');

        // Configure html2canvas options
        const canvas = await html2canvas(element, {
            scale: 1, // Reduce scale from 2 to 1
            useCORS: true,
            logging: false,
            allowTaint: true,
            backgroundColor: '#161616', // Match your background
            imageTimeout: 0,
            onclone: (clonedDoc) => {
                // Ensure fonts are loaded in cloned document
                const style = clonedDoc.createElement('style');
                style.innerHTML = `
                    @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;500;600;700&display=swap');
                    * { font-family: 'IBM Plex Mono', monospace; }
                `;
                clonedDoc.head.appendChild(style);
            }
        });

        // Configure jsPDF options
        const pdf = new jsPDF({
            orientation: 'p',
            unit: 'mm',
            format: 'a4',
            compress: true // Enable compression
        });

        const imgData = canvas.toDataURL('image/jpeg', 0.7); // Use JPEG with quality 0.7
        const imgWidth = 210;
        const pageHeight = 297;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        let heightLeft = imgHeight;
        let position = 0;

        // Add pages with compression
        while (heightLeft > 0) {
            pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight, '', 'FAST');
            heightLeft -= pageHeight;
            position -= pageHeight;
            if (heightLeft > 0) pdf.addPage();
        }

        pdf.save('product-maturity-report.pdf');
    };

    // const downloadPDF2 = () => {
    //     const element = document.getElementById('report-page'); // Target your HTML element
    //     const options = {
    //         margin: 1,
    //         filename: 'report.pdf',
    //         html2canvas: { scale: 2 },
    //         jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    //     };

    //     html2pdf().set(options).from(element).save();
    // };

    // const downloadPDF3 = async () => {
    //     const htmlContent = document.getElementById('report-page').outerHTML;

    //     const response = await fetch('/generate-pdf', {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({ htmlContent }),
    //     });

    //     const blob = await response.blob();
    //     const url = window.URL.createObjectURL(blob);
    //     const link = document.createElement('a');
    //     link.href = url;
    //     link.download = 'report.pdf';
    //     link.click();
    // };

    return (
        <div className="bg-startBG text-gray-200 min-h-screen">
            <div className="absolute inset-0 z-0">
                <StarBackground />
            </div>
            <div className="relative z-10">
                <header className="flex mobile-s:flex-col sm:flex-row items-center mobile-s:justify-center mobile-l:justify-between px-6 py-4 bg-startBG shadow-md border-b border-[#FFFFFF33]">

                    <img src='/moduscreate.svg' alt='Modus Create' className='mobile-l:w-32 ' />

                    <span className='sm:hidden w-full mt-4'>
                        <CustomDropdown
                            options={[
                                { label: 'Maturity Level', value: 'maturityLevel' },
                                { label: 'Detailed Analysis', value: 'detailedAnalysis' },
                                { label: 'Risks & Recommendations', value: 'risksRecommendations' },
                                { label: 'Roadmap', value: 'roadmap' },
                            ]}
                            value={activeTab}
                            onChange={(value) => handleTabChange(value)}
                            isDashboard={true}
                        />
                    </span>
                    <nav className="relative hidden sm:block">
                        <ul className="flex">
                            <li
                                className="cursor-pointer text-xs base:text-sm 2xl:text-base 3xl:text-lg font-ibm-plex-mono font-medium relative group px-3"
                                onClick={() => handleTabChange('maturityLevel')}
                            >
                                <span>Maturity Level</span>
                                <div className={`absolute 3xl:bottom-[-19px] 2xl:bottom-[-22px] base:bottom-[-21px] bottom-[-21px] left-0 w-full h-[1px] bg-white transition-opacity ${activeTab === 'maturityLevel' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}></div>
                            </li>
                            <li
                                className="cursor-pointer text-xs base:text-sm 2xl:text-base 3xl:text-lg font-ibm-plex-mono font-medium relative group px-3"
                                onClick={() => handleTabChange('detailedAnalysis')}
                            >
                                <span>Detailed Analysis</span>
                                <div className={`absolute 3xl:bottom-[-19px] 2xl:bottom-[-22px] base:bottom-[-21px] bottom-[-21px] left-0 w-full h-[1px] bg-white transition-opacity ${activeTab === 'detailedAnalysis' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}></div>
                            </li>
                            <li
                                className="cursor-pointer text-xs base:text-sm 2xl:text-base 3xl:text-lg font-ibm-plex-mono font-medium relative group px-3"
                                onClick={() => handleTabChange('risksRecommendations')}
                            >
                                <span>Risks <span className='inline min-[500px]:hidden min-[1000px]:inline'>& Recommendations</span></span>
                                <div className={`absolute 3xl:bottom-[-19px] 2xl:bottom-[-22px] base:bottom-[-21px] bottom-[-21px] left-0 w-full h-[1px] bg-white transition-opacity ${activeTab === 'risksRecommendations' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}></div>
                            </li>
                            <li
                                className="cursor-pointer text-xs base:text-sm 2xl:text-base 3xl:text-lg font-ibm-plex-mono font-medium relative group px-3"
                                onClick={() => handleTabChange('roadmap')}
                            >
                                <span>Roadmap</span>
                                <div className={`absolute 3xl:bottom-[-19px] 2xl:bottom-[-22px] base:bottom-[-21px] bottom-[-21px] left-0 w-full h-[1px] bg-white transition-opacity ${activeTab === 'roadmap' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}></div>
                            </li>
                        </ul>
                    </nav>

                    <button className="hidden sm:flex inline-flex items-center justify-center font-ibm-plex-mono text-white rounded-full px-3 py-1 2xl:px-6 2xl:py-2 text-xs 2xl:text-sm font-medium transition-all bg-gradient-to-r from-[#624BED] to-[#CE5682]"
                        onClick={handleDownload}
                    >
                        <span className='mr-1'>{downloadIcon}</span>
                        Download Report
                    </button>

                </header>

                <main className={`${activeTab === "roadmap" ? "3xl:py-32 md:py-12 sm:py-8 py-2" : "3xl:p-32 lg:px-16 md:p-12 sm:p-8 p-4"} relative overflow-hidden`}>
                    <AnimatePresence initial={false} custom={direction} mode="wait">
                        <motion.div
                            key={activeTab}
                            custom={direction}
                            variants={pageVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={pageTransition}
                            className="w-full 3xl:space-y-28 lg:space-y-10 md:space-y-10 sm:space-y-10 space-y-8"

                        >
                            {activeTab === "maturityLevel" && <MaturityLevel maturityLevel={maturity_level} />}
                            {activeTab === "detailedAnalysis" && <DetailedAnalysis analysisData={detailed_analysis} />}
                            {activeTab === "risksRecommendations" && <Risks risks={risks} />}
                            {activeTab === "roadmap" && <Roadmapc goalCards={goalCards} />}
                        </motion.div>
                    </AnimatePresence>
                </main>


                {/* Hidden container for generating PDF with all tabs */}
                <div
                    id='report-page'
                    ref={pdfRef}
                    style={{ position: "absolute", top: "-9999px", left: "-9999px" }}
                >
                    <MaturityLevel maturityLevel={maturity_level} />
                    <DetailedAnalysis analysisData={detailed_analysis} />
                    <Risks risks={risks} />
                    <Roadmapc goalCards={goalCards} />
                </div>

                {/* {activeTab === 'maturityLevel' &&
                    <footer className="bg-customBG text-white py-14 px-72 relative" style={{ top: '20vh' }}>
                        <div className="flex justify-between items-start">
                            <h2 className="text-3xl font-bold font-ibm-plex-mono pb-10">Sections</h2>
                            <button className="font-ibm-plex-mono bg-transparent border border-white text-white rounded-full px-6 py-2 text-sm font-medium hover:bg-white hover:text-gray-900 transition-all">
                                View Results
                            </button>
                        </div>

                        <ul className="mt-6 space-y-10">
                            {[
                                "Contextual Information",
                                "Product Strategy and Vision",
                                "Product Development Processes and Agile Adoption",
                                "Company Culture and Leadership",
                                "Technology and Innovation",
                            ].map((section, index) => (
                                <li
                                    key={index}
                                    className="flex justify-between items-center text-lg font-ibm-plex-mono font-light"
                                >
                                    <span>{section}</span>

                                    <span className='flex flex-row'>
                                        <button className="flex items-center bg-selectBG text-white px-4 py-2 rounded-full text-sm transition-all font-ibm-plex-mono">
                                            Review
                                        </button>
                                        <button className='mx-5'>
                                            <svg
                                                width="13.63"
                                                height="24"
                                                viewBox="0 0 13.63 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M1 0L12.63 12L1 24L0 22.96L10.54 12L0 1.04L1 0Z"
                                                    fill="white"
                                                />
                                            </svg>
                                        </button>
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </footer>
                } */}
            </div>
        </div>
    );
}

export default Dashboard;