'use client';

import React, { useRef, useEffect } from 'react';
import { HistoryEntry, TerminalTheme } from '@/types/terminal';
import { motion } from 'framer-motion';

interface OutputProps {
    history: HistoryEntry[];
    theme: TerminalTheme;
}

const Output: React.FC<OutputProps> = ({ history, theme }) => {
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [history]);

    return (
        <div className="space-y-6">
            {history.map((entry, index) => (
                <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                    <div
                        className={`${entry.output.type === 'error'
                                ? 'text-rose-400'
                                : entry.output.type === 'success'
                                    ? 'text-emerald-400 font-mono'
                                    : ''
                            }`}
                    >
                        {typeof entry.output.content === 'string' ? (
                            <span className="font-mono whitespace-pre-wrap">{entry.output.content}</span>
                        ) : (
                            entry.output.content
                        )}
                    </div>
                </motion.div>
            ))}
            <div ref={bottomRef} className="h-20" />
        </div>
    );
};

export default Output;
