'use client';

import React, { useState } from 'react';
import { useTerminal } from '@/hooks/useTerminal';
import CommandLine from './CommandLine';
import Output from './Output';
import NeuralBackground from '../Background/NeuralBackground';
import TypingEffect from './TypingEffect';
import { motion } from 'framer-motion';
import { Cpu, Cloud, GitBranch, Sparkles, Palette } from 'lucide-react';

const FloatingIcon: React.FC<{ icon: React.ReactNode; className: string; delay: number }> = ({ icon, className, delay }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay, duration: 0.5 }}
        className={`absolute pointer-events-none ${className}`}
    >
        <div className="animate-float" style={{ animationDelay: `${delay}s` }}>
            {icon}
        </div>
    </motion.div>
);

const Terminal: React.FC = () => {
    const { state, handleInputChange, handleKeyDown, cycleTheme } = useTerminal();
    const { history, currentInput, theme, isProcessing } = state;
    const [nameComplete, setNameComplete] = useState(false);
    const [introComplete, setIntroComplete] = useState(false);

    return (
        <div
            className="min-h-screen w-full transition-all duration-700 relative overflow-hidden"
            style={{ backgroundColor: theme.background }}
        >
            <NeuralBackground />

            {/* Floating Tech Icons */}
            <FloatingIcon
                icon={<Cpu className="w-12 h-12 text-cyan-500/20" />}
                className="top-20 right-[15%]"
                delay={0.5}
            />
            <FloatingIcon
                icon={<Cloud className="w-16 h-16 text-purple-500/20" />}
                className="top-40 left-[10%]"
                delay={0.8}
            />
            <FloatingIcon
                icon={<GitBranch className="w-10 h-10 text-green-500/20" />}
                className="bottom-40 right-[20%]"
                delay={1.1}
            />
            <FloatingIcon
                icon={<Sparkles className="w-8 h-8 text-amber-500/20" />}
                className="top-60 right-[30%]"
                delay={1.4}
            />

            {/* Theme Switcher Button */}
            <motion.button
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                onClick={cycleTheme}
                className="fixed top-4 left-4 z-[100] group"
                aria-label="Cycle theme"
                title="Click to cycle themes"
            >
                <div
                    className="relative w-12 h-12 rounded-full backdrop-blur-xl border-2 transition-all duration-300 hover:scale-110 hover:shadow-xl flex items-center justify-center"
                    style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        borderColor: theme.accent,
                        boxShadow: `0 0 20px ${theme.accent}40`
                    }}
                >
                    <Palette className="w-5 h-5 transition-all duration-300" style={{ color: theme.accent }} />
                    <div
                        className="absolute inset-0 rounded-full bg-gradient-to-br opacity-20 group-hover:opacity-40 transition-opacity duration-300"
                        style={{
                            backgroundImage: `linear-gradient(135deg, ${theme.gradientFrom}, ${theme.gradientTo})`
                        }}
                    />
                </div>
            </motion.button>

            <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16 pb-40">
                {/* Hero Header with Typing Effect */}
                <motion.header
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-8 sm:mb-12"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-xs sm:text-sm font-mono text-cyan-400 mb-6"
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                        </span>
                        SYSTEM ONLINE
                    </motion.div>

                    {/* Typing Effect for Name */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-4xl sm:text-6xl md:text-7xl font-bold mb-6"
                    >
                        <span className="gradient-text glow-text">
                            <TypingEffect
                                text="Revanth B"
                                speed={80}
                                onComplete={() => setNameComplete(true)}
                            />
                        </span>
                    </motion.h1>

                    {/* Typing Effect Introduction - starts after name completes */}
                    {nameComplete && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                            className="text-base sm:text-lg md:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed font-mono"
                        >
                            <span className="text-cyan-400">$</span>{' '}
                            <TypingEffect
                                text="Hello! I'm an AI & ML Engineer crafting intelligent systems. Passionate about TensorFlow, LangChain, and Cloud Architecture."
                                speed={30}
                                onComplete={() => setIntroComplete(true)}
                            />
                        </motion.div>
                    )}

                    {introComplete && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex flex-wrap justify-center gap-3 mt-8"
                        >
                            {['TensorFlow', 'LangChain', 'Docker', 'Oracle Cloud'].map((tech, i) => (
                                <motion.span
                                    key={tech}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="px-3 py-1.5 text-xs font-mono rounded-lg bg-white/5 border border-white/10 text-white/50 hover:border-cyan-400/50 transition-colors"
                                >
                                    {tech}
                                </motion.span>
                            ))}
                        </motion.div>
                    )}
                </motion.header>

                {/* Terminal Output */}
                <Output history={history} theme={theme} />
            </main>


        </div>
    );
};

export default Terminal;
