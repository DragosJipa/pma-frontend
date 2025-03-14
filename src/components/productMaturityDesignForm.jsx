import React, { useState, useEffect, useContext, useCallback } from 'react';
import axios from 'axios';
import { populateDummyResponses } from '../utils/formUtils';
import { useCheckProcessingStatus } from '../utils/formUtils';
import { AssessmentContext } from '../context/assessmentContext'; // Import AssessmentContext
import LoadingSpinner from './loadingSpinner';
import './productMaturity.css';
import './landingPage.css'
import { useNavigate } from 'react-router-dom';
import GenerateQuestions from './generateQuestions';
import { motion, AnimatePresence } from 'framer-motion';

const ProductMaturityAssessment = () => {
    const navigate = useNavigate();

    const backToStart = () => {
        navigate('/start');
    };
    const [lastAction, setLastAction] = useState('forward');
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [insideCurrentQuestionIndex, setInsideCurrentQuestionIndex] = useState(0);
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { assessmentData, setAssessmentData } = useContext(AssessmentContext);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const { checkProcessingStatus } = useCheckProcessingStatus();
    const [animationKey, setAnimationKey] = useState(`${currentQuestionIndex}-${insideCurrentQuestionIndex}-${lastAction}`);
    const [visibleSection, setVisibleSection] = useState(null);
    const [isAnimating, setIsAnimating] = useState(false);
    const [hubspotCallMade, setHubspotCallMade] = useState(false);
    const [continueClicked, setContinueClicked] = useState(false);

    useEffect(() => {
        setAnimationKey(`${currentQuestionIndex}-${insideCurrentQuestionIndex}-${lastAction}`);
    }, [lastAction, currentQuestionIndex, insideCurrentQuestionIndex]);

    const currentSection = questions.length > 0
        ? questions[currentQuestionIndex]?.questions[insideCurrentQuestionIndex]
        : null;

    useEffect(() => {
        if (!isAnimating) {
            setVisibleSection(currentSection);
        }
    }, [currentSection]);


    // const baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : 'https://product-maturity.onrender.com';
    const baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : 'https://api.pma.moduscreate.com';

    const getSectionTitle = (index) => {
        switch (index) {
            case 0:
                return "1. Contextual Information";
            case 1:
                return "2. Product Strategy and Vision";
            case 2:
                return "3. Product Development Processes and Agile Adoption";
            case 3:
                return "4. Technology and Innovation";
            case 4:
                return "5. Company Culture and Leadership";
            case 5:
                return "6. Open Questions";
            default:
                return "";
        }
    };
    useEffect(() => {
        axios.get(`${baseURL}/api/questions`)
            .then(response => {
                setQuestions(response.data);
                if (assessmentData && assessmentData.responses) {
                    setFormData(assessmentData.responses);
                } else {
                    setFormData({});
                }
            })
            .catch(error => {
                console.error('Error fetching questions:', error);
                setError('Failed to load questions. Please try again later.');
            });
    }, [assessmentData, baseURL]);

    useEffect(() => {
        if (isSubmitted) {
            const taskId = assessmentData?.taskId;
            if (taskId) {
                checkProcessingStatus(taskId);
            }
        }
    }, [isSubmitted, assessmentData, checkProcessingStatus]);

    const isPersonalEmailDomain = (domain) => {
        const personalDomains = [
            'gmail.com',
            'yahoo.com',
            'hotmail.com',
            'outlook.com',
            'aol.com',
            'icloud.com',
            'mail.com',
            'proton.me',
            'protonmail.com',
            'me.com',
            'live.com',
            'msn.com'
        ];
        return personalDomains.includes(domain.toLowerCase());
    };

    const handleInputChange = (questionId, value) => {
        setFormData({
            ...formData,
            [questionId]: value,
        });
        if (questionId === 'email') {
            const newErrors = { ...errors };
            delete newErrors[questionId];
            setErrors(newErrors);
        }
    };

    const handleDotClick = (index) => {
        const email = formData.email;
        if (!email) {
            setErrors({ ...errors, email: 'Email is required.' });
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
            setErrors({ ...errors, email: 'Please enter a valid email address.' });
        } else {
            const domain = email.split('@')[1];
            if (isPersonalEmailDomain(domain)) {
                setErrors({ ...errors, email: 'Please enter a business email address.' });
            } else {
                setInsideCurrentQuestionIndex(index);
            }
        }
    };

    useEffect(() => {
        if (formData.email && !hubspotCallMade && !errors.email && continueClicked) {
            const domain = formData.email.split('@')[1];
            if (!isPersonalEmailDomain(domain)) {
                axios.post(`${baseURL}/api/hubspot`, { email: formData.email })
                    .then(response => {
                        setHubspotCallMade(true);
                        setFormData({
                            ...formData,
                            assessmentId: response?.data?.assessment?.id,
                        });
                    })
                    .catch(error => {
                        console.error('HubSpot error:', error);
                    });
            }
        }
    }, [formData.email, errors.email, hubspotCallMade, continueClicked, baseURL]);

    const handleNext = useCallback((e) => {
        e.preventDefault();
        setContinueClicked(true);
        if (!formData.email) {
            setErrors({ ...errors, email: 'Email is required.' });
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
            setErrors({ ...errors, email: 'Please enter a valid email address.' });
        } else if (isPersonalEmailDomain(formData.email.split('@')[1])) {
            setErrors({ ...errors, email: 'Please enter a business email address.' });
        } else {
            setLastAction('forward');
            const isLastInnerQuestion = questions[currentQuestionIndex].questions.length - 1 === insideCurrentQuestionIndex;
            const isLastMainQuestion = currentQuestionIndex >= questions.length - 1 && isLastInnerQuestion;

            if (!isLastMainQuestion) {
                if (isLastInnerQuestion) {
                    setCurrentQuestionIndex(currentQuestionIndex + 1);
                    setInsideCurrentQuestionIndex(0);
                } else {
                    setInsideCurrentQuestionIndex(insideCurrentQuestionIndex + 1);
                }
            } else {
                setLoading(true);
                axios.post(`${baseURL}/api/submit`, formData)
                    .then(response => {
                        setIsSubmitted(true);
                        setAssessmentData({
                            ...assessmentData,
                            responses: formData,
                            taskId: response.data.taskId,
                        });

                        const taskId = response.data.taskId;
                        checkProcessingStatus(taskId);
                    })
                    .catch(error => {
                        console.error('Submission error:', error);
                        setError('Failed to submit responses. Please try again later.');
                        setLoading(false);
                    });
            }
        }
    }, [formData, errors, questions, currentQuestionIndex, insideCurrentQuestionIndex, baseURL, checkProcessingStatus, assessmentData, setAssessmentData]);

    useEffect(() => {
        const handleKeyPress = (e) => {
            if (e.key === "Enter" && formData.email) {
                handleNext(e);
            }
        };

        document.addEventListener("keydown", handleKeyPress);
        return () => {
            document.removeEventListener("keydown", handleKeyPress);
        };
    }, [formData, handleNext]);

    const isQuestionAnswered = (question, formData) => {
        if (!question) return false;

        switch (question.type) {
            case 'select':
                return !!formData[question.id];
            case 'radio':
                return !!formData[question.id];
            case 'open-ended':
                return !!formData[question.id]?.trim();
            case 'email':
                return !!formData[question.id] && !errors[question.id];
            default:
                return false;
        }
    };

    const handlePrevious = (e) => {
        e.preventDefault();
        setLastAction('backward');
        if (currentQuestionIndex === 0 && insideCurrentQuestionIndex === 0) {
            backToStart();
            return;
        }

        if (insideCurrentQuestionIndex > 0) {
            setInsideCurrentQuestionIndex(insideCurrentQuestionIndex - 1);
        } else {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
            setInsideCurrentQuestionIndex(questions[currentQuestionIndex - 1].questions.length - 1);
        }
    };

    const handlePopulateDummyResponses = () => {
        const dummyData = populateDummyResponses(questions);
        setFormData(dummyData);
    };


    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-screen text-xl font-semibold text-red-600">
                {error}
            </div>
        );
    }

    if (questions.length === 0) {
        return (
            <div className="flex items-center justify-center h-screen text-xl font-semibold text-gray-300 bg-customBG">
                Loading questions...
            </div>
        );
    }


    return (
        // <div className="flex flex-col items-start justify-start h-screen bg-customBG text-white p-4 sm:px-14 md:px-20 lg:px-32 overflow-hidden">
        <div className="flex flex-col min-h-[100dvh] bg-customBG text-white px-4 pt-4 sm:px-14 md:px-20 lg:px-40 2xl:px-[17rem]">
            {/* Top navigation */}
            <div className="w-full sm:my-8 3xl:px-80">
                <div className="text-xs text-gray-400 flex items-center space-x-2">
                    <div className='flex flex-col'>
                        <span className='mb-6'>
                            <img src='/moduscreate.svg' alt='Modus Create' />
                        </span>
                        <span className="font-ibm-plex-mono text-[11px] sm:text-lg font-normal leading-[31.2px] tracking-[0.75px] text-left mb-6"
                            onClick={handlePopulateDummyResponses}
                        >
                            Product Maturity Assessment
                        </span>

                        <span className='inline-flex ml-8'>
                            {/* <img src='/moduscreate.svg' alt='Modus Create' className='mobile-s:w-24' /> */}
                            {/* <span className="font-ibm-plex-mono text-[11px] sm:text-sm font-normal leading-[31.2px] tracking-[0.75px] text-left ml-4"
                                onClick={handlePopulateDummyResponses}
                            >
                                Product Maturity Assessment
                            </span> */}
                        </span>
                        <div className='inline-flex'>
                            <button className="w-[32px] h-[32px]" onClick={handlePrevious}>
                                <svg
                                    width="13.63"
                                    height="24"
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
                            <h1 className="font-ibm-plex-mono mobile-s:text-lg sm:text-2xl font-semibold gradient-text mb-4 whitespace-normal break-words overflow-hidden text-ellipsis w-full">
                                {getSectionTitle(currentQuestionIndex)}
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
            {/* Wrap the main content in AnimatePresence */}
            <AnimatePresence mode="wait" initial={false} onExitComplete={() => {
                setIsAnimating(false);
                setVisibleSection(currentSection);  // Update content after exit animation
            }}>
                <motion.div
                    key={animationKey}
                    initial={{
                        y: lastAction === 'backward' ? "-100vh" : "100vh",
                        opacity: 0
                    }}
                    animate={{
                        y: 0,
                        opacity: 1
                    }}
                    exit={{
                        y: lastAction === 'backward' ? "100vh" : "-100vh",
                        opacity: 0
                    }}
                    transition={{
                        type: "spring",
                        bounce: 0.25,
                        exit: {
                            type: "tween",
                            duration: 0.03,
                            ease: "easeOut"
                        }
                    }}
                    className="w-full flex flex-col h-full 3xl:px-80"
                    onAnimationStart={() => setIsAnimating(true)}
                >
                    <div className="flex-grow overflow-y-auto h-[calc(60vh)] scrollbar-hide">
                        <GenerateQuestions
                            questions={visibleSection}
                            formData={formData}
                            handleInputChange={handleInputChange}
                            errors={errors}
                            isFirstSet={currentQuestionIndex === 0}
                        />
                    </div>
                </motion.div>

            </AnimatePresence>

            {/* Bottom progress indicator */}
            <div className="w-full max-w-5xl 3xl:max-w-7xl flex justify-between items-center mt-[clamp(2rem, 5.5vh,6rem)] mobile-s:sticky lg:relative mobile-s:bottom-10 sm:bottom-0 mobile-s:z-10 3xl:pl-80">
                {/* Dynamic Dots */}
                <div className="flex space-x-2">
                    {[...Array(questions[currentQuestionIndex].questions.length)].map((_, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                handleDotClick(index);
                            }}
                            className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${index === insideCurrentQuestionIndex
                                ? 'w-8 bg-white'
                                : 'w-2 bg-gray-600 hover:bg-gray-400'
                                }`}
                        ></button>
                    ))}
                </div>

                {/* Button at the end */}
                <div>
                    <button
                        onClick={handleNext}
                        disabled={!isQuestionAnswered(visibleSection, formData)}
                        className={`flex items-center h-12 px-5 3xl:px-16 3xl:ml-10 text-white font-mono font-normal text-lg leading-snug tracking-wide rounded-lg group ${!isQuestionAnswered(visibleSection, formData) ? 'opacity-30' : ''}`}
                    >
                        {currentQuestionIndex === questions.length - 1 && insideCurrentQuestionIndex === questions[currentQuestionIndex].questions.length - 1 ? 'Submit' : 'Continue'}
                        {!isQuestionAnswered(visibleSection, formData) ? (<img src='arrow-right-disabled.svg' alt='disabled arrow' className='flex items-center justify-center w-10 h-10 ml-2' />) : (<span className="flex items-center justify-center w-10 h-10 ml-2 transform transition-transform duration-300 group-hover:translate-x-1">
                            <img src={'./ArrowRightIcon.svg'} alt="Arrow Right" className="w-full h-full" />
                        </span>)}

                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductMaturityAssessment;
