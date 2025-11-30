import { useEffect, useState } from "react";

interface LoadingScreenProps {
    onLoadComplete: () => void;
    logoVideoMp4: string;
    logoVideoWebm: string;
}

export default function LoadingScreen({ onLoadComplete, logoVideoMp4, logoVideoWebm }: LoadingScreenProps) {
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
            className={`fixed inset-0 z-50 flex items-center justify-center bg-white transition-opacity duration-500 ${isVisible ? "opacity-100" : "opacity-0"
                }`}
        >
            {/* Spinning Logo Video */}
            <div className="relative w-64 h-64 md:w-80 md:h-80">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-contain"
                >
                    {/* MP4 first for iOS/Safari compatibility */}
                    <source src={logoVideoMp4} type="video/mp4" />
                    {/* WebM for Android/Chrome */}
                    <source src={logoVideoWebm} type="video/webm" />
                    {/* Fallback for browsers that don't support video */}
                    <div className="w-full h-full flex items-center justify-center">
                        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-primary"></div>
                    </div>
                </video>
            </div>
        </div>
    );
}
