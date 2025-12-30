import { useState, useCallback, useEffect, useRef } from 'react';
import { TerminalState, HistoryEntry } from '@/types/terminal';
import { THEMES, DEFAULT_THEME } from '@/lib/themes';
import { COMMANDS } from '@/lib/commands';

export const useTerminal = () => {
    const [state, setState] = useState<TerminalState>({
        history: [],
        currentInput: '',
        commandHistory: [],
        historyPointer: -1,
        theme: DEFAULT_THEME,
        isProcessing: false,
    });

    const addToHistory = useCallback((command: string, output: any) => {
        setState(prev => ({
            ...prev,
            history: [
                ...prev.history,
                {
                    id: Math.random().toString(36).substr(2, 9),
                    timestamp: Date.now(),
                    command,
                    output,
                }
            ],
            commandHistory: command ? [...prev.commandHistory, command] : prev.commandHistory,
            historyPointer: -1,
            currentInput: '',
        }));
    }, []);

    const clearHistory = useCallback(() => {
        setState(prev => ({ ...prev, history: [] }));
    }, []);

    const processCommand = useCallback(async (input: string) => {
        if (!input.trim()) {
            return;
        }

        const [cmdName, ...args] = input.trim().toLowerCase().split(/\s+/);
        const command = Object.values(COMMANDS).find(
            c => c.name === cmdName || c.aliases?.includes(cmdName)
        );

        if (command) {
            try {
                const context = {
                    setTheme: (name: string) => {
                        const newTheme = THEMES[name];
                        if (newTheme) {
                            setState(prev => ({ ...prev, theme: newTheme }));
                            return true;
                        }
                        return false;
                    }
                };
                const output = await command.execute(args, context);
                if (cmdName === 'clear') {
                    clearHistory();
                } else {
                    addToHistory(input, output);
                }
            } catch (error) {
                addToHistory(input, {
                    type: 'error',
                    content: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
                });
            }
        } else {
            addToHistory(input, {
                type: 'error',
                content: `Command not found: ${cmdName}. Type 'help' for available commands.`,
            });
        }
    }, [addToHistory, clearHistory]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState(prev => ({ ...prev, currentInput: e.target.value }));
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            processCommand(state.currentInput);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setState(prev => {
                const newPointer = prev.historyPointer + 1;
                if (newPointer < prev.commandHistory.length) {
                    const historyIndex = prev.commandHistory.length - 1 - newPointer;
                    return {
                        ...prev,
                        historyPointer: newPointer,
                        currentInput: prev.commandHistory[historyIndex]
                    };
                }
                return prev;
            });
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            setState(prev => {
                const newPointer = prev.historyPointer - 1;
                if (newPointer >= 0) {
                    const historyIndex = prev.commandHistory.length - 1 - newPointer;
                    return {
                        ...prev,
                        historyPointer: newPointer,
                        currentInput: prev.commandHistory[historyIndex]
                    };
                } else {
                    return {
                        ...prev,
                        historyPointer: -1,
                        currentInput: ''
                    };
                }
            });
        }
    };

    const setTheme = useCallback((themeName: string) => {
        const newTheme = THEMES[themeName];
        if (newTheme) {
            setState(prev => ({ ...prev, theme: newTheme }));
            return true;
        }
        return false;
    }, []);

    // Auto-initialize on mount
    const hasInitialized = useRef(false);
    useEffect(() => {
        if (hasInitialized.current) return;
        hasInitialized.current = true;

        const init = async () => {
            const commands = ['whoami', 'experience', 'projects', 'skills', 'certifications', 'contact'];
            for (const cmd of commands) {
                await processCommand(cmd);
                await new Promise(r => setTimeout(r, 150));
            }
        };
        init();
    }, []);

    return {
        state,
        handleInputChange,
        handleKeyDown,
        processCommand,
        setTheme
    };
};
