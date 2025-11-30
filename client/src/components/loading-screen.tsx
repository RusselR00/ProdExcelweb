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
        handleLoadComplete();
    }, [onLoadComplete]);

    if (!isVisible) return null;

        </div >
    );
}
