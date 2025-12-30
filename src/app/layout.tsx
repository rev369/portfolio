import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
    title: 'Revanth B | AI & DevOps Engineer',
    description: 'Portfolio of Revanth B - Associate Software Engineer specializing in AI, ML, Cloud Architecture, and DevOps.',
    keywords: ['AI', 'ML', 'DevOps', 'Cloud', 'Software Engineer', 'TensorFlow', 'LangChain', 'Oracle Cloud'],
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className="antialiased">{children}</body>
        </html>
    );
}
