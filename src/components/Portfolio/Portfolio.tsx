'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    User, Briefcase, Code, Award, Mail, FolderGit2,
    Cpu, Cloud, Database, GitBranch, Sparkles,
    Linkedin, ExternalLink, MapPin, GraduationCap, Github, Palette
} from 'lucide-react';
import NeuralBackground from '../Background/NeuralBackground';
import ParticleWave from '../Background/ParticleWave';
import TypingEffect from '../Terminal/TypingEffect';

// Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
    visible: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
    }
};

const cardHover = {
    scale: 1.02,
    transition: { duration: 0.3 }
};

// Glass Card Component with enhanced hover effects and theme-aware gradients
const GlassCard: React.FC<{
    children: React.ReactNode;
    className?: string;
    delay?: number;
    hover?: boolean;
    theme: { accent: string; from: string; to: string };
}> = ({ children, className = '', delay = 0, hover = true, theme }) => (
    <motion.div
        initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
        whileHover={hover ? cardHover : undefined}
        className={`group relative ${className}`}
    >
        <div
            className="absolute -inset-0.5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700"
            style={{
                background: `linear-gradient(to right, ${theme.from}33, ${theme.accent}33, ${theme.to}33)`
            }}
        />
        <div
            className="relative backdrop-blur-md border rounded-2xl p-6 h-full hover:border-white/20 transition-all duration-500"
            style={{
                background: `linear-gradient(135deg, ${theme.from}30, ${theme.accent}20, ${theme.to}30)`,
                borderColor: `${theme.accent}30`
            }}
        >
            {children}
        </div>
    </motion.div>
);

// Section Header with animation
const SectionHeader: React.FC<{ icon: React.ReactNode; title: string; theme: { accent: string; from: string; to: string }; delay?: number }> = ({
    icon, title, theme, delay = 0
}) => (
    <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay }}
        className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8"
    >
        <div
            className="p-2 sm:p-3 rounded-lg sm:rounded-xl border shadow-lg"
            style={{
                backgroundColor: `${theme.accent}10`,
                borderColor: `${theme.accent}33`,
                boxShadow: `0 4px 6px -1px ${theme.accent}10`
            }}
        >
            {icon}
        </div>
        <h2
            className="text-xl sm:text-2xl font-bold tracking-wide"
            style={{ color: theme.accent }}
        >
            {title}
        </h2>
    </motion.div>
);

// Skill Tag with hover
const SkillTag: React.FC<{ name: string; delay?: number; theme: { accent: string; textColor: string } }> = ({ name, delay = 0, theme }) => (
    <motion.span
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay }}
        whileHover={{ scale: 1.1 }}
        className="px-3 py-1.5 text-xs font-mono rounded-full transition-all duration-300 cursor-default"
        style={{
            color: `${theme.textColor}CC`,
            backgroundColor: `${theme.accent}15`,
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: `${theme.accent}40`
        }}
    >
        {name}
    </motion.span>
);

const THEMES = [
    { name: 'Aurora', accent: '#22d3ee', from: '#06b6d4', to: '#3b82f6', bg: '#0a0e17', textColor: '#ffffff' },
    { name: 'Cyber', accent: '#a855f7', from: '#8b5cf6', to: '#ec4899', bg: '#1a0a1f', textColor: '#ffffff' },
    { name: 'Matrix', accent: '#10b981', from: '#059669', to: '#14b8a6', bg: '#0a1410', textColor: '#ffffff' },
    { name: 'Sunset', accent: '#f97316', from: '#fb923c', to: '#f43f5e', bg: '#fef3e2', textColor: '#1a0f0a' },
    { name: 'Neon', accent: '#a855f7', from: '#facc15', to: '#a855f7', bg: '#f5f3ff', textColor: '#1a160a' },
];

// Helper function to get icon color based on theme
const getIconColor = (baseColor: string, themeName: string): string => {
    const isLightTheme = themeName === 'Sunset' || themeName === 'Neon';
    const colorMap: { [key: string]: string } = {
        'cyan': isLightTheme ? '#0891b2' : '#22d3ee',
        'purple': isLightTheme ? '#7c3aed' : '#a78bfa',
        'emerald': isLightTheme ? '#059669' : '#34d399',
        'amber': isLightTheme ? '#d97706' : '#fbbf24',
        'rose': isLightTheme ? '#e11d48' : '#fb7185',
        'blue': isLightTheme ? '#2563eb' : '#60a5fa',
    };
    return colorMap[baseColor] || baseColor;
};

