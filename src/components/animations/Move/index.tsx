import React, { useRef, useEffect, ReactNode } from 'react';
import gsap from 'gsap';

type MoveAnimationProps = {
    children: ReactNode;
    duration?: number;
    fromDirection: 'left' | 'right' | 'top' | 'bottom';
    distance: number; // Distance to move from the initial position in pixels
};

const MoveAnimation: React.FC<MoveAnimationProps> = ({
    children,
    duration = 0.5,
    fromDirection,
    distance,
}) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Define the type to allow dynamic keys (e.g., 'x' and 'y')
        const initialProperties: gsap.TweenVars = { autoAlpha: 0 };
        const finalProperties: gsap.TweenVars = { autoAlpha: 1, duration: duration };

        switch (fromDirection) {
            case 'left':
                initialProperties['x'] = -distance;
                break;
            case 'right':
                initialProperties['x'] = distance;
                break;
            case 'top':
                initialProperties['y'] = -distance;
                break;
            case 'bottom':
                initialProperties['y'] = distance;
                break;
            default:
                break;
        }

        // Move in animation
        gsap.fromTo(containerRef.current, initialProperties, finalProperties);

        // Cleanup function for move out animation
        return () => {
            const finalPropertiesForOut: gsap.TweenVars = { autoAlpha: 0, duration: duration };
            switch (fromDirection) {
                case 'left':
                    finalPropertiesForOut['x'] = distance;
                    break;
                case 'right':
                    finalPropertiesForOut['x'] = -distance;
                    break;
                case 'top':
                    finalPropertiesForOut['y'] = distance;
                    break;
                case 'bottom':
                    finalPropertiesForOut['y'] = -distance;
                    break;
                default:
                    break;
            }
            gsap.to(containerRef.current, finalPropertiesForOut);
        };
    }, [duration, fromDirection, distance]);

    return <div ref={containerRef}>{children}</div>;
};

export { MoveAnimation };
