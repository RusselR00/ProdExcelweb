import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";
import { ReactNode } from "react";

interface PageTransitionProps {
    children: ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
    const [location] = useLocation();

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={location}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                    duration: 0.15,
                    ease: "easeInOut",
                }}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}
