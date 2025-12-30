import { Command } from '@/types/terminal';
import React from 'react';
import {
    User, Briefcase, Code, Award, Mail, Palette,
    Cpu, Cloud, Database, GitBranch, Sparkles, FolderGit2,
    Linkedin, ExternalLink, MapPin, GraduationCap, Github
} from 'lucide-react';

// Elegant Glass Card Component
const GlassCard: React.FC<{ children: React.ReactNode; className?: string; glow?: string }> = ({
    children,
    className = '',
    glow = 'cyan'
}) => (
    <div className={`group relative ${className}`}>
        <div className={`absolute -inset-1 bg-gradient-to-r from-${glow}-500/20 to-purple-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700`} />
        <div className="relative bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] rounded-2xl p-6 hover:bg-white/[0.05] hover:border-white/[0.15] transition-all duration-500 h-full">
            {children}
        </div>
    </div>
);

// Section Header
const SectionHeader: React.FC<{ icon: React.ReactNode; title: string; color: string }> = ({ icon, title, color }) => (
    <div className="flex items-center gap-3 mb-6">
        <div className={`p-2.5 rounded-xl bg-${color}-500/10 border border-${color}-500/20`}>
            {icon}
        </div>
        <h2 className={`text-xl font-semibold text-${color}-400 tracking-wide`}>{title}</h2>
    </div>
);

// Skill Tag
const SkillTag: React.FC<{ name: string }> = ({ name }) => (
    <span className="px-3 py-1 text-xs font-mono bg-white/5 border border-white/10 rounded-full text-white/70 hover:border-cyan-400/30 hover:text-cyan-300 transition-all duration-300 cursor-default">
        {name}
    </span>
);

