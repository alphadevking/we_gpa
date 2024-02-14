import React, { useRef, useEffect, ReactNode } from 'react';
import gsap from 'gsap';

type FadeAnimationProps = {
    children: ReactNode;
    duration?: number;
};

const FadeInAnimation: React.FC<FadeAnimationProps> = ({ children, duration = 1.20 }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Fade in animation
        gsap.to(containerRef.current, { autoAlpha: 1, duration: duration });

        // Cleanup function for fade out animation
        return () => {
            gsap.to(containerRef.current, { autoAlpha: 0, duration: duration });
        };
    }, [duration]);

    return (
        <div ref={containerRef} style={{ opacity: 0 }}>
            {children}
        </div>
    );
};

export { FadeInAnimation };
