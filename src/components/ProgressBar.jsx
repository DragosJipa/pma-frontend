import './landingPage.css';

export default function ProgressBar({ progress }) {

    const gradientColors = [
        { from: '#624BED', to: '#8749E1' },
        { from: '#8749E1', to: '#A747D5' },
        { from: '#A747D5', to: '#BC45B8' },
        { from: '#BC45B8', to: '#CE4491' },
        { from: '#CE4491', to: '#CE5682' }
    ];

    return (
        <div className="mt-3 relative">
            <div className="h-[11px] w-[170px] rounded-full relative overflow-hidden flex">
                {gradientColors.map((colors, index) => (
                    <div key={index} className="flex-1 relative">
                        <div
                            className="h-full w-full absolute"
                            style={{
                                backgroundImage: `linear-gradient(to right, ${colors.from}, ${colors.to})`
                            }}
                        />

                        {index >= progress && (
                            <div className="absolute top-0 left-0 w-full h-full bg-progressBarBG" />
                        )}

                        {index < 4 && (
                            <div
                                className="absolute right-0 top-0 w-[6px] h-full bg-selectBG z-10"
                            />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
