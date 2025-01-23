import React from 'react';
import RiskRecommendationCard from './RiskRecommendationCard';

const Risks = ({ risks }) => {
    const riskIcon = <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.499 15.9808L24 11.1039L35.5009 15.9808C35.8717 16.1379 36.0728 16.471 36.0665 16.7852C36.0414 22.5294 33.6532 32.4529 24.3582 36.9024C24.132 37.0093 23.868 37.0093 23.648 36.9024C14.3467 32.4466 11.9648 22.5294 11.9334 16.7789C11.9334 16.4647 12.1282 16.1379 12.499 15.9745V15.9808ZM36.6761 13.2029L24.8421 8.18149C24.5782 8.06208 24.2954 7.99924 24 7.99924C23.7046 7.99924 23.4218 8.06208 23.1578 8.18149L11.3238 13.2029C9.94118 13.7874 8.91049 15.1512 8.91678 16.7978C8.9482 23.0322 11.5123 34.4388 22.3408 39.6237C23.3904 40.1264 24.6096 40.1264 25.6591 39.6237C36.4939 34.4388 39.0517 23.0322 39.0832 16.7978C39.0895 15.1512 38.0588 13.7874 36.6761 13.2029ZM24 16.0436C23.1641 16.0436 22.4917 16.7161 22.4917 17.5519V24.5908C22.4917 25.4266 23.1641 26.0991 24 26.0991C24.8358 26.0991 25.5083 25.4266 25.5083 24.5908V17.5519C25.5083 16.7161 24.8358 16.0436 24 16.0436ZM26.0111 30.1213C26.0111 29.5879 25.7992 29.0764 25.422 28.6992C25.0449 28.322 24.5333 28.1102 24 28.1102C23.4666 28.1102 22.9551 28.322 22.5779 28.6992C22.2008 29.0764 21.9889 29.5879 21.9889 30.1213C21.9889 30.6546 22.2008 31.1662 22.5779 31.5433C22.9551 31.9205 23.4666 32.1324 24 32.1324C24.5333 32.1324 25.0449 31.9205 25.422 31.5433C25.7992 31.1662 26.0111 30.6546 26.0111 30.1213Z" fill="black" />
        <path d="M12.499 15.9808L24 11.1039L35.5009 15.9808C35.8717 16.1379 36.0728 16.471 36.0665 16.7852C36.0414 22.5294 33.6532 32.4529 24.3582 36.9024C24.132 37.0093 23.868 37.0093 23.648 36.9024C14.3467 32.4466 11.9648 22.5294 11.9334 16.7789C11.9334 16.4647 12.1282 16.1379 12.499 15.9745V15.9808ZM36.6761 13.2029L24.8421 8.18149C24.5782 8.06208 24.2954 7.99924 24 7.99924C23.7046 7.99924 23.4218 8.06208 23.1578 8.18149L11.3238 13.2029C9.94118 13.7874 8.91049 15.1512 8.91678 16.7978C8.9482 23.0322 11.5123 34.4388 22.3408 39.6237C23.3904 40.1264 24.6096 40.1264 25.6591 39.6237C36.4939 34.4388 39.0517 23.0322 39.0832 16.7978C39.0895 15.1512 38.0588 13.7874 36.6761 13.2029ZM24 16.0436C23.1641 16.0436 22.4917 16.7161 22.4917 17.5519V24.5908C22.4917 25.4266 23.1641 26.0991 24 26.0991C24.8358 26.0991 25.5083 25.4266 25.5083 24.5908V17.5519C25.5083 16.7161 24.8358 16.0436 24 16.0436ZM26.0111 30.1213C26.0111 29.5879 25.7992 29.0764 25.422 28.6992C25.0449 28.322 24.5333 28.1102 24 28.1102C23.4666 28.1102 22.9551 28.322 22.5779 28.6992C22.2008 29.0764 21.9889 29.5879 21.9889 30.1213C21.9889 30.6546 22.2008 31.1662 22.5779 31.5433C22.9551 31.9205 23.4666 32.1324 24 32.1324C24.5333 32.1324 25.0449 31.9205 25.422 31.5433C25.7992 31.1662 26.0111 30.6546 26.0111 30.1213Z" fill="url(#paint0_linear_2284_3622)" />
        <defs>
            <linearGradient id="paint0_linear_2284_3622" x1="14.5083" y1="36.0134" x2="40.4227" y2="13.2841" gradientUnits="userSpaceOnUse">
                <stop stopColor="#624BED" />
                <stop offset="1" stopColor="#CE5682" />
            </linearGradient>
        </defs>
    </svg>;

    const recommendations = risks?.recommendations || [];
    const risk = risks?.risks || [];

    return (
        <>
            <div className='text-left mobile-s:text-4xl md:text-5xl 3xl:text-8xl font-bold gradient-color-text font-ibm-plex-mono px-2'>
                Current State
                {' '}
                <br className='sm:hidden' />
                vs.
                <br className='hidden sm:block' />
                {' '}
                Desired Future State
            </div>

            <p className="font-ibm-plex-mono font-light text-gray-300 mobile-s:text-sm sm:text-2xl 2xl:w-3/5 px-2">
                {risks?.description}
            </p>

            <div className="grid grid-cols-1 min-[1000px]:grid-cols-2 gap-12 px-2">
                <RiskRecommendationCard
                    title="Recommendations"
                    items={recommendations}
                />
                <RiskRecommendationCard
                    title="Risks"
                    items={risk}
                    icon={riskIcon}
                />
            </div>
        </>
    )
};

export default Risks;