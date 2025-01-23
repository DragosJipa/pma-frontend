import React, { useState, useRef, useEffect } from 'react';
import './landingPage.css';
import GoalCard from './GoalCard';

const interpolateColor = (color1, color2, factor) => {
    const result = color1.slice();
    for (let i = 0; i < 3; i++) {
        result[i] = Math.round(result[i] + factor * (color2[i] - result[i]));
    }
    return result;
};

const interpolateColors = (color1, color2, steps) => {
    const stepFactor = 1 / (steps - 1);
    const interpolatedColorArray = [];

    color1 = color1.match(/\w\w/g).map((c) => parseInt(c, 16));
    color2 = color2.match(/\w\w/g).map((c) => parseInt(c, 16));

    for (let i = 0; i < steps; i++) {
        interpolatedColorArray.push(interpolateColor(color1, color2, stepFactor * i));
    }

    return interpolatedColorArray.map((color) => `rgb(${color.join(',')})`);
};

const gradientColors = interpolateColors('#624BED', '#CE5682', 100);

const Roadmapc = ({ goalCards }) => {
    const totalLines = 100;
    const lineMargin = 2;

    const scrollContainerRef = useRef(null);
    const cardsContainerRef = useRef(null);
    const singleCardRef = useRef(null);

    const [hoveredPhase, setHoveredPhase] = useState(null);
    const [containerWidth, setContainerWidth] = useState(0);
    const [lineWidth, setLineWidth] = useState(0);
    const [cardWidth, setCardWidth] = useState(0);
    const [gapBetweenCards, setGapBetweenCards] = useState(32);

    useEffect(() => {
        if (cardsContainerRef.current && singleCardRef.current) {
            const width = cardsContainerRef.current.scrollWidth;
            setContainerWidth(width);
            setLineWidth(Math.floor((width - (totalLines * 2)) / totalLines));
            setCardWidth(singleCardRef.current.scrollWidth);
            console.log(singleCardRef.current.scrollWidth);

            setGapBetweenCards((cardsContainerRef.current.scrollWidth - singleCardRef.current.scrollWidth * goalCards.length) / (goalCards.length - 1));
        }
    }, [cardsContainerRef]);

    const handleMouseDown = (e) => {
        const scrollContainer = scrollContainerRef.current;
        scrollContainer.isDown = true;
        scrollContainer.startX = e.pageX - scrollContainer.offsetLeft;
        scrollContainer.scrollLeft = scrollContainer.scrollLeft;
    };

    const handleMouseLeave = () => {
        const scrollContainer = scrollContainerRef.current;
        scrollContainer.isDown = false;
    };

    const handleMouseUp = () => {
        const scrollContainer = scrollContainerRef.current;
        scrollContainer.isDown = false;
    };

    const handleMouseMove = (e) => {
        const scrollContainer = scrollContainerRef.current;
        if (!scrollContainer.isDown) return;
        e.preventDefault();
        const x = e.pageX - scrollContainer.offsetLeft;
        const walk = (x - scrollContainer.startX);
        scrollContainer.scrollLeft = scrollContainer.scrollLeft - walk;
    };

    return (
        <>
            <div className="flex items-center gap-4 sm:px-32 mobile-s:px-4">
                <span className='text-center sm:text-left block mobile-s:text-4xl md:text-5xl 3xl:text-8xl font-bold gradient-color-text font-ibm-plex-mono'>
                    Transformative Journey
                    <br className='sm:block mobile-s:hidden' />
                    {' '}
                    Roadmap
                </span>
                <div className="sm:flex mobile-s:hidden flex gap-2 place-self-end">
                    <button className="w-24 h-16 sm:w-16 sm:h-16 rounded-full bg-[#ffffff10] flex items-center justify-center">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                            <path d="M15 18l-6-6 6-6" />
                        </svg>
                    </button>
                    <button className="w-24 h-16 sm:w-16 sm:h-16 rounded-full bg-[#ffffff10] flex items-center justify-center">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                            <path d="M9 18l6-6-6-6" />
                        </svg>
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto scrollbar-hide sm:pl-32 mobile-s:pl-4"
                ref={scrollContainerRef}
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
            >
                <div className="relative" style={{ width: `${containerWidth}px` }}>

                    <div className="relative h-[70px] 3xl:h-[100px] mb-3 lg:mb-6 3xl:mb-12">
                        <div className="absolute top-0 left-0 right-0 h-full flex">
                            {[...Array(totalLines)].map((_, index) => {
                                const color = gradientColors[index];
                                return (
                                    <div
                                        key={index}
                                        className="relative h-full"
                                        style={{ width: `${lineWidth}px`, marginRight: `${lineMargin}px` }}
                                    >
                                        <div
                                            className="absolute top-0 left-0 w-[2px] h-full"
                                            style={{
                                                background: color,
                                            }}
                                        />
                                    </div>
                                );
                            })}
                        </div>

                        {/* Phase markers */}
                        {goalCards.map((card, index) => (
                            <div
                                key={card.phase}
                                className="absolute top-2 3xl:top-5 text-white"
                                style={{
                                    left: `${index * (cardWidth + gapBetweenCards)}px`
                                }}
                                onMouseEnter={() => setHoveredPhase(card.phase)}
                                onMouseLeave={() => setHoveredPhase(null)}
                            >
                                <div className={`items-center bg-black px-4 py-2 gradient-border-card-always rounded-full text-white text-sm my-2 font-ibm-plex-mono ${hoveredPhase === card.phase ? 'hover' : ''}`}>
                                    Phase {card.phase}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Cards container */}
                    <div className="flex gap-8 items-stretch" ref={cardsContainerRef}>
                        {goalCards.map((card, index) => (
                            <div className="flex-1 mobile-s:min-w-[360px] mobile-m:min-w-[400px] sm:min-w-[750px] items-stretch flex-shrink-0" key={index} ref={singleCardRef}>
                                <GoalCard
                                    key={index}
                                    goal={card.goal}
                                    title={card.title}
                                    milestone={card.milestone}
                                    milestoneTitle={card.milestoneTitle}
                                    question={card.question}
                                    answer={card.answer}
                                    hovered={hoveredPhase === card.phase}
                                    onMouseEnter={() => setHoveredPhase(card.phase)}
                                    onMouseLeave={() => setHoveredPhase(null)}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Roadmapc;