export const COMMANDS: Record<string, Command> = {
    help: {
        name: 'help',
        description: 'Display commands',
        aliases: ['h', '?'],
        execute: () => ({
            type: 'component',
            content: (
                <GlassCard>
                    <div className="flex flex-wrap gap-3">
                        {['whoami', 'experience', 'projects', 'skills', 'certifications', 'contact', 'theme'].map(cmd => (
                            <span key={cmd} className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl font-mono text-sm text-cyan-400 hover:bg-cyan-500/10 transition-colors cursor-pointer">
                                {cmd}
                            </span>
                        ))}
                    </div>
                </GlassCard>
            ),
        }),
    },

    clear: {
        name: 'clear',
        description: 'Clear terminal',
        aliases: ['cls'],
        execute: () => ({ type: 'text', content: '' }),
    },

    whoami: {
        name: 'whoami',
        description: 'About me',
        aliases: ['about', 'bio'],
        execute: () => ({
            type: 'component',
            content: (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                    {/* Main Profile Card */}
                    <GlassCard className="lg:col-span-8">
                        <div className="flex flex-col sm:flex-row items-start gap-5">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center shrink-0">
                                <User className="w-8 h-8 text-cyan-400" />
                            </div>
                            <div className="flex-1">
                                <h2 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 mb-1">
                                    Revanth B
                                </h2>
                                <p className="text-white/60 mb-4">Associate Software Engineer @ BETSOL</p>
                                <p className="text-white/50 leading-relaxed text-sm">
                                    Passionate about building intelligent systems at the intersection of
                                    <span className="text-cyan-400"> AI</span>,
                                    <span className="text-purple-400"> Cloud</span>, and
                                    <span className="text-emerald-400"> DevOps</span>.
                                    Currently exploring RAG architectures and LLM applications.
                                </p>
                            </div>
                        </div>
                    </GlassCard>

                    {/* Quick Info */}
                    <GlassCard className="lg:col-span-4">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-sm">
                                <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
                                <span className="text-white/70">Bengaluru, India</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm">
                                <GraduationCap className="w-4 h-4 text-purple-400 shrink-0" />
                                <span className="text-white/70">B.Tech CSE '24</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm">
                                <Briefcase className="w-4 h-4 text-emerald-400 shrink-0" />
                                <span className="text-white/70">1+ Years Experience</span>
                            </div>
                        </div>
                    </GlassCard>

                    {/* Tags */}
                    <div className="lg:col-span-12 flex flex-wrap gap-2">
                        {['AI & ML', 'Cloud Architecture', 'DevOps', 'RAG Systems', 'LLMs'].map(tag => (
                            <span key={tag} className="px-4 py-2 text-xs bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-white/10 rounded-full text-white/70">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            ),
        }),
    },

    experience: {
        name: 'experience',
        description: 'Work history',
        aliases: ['exp', 'work'],
        execute: () => ({
            type: 'component',
            content: (
                <div>
                    <SectionHeader icon={<Briefcase className="w-5 h-5 text-emerald-400" />} title="Experience" color="emerald" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <GlassCard glow="emerald">
                            <div className="flex items-center gap-2 mb-3">
                                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                <span className="text-xs font-mono text-emerald-400/70 uppercase tracking-wider">Current</span>
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-1">Associate Software Engineer</h3>
                            <p className="text-cyan-400 text-sm mb-3">BETSOL</p>
                            <p className="text-xs text-white/40 mb-4">July 2024 — Present</p>
                            <p className="text-sm text-white/50 leading-relaxed">
                                Building AI-powered solutions with focus on RAG pipelines, cloud-native architectures, and intelligent automation.
                            </p>
                        </GlassCard>

                        <GlassCard glow="purple">
                            <div className="flex items-center gap-2 mb-3">
                                <span className="w-2 h-2 rounded-full bg-purple-400" />
                                <span className="text-xs font-mono text-purple-400/70 uppercase tracking-wider">Previous</span>
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-1">Event Co-Head</h3>
                            <p className="text-purple-400 text-sm mb-3">Google Developer Student Clubs</p>
                            <p className="text-xs text-white/40 mb-4">Oct 2023 — Feb 2024</p>
                            <p className="text-sm text-white/50 leading-relaxed">
                                Led technical events and workshops for 500+ developers on cloud technologies and AI/ML.
                            </p>
                        </GlassCard>
                    </div>
                </div>
            ),
        }),
    },

    projects: {
        name: 'projects',
        description: 'My projects',
        aliases: ['proj', 'work'],
        execute: () => ({
            type: 'component',
            content: (
                <div>
                    <SectionHeader icon={<FolderGit2 className="w-5 h-5 text-cyan-400" />} title="Projects" color="cyan" />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* RAG Assistant */}
                        <GlassCard>
                            <div className="flex items-start justify-between mb-4">
                                <div className="p-2 rounded-xl bg-cyan-500/10">
                                    <Database className="w-5 h-5 text-cyan-400" />
                                </div>
                                <a href="https://github.com/rev369/RAG-Assistant" target="_blank" rel="noopener noreferrer"
                                    className="text-white/40 hover:text-cyan-400 transition-colors">
                                    <Github className="w-5 h-5" />
                                </a>
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-2">RAG Assistant</h3>
                            <p className="text-sm text-white/50 mb-4 leading-relaxed">
                                AI chatbot using Gemma3 model to answer questions from PDF documents with RAG architecture.
                            </p>
                            <div className="flex flex-wrap gap-2">
                                <SkillTag name="RAG" />
                                <SkillTag name="Gemma3" />
                                <SkillTag name="LangChain" />
                            </div>
                        </GlassCard>

                        {/* AI Chatbot */}
                        <GlassCard>
                            <div className="flex items-start justify-between mb-4">
                                <div className="p-2 rounded-xl bg-purple-500/10">
                                    <Cpu className="w-5 h-5 text-purple-400" />
                                </div>
                                <a href="https://github.com/rev369/Chatbot" target="_blank" rel="noopener noreferrer"
                                    className="text-white/40 hover:text-purple-400 transition-colors">
                                    <Github className="w-5 h-5" />
                                </a>
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-2">AI Chatbot</h3>
                            <p className="text-sm text-white/50 mb-4 leading-relaxed">
                                Intelligent chatbot assistant powered by LangChain, Streamlit, and Ollama for local inference.
                            </p>
                            <div className="flex flex-wrap gap-2">
                                <SkillTag name="LangChain" />
                                <SkillTag name="Streamlit" />
                                <SkillTag name="Ollama" />
                            </div>
                        </GlassCard>

                        {/* Car Price Prediction */}
                        <GlassCard>
                            <div className="flex items-start justify-between mb-4">
                                <div className="p-2 rounded-xl bg-amber-500/10">
                                    <Sparkles className="w-5 h-5 text-amber-400" />
                                </div>
                                <a href="https://github.com/rev369/car-price-prediction" target="_blank" rel="noopener noreferrer"
                                    className="text-white/40 hover:text-amber-400 transition-colors">
                                    <Github className="w-5 h-5" />
                                </a>
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-2">Car Price Prediction</h3>
                            <p className="text-sm text-white/50 mb-4 leading-relaxed">
                                ML model predicting used car prices based on features using TensorFlow and Keras.
                            </p>
                            <div className="flex flex-wrap gap-2">
                                <SkillTag name="TensorFlow" />
                                <SkillTag name="Keras" />
                                <SkillTag name="ML" />
                            </div>
                        </GlassCard>
                    </div>
                </div>
            ),
        }),
    },

    skills: {
        name: 'skills',
        description: 'Tech stack',
        aliases: ['tech', 'stack'],
        execute: () => ({
            type: 'component',
            content: (
                <div>
                    <SectionHeader icon={<Code className="w-5 h-5 text-purple-400" />} title="Skills" color="purple" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <GlassCard>
                            <div className="flex items-center gap-2 mb-4">
                                <Cpu className="w-4 h-4 text-cyan-400" />
                                <span className="text-sm font-medium text-cyan-400">AI & ML</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {['TensorFlow', 'Keras', 'LangChain', 'RAG', 'Streamlit'].map(s => <SkillTag key={s} name={s} />)}
                            </div>
                        </GlassCard>

                        <GlassCard>
                            <div className="flex items-center gap-2 mb-4">
                                <Cloud className="w-4 h-4 text-purple-400" />
                                <span className="text-sm font-medium text-purple-400">Cloud & DevOps</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {['Docker', 'Oracle Cloud', 'Google Cloud', 'CI/CD'].map(s => <SkillTag key={s} name={s} />)}
                            </div>
                        </GlassCard>

                        <GlassCard>
                            <div className="flex items-center gap-2 mb-4">
                                <Database className="w-4 h-4 text-amber-400" />
                                <span className="text-sm font-medium text-amber-400">Tools</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {['Git', 'Postman', 'VS Code', 'Linux'].map(s => <SkillTag key={s} name={s} />)}
                            </div>
                        </GlassCard>
                    </div>
                </div>
            ),
        }),
    },

    certifications: {
        name: 'certifications',
        description: 'Certifications',
        aliases: ['certs'],
        execute: () => ({
            type: 'component',
            content: (
                <div>
                    <SectionHeader icon={<Award className="w-5 h-5 text-amber-400" />} title="Certifications" color="amber" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {[
                            { name: 'Oracle Cloud Infrastructure Architect Associate', icon: Cloud, color: 'cyan' },
                            { name: 'Google Cloud Computing Foundations', icon: Cloud, color: 'purple' },
                            { name: 'Postman API Fundamentals Student Expert', icon: Code, color: 'amber' },
                            { name: 'OCI 2025 Certified Foundations Associate', icon: Database, color: 'emerald' },
                        ].map((cert, i) => (
                            <GlassCard key={i}>
                                <div className="flex items-center gap-3">
                                    <cert.icon className={`w-4 h-4 text-${cert.color}-400 shrink-0`} />
                                    <span className="text-sm text-white/80">{cert.name}</span>
                                </div>
                            </GlassCard>
                        ))}
                    </div>
                </div>
            ),
        }),
    },

    contact: {
        name: 'contact',
        description: 'Contact me',
        aliases: ['email', 'connect'],
        execute: () => ({
            type: 'component',
            content: (
                <div>
                    <SectionHeader icon={<Mail className="w-5 h-5 text-rose-400" />} title="Connect" color="rose" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <a href="mailto:revanthbashyam2002@gmail.com" className="block group">
                            <GlassCard glow="rose">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 rounded-xl bg-rose-500/10 group-hover:bg-rose-500/20 transition-colors">
                                        <Mail className="w-5 h-5 text-rose-400" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-xs text-white/40 mb-1">Email</p>
                                        <p className="text-sm text-cyan-400 font-mono truncate group-hover:text-cyan-300 transition-colors">
                                            revanthbashyam2002@gmail.com
                                        </p>
                                    </div>
                                </div>
                            </GlassCard>
                        </a>

                        <a href="https://linkedin.com/in/revanth-b-415885222" target="_blank" rel="noopener noreferrer" className="block group">
                            <GlassCard glow="blue">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 rounded-xl bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors">
                                        <Linkedin className="w-5 h-5 text-blue-400" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-xs text-white/40 mb-1">LinkedIn</p>
                                        <p className="text-sm text-blue-400 font-mono group-hover:text-blue-300 transition-colors flex items-center gap-1">
                                            /revanth-b <ExternalLink className="w-3 h-3" />
                                        </p>
                                    </div>
                                </div>
                            </GlassCard>
                        </a>
                    </div>
                </div>
            ),
        }),
    },

    theme: {
        name: 'theme',
        description: 'Change theme',
        execute: (args, { setTheme }) => {
            if (!args.length) {
                return {
                    type: 'component',
                    content: (
                        <div className="flex flex-wrap gap-3">
                            {['cyber', 'matrix', 'aurora', 'sunset'].map(t => (
                                <span key={t} className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl font-mono text-sm hover:border-cyan-400/50 transition-colors cursor-pointer">
                                    {t}
                                </span>
                            ))}
                        </div>
                    ),
                };
            }
            const success = setTheme(args[0]);
            return {
                type: success ? 'success' : 'error',
                content: success ? `✓ Theme: ${args[0]}` : `✗ Unknown: ${args[0]}`,
            };
        },
    },
};
