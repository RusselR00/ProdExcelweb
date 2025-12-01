import { useEffect, useState } from "react";

interface LoadingScreenProps {
    onLoadComplete: () => void;
    loadingGif: string;
}

export default function LoadingScreen({ onLoadComplete, loadingGif }: LoadingScreenProps) {
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
        handleLoadComplete();
    }, [onLoadComplete]);

    if (!isVisible) return null;

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-500 ${isVisible ? "opacity-100" : "opacity-0"
                }`}
        >
            {/* Animated Loading GIF */}
            <div className="relative w-64 h-64 md:w-80 md:h-80">
                <img
                    src={loadingGif}
                    alt="Loading..."
                    className="w-full h-full object-contain"
                />
            </div>
        </div>
    );
}
