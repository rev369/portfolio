'use client';

import React, { useRef, useEffect } from 'react';
import { TerminalTheme } from '@/types/terminal';
import { Terminal } from 'lucide-react';

interface CommandLineProps {
    currentInput: string;
    theme: TerminalTheme;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    isProcessing: boolean;
}

const CommandLine: React.FC<CommandLineProps> = ({
    currentInput,
    theme,
    onChange,
    onKeyDown,
    isProcessing,
}) => {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    return (
        <div className="flex items-center gap-3 w-full group">

            <div className="relative flex-1">
                <input
                    ref={inputRef}
                    type="text"
                    value={currentInput}
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                    disabled={isProcessing}
                    placeholder="Type a command... (try 'help')"
                    className="w-full bg-transparent border-none outline-none font-mono text-lg placeholder:text-white/20 caret-cyan-400"
                    style={{ color: theme.foreground }}
                    autoFocus
                    autoComplete="off"
                    spellCheck="false"
                />

            </div>
        </div>
    );
};

export default CommandLine;
