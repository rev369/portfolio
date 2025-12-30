export type CommandOutput = {
    type: 'text' | 'component' | 'error' | 'success';
    content: React.ReactNode;
};

export type CommandContext = {
    setTheme: (themeName: string) => boolean;
};

export type Command = {
    name: string;
    description: string;
    aliases?: string[];
    execute: (args: string[], context: CommandContext) => CommandOutput | Promise<CommandOutput>;
};

export type TerminalTheme = {
    name: string;
    background: string;
    foreground: string;
    prompt: string;
    accent: string;
    selection: string;
    cursor: string;
    gradientFrom: string;
    gradientTo: string;
};

export type HistoryEntry = {
    id: string;
    timestamp: number;
    command: string;
    output: CommandOutput;
};

export type TerminalState = {
    history: HistoryEntry[];
    currentInput: string;
    commandHistory: string[];
    historyPointer: number;
    theme: TerminalTheme;
    isProcessing: boolean;
};
