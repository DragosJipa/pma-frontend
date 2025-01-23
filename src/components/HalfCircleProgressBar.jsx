import './landingPage.css';

export default function HalfCircleProgressBar({ progress, status }) {
    const radius = 90;
    const strokeWidth = 15;
    const circumference = Math.PI * radius;
    const offset = circumference - (progress / 5) * circumference;

    return (
        <div className="relative max-w-full max-h-[220px] aspect-[2/1]">
            <svg
                className="w-full h-full"
                viewBox="0 0 220 120"
                xmlns="http://www.w3.org/2000/svg"
            >

                <path
                    d="
                        M 20 110
                        A 90 90 0 0 1 200 110
                    "
                    fill="none"
                    stroke="#333"
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                />

                <path
                    d="
                        M 20 110
                        A 90 90 0 0 1 200 110
                    "
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                />

                <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="rgba(98, 75, 237, 1)" />
                        <stop offset="100%" stopColor="rgba(206, 86, 130, 1)" />
                    </linearGradient>
                </defs>
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-end">
                <div className="text-5xl font-bold gradient-color-text">Level {Math.floor(progress)}</div>
                <div className="text-xl font-medium text-white font-ibm-plex-mono">{status}</div>
            </div>
        </div>
    );
}
