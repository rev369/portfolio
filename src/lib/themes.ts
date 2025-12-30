import { TerminalTheme } from '@/types/terminal';

export const THEMES: Record<string, TerminalTheme> = {
    cyber: {
        name: 'cyber',
        background: '#0a0e17',
        foreground: '#e0e6f0',
        prompt: '#00d9ff',
        accent: '#00d9ff',
        selection: '#1a2744',
        cursor: '#00d9ff',
        gradientFrom: '#00d9ff',
        gradientTo: '#00ff88',
    },
    matrix: {
        name: 'matrix',
        background: '#0d0208',
        foreground: '#00ff41',
        prompt: '#008f11',
        accent: '#00ff41',
        selection: '#003b00',
        cursor: '#00ff41',
        gradientFrom: '#00ff41',
        gradientTo: '#00d9ff',
    },
    aurora: {
        name: 'aurora',
        background: '#0f0f23',
        foreground: '#ccccff',
        prompt: '#ff79c6',
        accent: '#bd93f9',
        selection: '#44475a',
        cursor: '#ff79c6',
        gradientFrom: '#ff79c6',
        gradientTo: '#bd93f9',
    },
    sunset: {
        name: 'sunset',
        background: '#1a1423',
        foreground: '#ffecd2',
        prompt: '#ff6b6b',
        accent: '#ffa502',
        selection: '#2d1f3d',
        cursor: '#ff6b6b',
        gradientFrom: '#ff6b6b',
        gradientTo: '#ffa502',
    },
};

export const DEFAULT_THEME = THEMES.cyber;
