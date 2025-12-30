'use client';

import React, { useRef, useEffect } from 'react';
import { useTerminal } from '@/hooks/useTerminal';

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    opacity: number;
    type: 'node' | 'data';
}

interface Connection {
    from: number;
    to: number;
    progress: number;
    active: boolean;
}

const NeuralBackground: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { state } = useTerminal();
    const { theme } = state;

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let particles: Particle[] = [];
        let connections: Connection[] = [];

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        };

        const initParticles = () => {
            particles = [];
            // Reduce node count on mobile for better performance
            const isMobile = canvas.width < 768;
            const nodeCount = isMobile
                ? Math.floor((canvas.width * canvas.height) / 50000)
                : Math.floor((canvas.width * canvas.height) / 25000);

            for (let i = 0; i < nodeCount; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: (Math.random() - 0.5) * 0.5,
                    size: Math.random() * 3 + 1,
                    opacity: Math.random() * 0.5 + 0.2,
                    type: Math.random() > 0.7 ? 'data' : 'node',
                });
            }

            // Create connections
            connections = [];
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    if (Math.random() > 0.97) {
                        connections.push({
                            from: i,
                            to: j,
                            progress: 0,
                            active: Math.random() > 0.5,
                        });
                    }
                }
            }
        };

        const drawParticle = (p: Particle) => {
            const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3);
            gradient.addColorStop(0, `${theme.accent}${Math.floor(p.opacity * 255).toString(16).padStart(2, '0')}`);
            gradient.addColorStop(1, 'transparent');

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
            ctx.fillStyle = gradient;
            ctx.fill();

            // Core
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = p.type === 'data' ? theme.gradientTo : theme.accent;
            ctx.fill();
        };

        const drawConnections = () => {
            connections.forEach((conn, idx) => {
                const from = particles[conn.from];
                const to = particles[conn.to];
                if (!from || !to) return;

                const dx = to.x - from.x;
                const dy = to.y - from.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 200) {
                    const opacity = (1 - dist / 200) * 0.3;

                    // Draw base connection
                    ctx.beginPath();
                    ctx.moveTo(from.x, from.y);
                    ctx.lineTo(to.x, to.y);
                    ctx.strokeStyle = `${theme.accent}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`;
                    ctx.lineWidth = 1;
                    ctx.stroke();

                    // Animate data flow
                    if (conn.active) {
                        conn.progress += 0.02;
                        if (conn.progress > 1) {
                            conn.progress = 0;
                            conn.active = Math.random() > 0.3;
                        }

                        const px = from.x + dx * conn.progress;
                        const py = from.y + dy * conn.progress;

                        const glow = ctx.createRadialGradient(px, py, 0, px, py, 8);
                        glow.addColorStop(0, theme.gradientTo);
                        glow.addColorStop(1, 'transparent');

                        ctx.beginPath();
                        ctx.arc(px, py, 8, 0, Math.PI * 2);
                        ctx.fillStyle = glow;
                        ctx.fill();
                    }
                }
            });
        };

        const draw = () => {
            ctx.fillStyle = theme.background;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw grid
            ctx.strokeStyle = `${theme.accent}08`;
            ctx.lineWidth = 1;
            const gridSize = 50;

            for (let x = 0; x < canvas.width; x += gridSize) {
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, canvas.height);
                ctx.stroke();
            }
            for (let y = 0; y < canvas.height; y += gridSize) {
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(canvas.width, y);
                ctx.stroke();
            }

            drawConnections();

            // Update and draw particles
            particles.forEach((p) => {
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

                drawParticle(p);
            });

            animationFrameId = requestAnimationFrame(draw);
        };

        window.addEventListener('resize', resize);
        resize();
        draw();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, [theme]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 -z-10 pointer-events-none"
        />
    );
};

export default NeuralBackground;
