'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TypingEffectProps {
    text: string;
    speed?: number;
    className?: string;
    onComplete?: () => void;
}

const TypingEffect: React.FC<TypingEffectProps> = ({
    text,
    speed = 50,
    className = '',
    onComplete
}) => {
    const [displayedText, setDisplayedText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        if (currentIndex < text.length) {
            const timeout = setTimeout(() => {
                setDisplayedText(prev => prev + text[currentIndex]);
                setCurrentIndex(prev => prev + 1);
            }, speed);
            return () => clearTimeout(timeout);
        } else if (!isComplete) {
            setIsComplete(true);
            onComplete?.();
        }
    }, [currentIndex, text, speed, isComplete, onComplete]);

    return (
        <span className={className}>
            {displayedText}
            {!isComplete && (
                <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                    className="text-cyan-400"
                >
                    |
                </motion.span>
            )}
        </span>
    );
};

export default TypingEffect;
