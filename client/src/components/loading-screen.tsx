import { useEffect, useState } from "react";

interface LoadingScreenProps {
    onLoadComplete: () => void;
    logoVideoSrc: string;
}

export default function LoadingScreen({ onLoadComplete, logoVideoSrc }: LoadingScreenProps) {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // Minimum display time for loading screen (2 seconds)
        const minDisplayTime = 2000;
        const startTime = Date.now();

        const handleLoadComplete = () => {
            const elapsedTime = Date.now() - startTime;
            const remainingTime = Math.max(0, minDisplayTime - elapsedTime);

            setTimeout(() => {
                setIsVisible(false);
                // Wait for fade-out animation to complete before calling callback
                setTimeout(onLoadComplete, 500);
            }, remainingTime);
        };

        // Simulate loading completion after minimum time
        muted
        playsInline
        className = "w-full h-full object-contain"
            >
            <source src={logoVideoSrc} type="video/webm" />
        {/* Fallback for browsers that don't support video */ }
        import { useEffect, useState } from "react";

        interface LoadingScreenProps {
            onLoadComplete: () => void;
            logoVideoSrc: string;
        }

        export default function LoadingScreen({ onLoadComplete, logoVideoSrc }: LoadingScreenProps) {
            const [isVisible, setIsVisible] = useState(true);

            useEffect(() => {
                // Minimum display time for loading screen (2 seconds)
                const minDisplayTime = 2000;
                const startTime = Date.now();

                const handleLoadComplete = () => {
                    const elapsedTime = Date.now() - startTime;
                    const remainingTime = Math.max(0, minDisplayTime - elapsedTime);

                    setTimeout(() => {
                        setIsVisible(false);
                        // Wait for fade-out animation to complete before calling callback
                        setTimeout(onLoadComplete, 500);
                    }, remainingTime);
                };

                // Simulate loading completion after minimum time
                muted
                playsInline
                className = "w-full h-full object-contain"
                    >
                    <source src={logoVideoSrc} type="video/webm" />
                {/* Fallback for browsers that don't support video */ }
                <div className="w-full h-full flex items-center justify-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-secondary"></div>
                </div>
                </video >
            </div >

                    {/* Optional: Loading text */ }
                    < div className = "absolute bottom-20 text-slate-800 text-lg font-medium animate-pulse" >
                        Loading...
            </div >
        </div >
    );
        }