const Portfolio: React.FC = () => {
    const [nameComplete, setNameComplete] = useState(false);
    const [introComplete, setIntroComplete] = useState(false);
    const [themeIndex, setThemeIndex] = useState(0);
    const currentTheme = THEMES[themeIndex];

    const cycleTheme = () => {
        setThemeIndex((prev) => (prev + 1) % THEMES.length);
    };

    return (
        <motion.div
            className="min-h-screen w-full relative overflow-hidden"
            animate={{ backgroundColor: currentTheme.bg, color: currentTheme.textColor }}
            transition={{ duration: 1 }}
        >
            <ParticleWave />
            <NeuralBackground />

            {/* Floating gradient orbs */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <motion.div
                    className="absolute top-1/4 -left-32 w-96 h-96 rounded-full blur-3xl animate-float"
                    animate={{ backgroundColor: currentTheme.from }}
                    transition={{ duration: 1 }}
                    style={{ opacity: 0.15 }}
                />
                <motion.div
                    className="absolute top-1/2 -right-32 w-96 h-96 rounded-full blur-3xl animate-float"
                    animate={{ backgroundColor: currentTheme.to }}
                    transition={{ duration: 1 }}
                    style={{ animationDelay: '2s', opacity: 0.15 }}
                />
                <motion.div
                    className="absolute bottom-1/4 left-1/2 w-64 h-64 rounded-full blur-3xl animate-float"
                    animate={{ backgroundColor: currentTheme.accent }}
                    transition={{ duration: 1 }}
                    style={{ animationDelay: '4s', opacity: 0.15 }}
                />
            </div>


            <main className="relative z-10 w-full px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 py-8 sm:py-12 lg:py-16">
                {/* Terminal Window Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-8 sm:mb-12 lg:mb-16"
                >
                    {/* Terminal Window */}
                    <div
                        className="rounded-2xl overflow-hidden border backdrop-blur-md transition-all duration-1000"
                        style={{
                            background: `linear-gradient(135deg, ${currentTheme.from}30, ${currentTheme.accent}20, ${currentTheme.to}30)`,
                            borderColor: `${currentTheme.accent}30`
                        }}
                    >
                        {/* Terminal Header */}
                        <div
                            className="flex items-center justify-between gap-2 px-4 py-3 border-b transition-all duration-1000"
                            style={{
                                backgroundColor: `${currentTheme.accent}15`,
                                borderColor: `${currentTheme.accent}30`
                            }}
                        >
                            <div className="flex items-center gap-2">
                                <div className="flex gap-2">
                                    <span className="w-3 h-3 rounded-full bg-red-500/80" />
                                    <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                                    <span className="w-3 h-3 rounded-full bg-green-500/80" />
                                </div>
                                <span className="text-sm font-mono ml-4" style={{ color: `${currentTheme.textColor}66` }}>revanth@portfolio ~ </span>
                            </div>

                            {/* Theme Switcher Button */}
                            <motion.button
                                onClick={cycleTheme}
                                whileHover={{ scale: 1.15 }}
                                whileTap={{ scale: 0.95 }}
                                className="p-1.5 rounded-lg transition-all duration-300 hover:shadow-lg relative group"
                                style={{
                                    backgroundColor: `${currentTheme.accent}20`,
                                    borderWidth: '2px',
                                    borderColor: currentTheme.accent,
                                    boxShadow: `0 0 15px ${currentTheme.accent}40`
                                }}
                                title={`Current: ${currentTheme.name} - Click to cycle themes`}
                                aria-label="Cycle theme"
                            >
                                <Palette className="w-3.5 h-3.5" style={{ color: currentTheme.accent }} />
                            </motion.button>
                        </div>

                        {/* Terminal Content - Two Columns */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 p-4 sm:p-6 lg:p-8">
                            {/* Left Column - Name with Typing */}
                            <div className="flex flex-col justify-center">
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                    className="font-mono mb-4"
                                    style={{ color: `${currentTheme.textColor}80` }}
                                >
                                    <span style={{ color: currentTheme.accent }}>$</span> whoami
                                </motion.div>
                                <motion.h1
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5, duration: 0.8 }}
                                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4"
                                >
                                    <span
                                        className="glow-text bg-clip-text text-transparent bg-gradient-to-r"
                                        style={{
                                            backgroundImage: `linear-gradient(to right, ${currentTheme.from}, ${currentTheme.to})`
                                        }}
                                    >
                                        <TypingEffect
                                            text="Revanth B"
                                            speed={80}
                                            onComplete={() => setNameComplete(true)}
                                        />
                                    </span>
                                </motion.h1>

                                {nameComplete && (
                                    <motion.p
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-sm sm:text-base md:text-lg lg:text-xl font-mono"
                                        style={{ color: currentTheme.accent }}
                                    >
                                        Associate Software Engineer | AI, Automation & Cloud
                                    </motion.p>
                                )}
                            </div>

                            {/* Right Column - Info */}
                            {nameComplete && (
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="flex flex-col justify-center space-y-4 font-mono"
                                >
                                    <div className="space-y-3">
                                        <h3 className="text-sm font-semibold uppercase tracking-wider" style={{ color: currentTheme.accent }}>Professional Summary</h3>
                                        <p className="leading-relaxed text-sm" style={{ color: `${currentTheme.textColor}B3` }}>
                                            Associate Software Engineer with hands-on experience in automation engineering, cloud-native systems, and applied AI. Strong background in building scalable automation frameworks, validating large-scale data migrations, and developing AI-powered applications including RAG pipelines and agentic chatbots using local LLMs.
                                        </p>
                                    </div>

                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.3 }}
                                        className="pt-4 border-t border-white/10"
                                    >
                                        <p className="text-sm leading-relaxed" style={{ color: `${currentTheme.textColor}80` }}>
                                            <span style={{ color: currentTheme.accent }}>$</span> Building automation frameworks, AI-powered applications and cloud-native systems.
                                        </p>
                                    </motion.div>

                                    <div className="flex flex-wrap gap-2 pt-2">
                                        {['Python', 'Selenium', 'LangChain', 'Azure AKS', 'Docker'].map((tech, i) => (
                                            <motion.span
                                                key={tech}
                                                initial={{ opacity: 0, scale: 0 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: 0.4 + i * 0.1, type: 'spring' }}
                                                className="px-3 py-1 text-xs font-mono rounded-lg"
                                                style={{
                                                    color: `${currentTheme.textColor}CC`,
                                                    backgroundColor: `${currentTheme.accent}15`,
                                                    borderWidth: '1px',
                                                    borderStyle: 'solid',
                                                    borderColor: `${currentTheme.accent}40`
                                                }}
                                            >
                                                {tech}
                                            </motion.span>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </motion.div>

                {/* Bento Grid Layout */}
                {nameComplete && (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="space-y-10 sm:space-y-12 lg:space-y-16"
                    >
                        {/* About Section - Bento Grid */}
                        <section>
                            <SectionHeader icon={<User className="w-5 h-5" style={{ color: currentTheme.accent }} />} title="About Me" theme={currentTheme} />
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                                <GlassCard className="lg:col-span-8" delay={0.1} theme={currentTheme}>
                                    <div className="flex flex-col sm:flex-row items-start gap-6">
                                        <motion.div
                                            whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                                            transition={{ duration: 0.5 }}
                                            className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-500/30 to-purple-500/30 border border-white/20 flex items-center justify-center shrink-0 shadow-xl"
                                        >
                                            <User className="w-10 h-10 text-cyan-400" />
                                        </motion.div>
                                        <div className="flex-1">
                                            <h3
                                                className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r mb-2"
                                                style={{
                                                    backgroundImage: `linear-gradient(to right, ${currentTheme.from}, ${currentTheme.to})`
                                                }}
                                            >
                                                Revanth B
                                            </h3>
                                            <p className="text-lg mb-4" style={{ color: currentTheme.name === 'Sunset' || currentTheme.name === 'Neon' ? `${currentTheme.textColor}E6` : `${currentTheme.textColor}80` }}>Associate Software Engineer @ BETSOL</p>
                                            <p className="leading-relaxed text-sm" style={{ color: `${currentTheme.textColor}80` }}>
                                                Hands-on experience in automation engineering, cloud-native systems, and applied AI. Building scalable test automation frameworks, validating large-scale data migrations, and developing AI-powered applications including RAG pipelines and agentic chatbots using local LLMs.
                                            </p>
                                        </div>
                                    </div>
                                </GlassCard>

                                <GlassCard className="lg:col-span-4" delay={0.2} theme={currentTheme}>
                                    <div className="space-y-5">
                                        <motion.div whileHover={{ x: 5 }} className="flex items-center gap-4 text-sm group">
                                            <div className="p-2 rounded-lg bg-cyan-500/10 group-hover:bg-cyan-500/20 transition-colors">
                                                <MapPin className="w-4 h-4" style={{ color: getIconColor('cyan', currentTheme.name) }} />
                                            </div>
                                            <span className="" style={{ color: `${currentTheme.textColor}B3` }}>Bengaluru, India</span>
                                        </motion.div>
                                        <motion.div whileHover={{ x: 5 }} className="flex items-center gap-4 text-sm group">
                                            <div className="p-2 rounded-lg bg-purple-500/10 group-hover:bg-purple-500/20 transition-colors">
                                                <GraduationCap className="w-4 h-4" style={{ color: getIconColor('purple', currentTheme.name) }} />
                                            </div>
                                            <span className="" style={{ color: `${currentTheme.textColor}B3` }}>B.Tech CSE '24</span>
                                        </motion.div>
                                        <motion.div whileHover={{ x: 5 }} className="flex items-center gap-4 text-sm group">
                                            <div className="p-2 rounded-lg bg-emerald-500/10 group-hover:bg-emerald-500/20 transition-colors">
                                                <Briefcase className="w-4 h-4" style={{ color: getIconColor('emerald', currentTheme.name) }} />
                                            </div>
                                            <span className="" style={{ color: `${currentTheme.textColor}B3` }}>1+ Years Experience</span>
                                        </motion.div>
                                    </div>
                                </GlassCard>
                            </div>
                        </section>

                        {/* Experience Section */}
                        <section>
                            <SectionHeader icon={<Briefcase className="w-5 h-5" style={{ color: currentTheme.accent }} />} title="Experience" theme={currentTheme} />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                                <GlassCard delay={0.1} theme={currentTheme}>
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-lg shadow-emerald-400/50" />
                                        <span className="text-xs font-mono text-emerald-400/70 uppercase tracking-wider">Current</span>
                                    </div>
                                    <h3 className="text-xl font-bold mb-2" style={{ color: currentTheme.accent }}>CVS Health (Project: EVOS)</h3>
                                    <p className="mb-1" style={{ color: currentTheme.accent }}>BETSOL</p>
                                    <p className="text-xs mb-4" style={{ color: `${currentTheme.textColor}CC` }}>Automation Engineering & Software Development</p>
                                    <ul className="text-sm leading-relaxed space-y-2" style={{ color: `${currentTheme.textColor}80` }}>
                                        <li>• Built automation framework with Python, Selenium, PyTest & Allure</li>
                                        <li>• Automated validation of 600K+ TFNs, reducing execution to under 2 hours</li>
                                        <li>• Developed custom scripts for bulk data validation & integrity checks</li>
                                    </ul>
                                </GlassCard>

                                <GlassCard delay={0.2} theme={currentTheme}>
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="w-2 h-2 rounded-full bg-purple-400" />
                                        <span className="text-xs font-mono text-purple-400/70 uppercase tracking-wider">Previous</span>
                                    </div>
                                    <h3 className="text-xl font-bold mb-2" style={{ color: currentTheme.accent }}>Avaya HCS (Cloud Support)</h3>
                                    <p className="mb-1" style={{ color: currentTheme.accent }}>BETSOL</p>
                                    <p className="text-xs mb-4" style={{ color: `${currentTheme.textColor}CC` }}>Azure Kubernetes Service (AKS)</p>
                                    <ul className="text-sm leading-relaxed space-y-2" style={{ color: `${currentTheme.textColor}80` }}>
                                        <li>• Supported Avaya Hybrid Cloud Services hosted on Azure AKS</li>
                                        <li>• Monitored with Grafana & Prometheus for proactive issue resolution</li>
                                        <li>• Performed root cause analysis & incident resolution in production</li>
                                    </ul>
                                </GlassCard>
                            </div>
                        </section>

                        {/* Projects Section */}
                        <section>
                            <SectionHeader icon={<FolderGit2 className="w-5 h-5" style={{ color: currentTheme.accent }} />} title="Projects" theme={currentTheme} />
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                                {[
                                    {
                                        icon: Database,
                                        color: 'cyan',
                                        title: 'RAG System',
                                        desc: 'Retrieval-Augmented Generation system using LangChain, ChromaDB, Streamlit & Ollama for local LLM inference.',
                                        tags: ['RAG', 'LangChain', 'ChromaDB', 'Ollama'],
                                        link: 'https://github.com/rev369/RAG-Assistant'
                                    },
                                    {
                                        icon: Cpu,
                                        color: 'purple',
                                        title: 'LangGraph Chatbot',
                                        desc: 'AI-powered chatbot with conversational memory and multi-step reasoning using LangGraph.',
                                        tags: ['LangGraph', 'Streamlit', 'Ollama'],
                                        link: 'https://github.com/rev369/Chatbot'
                                    },
                                    {
                                        icon: Sparkles,
                                        color: 'amber',
                                        title: 'MCP Agentic Chatbot',
                                        desc: 'Agentic chatbot using MCP-based architecture with tool-calling via custom MCP servers.',
                                        tags: ['MCP', 'Agentic AI', 'Tool-Calling'],
                                        link: 'https://github.com/rev369/Playwright-MCP'
                                    }
                                ].map((project, i) => (
                                    <GlassCard key={project.title} delay={i * 0.1} theme={currentTheme}>
                                        <div className="flex flex-col h-full">
                                            <div className="flex items-start justify-between mb-5">
                                                <motion.div
                                                    whileHover={{ rotate: 15, scale: 1.1 }}
                                                    className={`p-3 rounded-xl bg-${project.color}-500/10 border border-${project.color}-500/20`}
                                                >
                                                    <project.icon className="w-5 h-5" style={{ color: getIconColor(project.color, currentTheme.name) }} />
                                                </motion.div>
                                                <motion.a
                                                    whileHover={{ scale: 1.2, rotate: -10 }}
                                                    href={project.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="transition-colors"
                                                    style={{ color: `${currentTheme.textColor}66` }}
                                                >
                                                    <Github className="w-5 h-5" />
                                                </motion.a>
                                            </div>
                                            <h3 className="text-lg font-bold mb-3" style={{ color: currentTheme.accent }}>{project.title}</h3>
                                            <p className="text-sm mb-5 leading-relaxed flex-grow" style={{ color: `${currentTheme.textColor}CC` }}>{project.desc}</p>
                                            <div className="flex flex-wrap gap-2 mt-auto">
                                                {project.tags.map((tag, j) => (
                                                    <SkillTag key={tag} name={tag} delay={j * 0.05} theme={currentTheme} />
                                                ))}
                                            </div>
                                        </div>
                                    </GlassCard>
                                ))}
                            </div>
                        </section>

                        {/* Skills Section */}
                        <section>
                            <SectionHeader icon={<Code className="w-5 h-5" style={{ color: currentTheme.accent }} />} title="Skills" theme={currentTheme} />
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                                {[
                                    { icon: Cpu, color: 'cyan', title: 'AI & LLMs', skills: ['LangChain', 'LangGraph', 'RAG', 'Ollama', 'Agentic Systems'] },
                                    { icon: Cloud, color: 'purple', title: 'Cloud & DevOps', skills: ['Azure AKS', 'Docker', 'Grafana', 'Prometheus'] },
                                    { icon: Database, color: 'amber', title: 'Testing & Tools', skills: ['Selenium', 'PyTest', 'Allure', 'Python'] }
                                ].map((category, i) => (
                                    <GlassCard key={category.title} delay={i * 0.1} theme={currentTheme}>
                                        <div className="flex items-center gap-3 mb-5">
                                            <category.icon className="w-5 h-5" style={{ color: getIconColor(category.color, currentTheme.name) }} />
                                            <span className={`text-sm font-semibold text-${category.color}-400`}>{category.title}</span>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {category.skills.map((skill, j) => (
                                                <SkillTag key={skill} name={skill} delay={j * 0.05} theme={currentTheme} />
                                            ))}
                                        </div>
                                    </GlassCard>
                                ))}
                            </div>
                        </section>

                        {/* Certifications Section */}
                        <section>
                            <SectionHeader icon={<Award className="w-5 h-5" style={{ color: currentTheme.accent }} />} title="Certifications" theme={currentTheme} />
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                {[
                                    { name: 'Oracle Cloud Infrastructure Architect Associate', icon: Cloud, color: 'cyan', link: 'https://catalog-education.oracle.com/ords/certview/sharebadge?id=634B0D579BD9DA57B80EFBC2D0AB3D390844E04F5B50A7B981FF43944D97341F' },
                                    { name: 'Google Cloud Computing Foundations', icon: Cloud, color: 'purple', link: 'https://www.credly.com/badges/80915af4-7123-4780-acef-78f36c6976eb/linked_in_profile' },
                                    { name: 'Postman API Fundamentals Student Expert', icon: Code, color: 'amber', link: 'https://badgr.com/public/assertions/mvPwwt1yTxGMSDjx3X51rw' },
                                    { name: 'OCI 2025 Certified Foundations Associate', icon: Database, color: 'emerald', link: 'https://catalog-education.oracle.com/ords/certview/sharebadge?id=7F113B9763F6C4BC69821F0C42E32AF24507C6B7EA49E19F7B6502B15186B42C' },
                                    { name: 'Getting Started with Deep Learning - NVIDIA', icon: Cpu, color: 'emerald', link: 'https://learn.nvidia.com/certificates?id=HlvByEvORFqO_SKwL6ooCA' },
                                    { name: 'Getting started with AWS Machine Learning - Coursera', icon: Cloud, color: 'amber', link: 'https://www.coursera.org/account/accomplishments/verify/E85BD2SEV6XZ' },
                                ].map((cert, i) => (
                                    <a key={i} href={cert.link} target="_blank" rel="noopener noreferrer" className="block">
                                        <GlassCard delay={i * 0.1} theme={currentTheme}>
                                            <motion.div whileHover={{ x: 5 }} className="flex items-center gap-4 cursor-pointer">
                                                <div className={`p-2 rounded-lg bg-${cert.color}-500/10`}>
                                                    <cert.icon className="w-5 h-5" style={{ color: getIconColor(cert.color, currentTheme.name) }} />
                                                </div>
                                                <span className="text-sm transition-colors" style={{ color: `${currentTheme.textColor}CC` }}>{cert.name}</span>
                                            </motion.div>
                                        </GlassCard>
                                    </a>
                                ))}
                            </div>
                        </section>

                        {/* Contact Section */}
                        <section>
                            <SectionHeader icon={<Mail className="w-5 h-5" style={{ color: currentTheme.accent }} />} title="Connect" theme={currentTheme} />
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                <motion.a
                                    href="mailto:revanthbashyam2002@gmail.com"
                                    whileHover={{ scale: 1.02 }}
                                    className="block"
                                >
                                    <GlassCard delay={0.1} hover={false} theme={currentTheme}>
                                        <div className="flex items-center gap-5">
                                            <motion.div
                                                whileHover={{ rotate: [0, -10, 10, 0] }}
                                                className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20"
                                            >
                                                <Mail className="w-6 h-6" style={{ color: getIconColor('rose', currentTheme.name) }} />
                                            </motion.div>
                                            <div>
                                                <p className="text-xs mb-1" style={{ color: `${currentTheme.textColor}CC` }}>Email</p>
                                                <p className="text-cyan-400 font-mono hover:text-cyan-300 transition-colors text-xs sm:text-sm md:text-base break-all">
                                                    revanthbashyam2002@gmail.com
                                                </p>
                                            </div>
                                        </div>
                                    </GlassCard>
                                </motion.a>

                                <motion.a
                                    href="https://www.linkedin.com/in/revanth-b-415885222/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.02 }}
                                    className="block"
                                >
                                    <GlassCard delay={0.2} hover={false} theme={currentTheme}>
                                        <div className="flex items-center gap-5">
                                            <motion.div
                                                whileHover={{ rotate: [0, -10, 10, 0] }}
                                                className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20"
                                            >
                                                <Linkedin className="w-6 h-6" style={{ color: getIconColor('blue', currentTheme.name) }} />
                                            </motion.div>
                                            <div>
                                                <p className="text-xs mb-1" style={{ color: `${currentTheme.textColor}CC` }}>LinkedIn</p>
                                                <p className="text-blue-400 font-mono hover:text-blue-300 transition-colors flex items-center gap-2">
                                                    /revanth-b <ExternalLink className="w-4 h-4" />
                                                </p>
                                            </div>
                                        </div>
                                    </GlassCard>
                                </motion.a>
                            </div>
                        </section>

                        {/* Footer */}
                        <motion.footer
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="text-center pt-16 pb-8"
                        >
                            <p className="text-sm font-mono" style={{ color: `${currentTheme.textColor}4D` }}>
                                Built with <span className="text-rose-400">♥</span> using Next.js & Framer Motion
                            </p>
                        </motion.footer>
                    </motion.div>
                )}
            </main>
        </motion.div>
    );
};

export default Portfolio;
