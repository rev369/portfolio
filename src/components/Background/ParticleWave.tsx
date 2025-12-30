'use client';

import React, { useEffect, useRef, useState } from 'react';

interface Particle {
    x: number;
    y: number;
    baseX: number;
    baseY: number;
    size: number;
    color: string;
    speed: number;
}

const ParticleWave: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const mouseRef = useRef({ x: 0, y: 0 });
    const animationRef = useRef<number>();
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const updateDimensions = () => {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };

        updateDimensions();
        window.addEventListener('resize', updateDimensions);
        return () => window.removeEventListener('resize', updateDimensions);
    }, []);

    useEffect(() => {
        if (dimensions.width === 0 || dimensions.height === 0) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Initialize particles - reduce count on mobile for performance
        const isMobile = dimensions.width < 768;
        const particleCount = isMobile
            ? Math.min(40, Math.floor((dimensions.width * dimensions.height) / 25000))
            : Math.min(150, Math.floor((dimensions.width * dimensions.height) / 12000));
        const colors = [
            'rgba(56, 189, 248, 0.8)',  // cyan
            'rgba(99, 102, 241, 0.8)',  // indigo
            'rgba(139, 92, 246, 0.8)',  // purple
            'rgba(34, 211, 238, 0.6)',  // light cyan
            'rgba(168, 85, 247, 0.6)',  // violet
        ];

        particlesRef.current = [];
        for (let i = 0; i < particleCount; i++) {
            const x = Math.random() * dimensions.width;
            const y = Math.random() * dimensions.height;
            particlesRef.current.push({
                x,
                y,
                baseX: x,
                baseY: y,
                size: Math.random() * 3 + 1,
                color: colors[Math.floor(Math.random() * colors.length)],
                speed: Math.random() * 0.02 + 0.01
            });
        }

        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };

        window.addEventListener('mousemove', handleMouseMove);

        const animate = () => {
            ctx.clearRect(0, 0, dimensions.width, dimensions.height);

            particlesRef.current.forEach((particle) => {
                // Calculate distance from mouse
                const dx = mouseRef.current.x - particle.x;
                const dy = mouseRef.current.y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const maxDistance = 200;

                if (distance < maxDistance) {
                    // Push particles away from cursor
                    const force = (maxDistance - distance) / maxDistance;
                    const angle = Math.atan2(dy, dx);
                    const moveX = Math.cos(angle) * force * 50;
                    const moveY = Math.sin(angle) * force * 50;

                    particle.x -= moveX * 0.1;
                    particle.y -= moveY * 0.1;
                }

                // Return to base position
                particle.x += (particle.baseX - particle.x) * particle.speed;
                particle.y += (particle.baseY - particle.y) * particle.speed;

                // Add subtle floating motion
                particle.x += Math.sin(Date.now() * 0.001 + particle.baseX) * 0.3;
                particle.y += Math.cos(Date.now() * 0.001 + particle.baseY) * 0.3;

                // Draw particle
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = particle.color;
                ctx.fill();

                // Draw glow
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
                const gradient = ctx.createRadialGradient(
                    particle.x, particle.y, 0,
                    particle.x, particle.y, particle.size * 3
                );
                gradient.addColorStop(0, particle.color.replace('0.8', '0.3').replace('0.6', '0.2'));
                gradient.addColorStop(1, 'transparent');
                ctx.fillStyle = gradient;
                ctx.fill();
            });

            // Draw connection lines between nearby particles
            particlesRef.current.forEach((particle, i) => {
                for (let j = i + 1; j < particlesRef.current.length; j++) {
                    const other = particlesRef.current[j];
                    const dx = particle.x - other.x;
                    const dy = particle.y - other.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(other.x, other.y);
                        ctx.strokeStyle = `rgba(56, 189, 248, ${0.15 * (1 - distance / 100)})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            });

            animationRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [dimensions]);

    return (
        <canvas
            ref={canvasRef}
            width={dimensions.width}
            height={dimensions.height}
            className="fixed inset-0 pointer-events-none z-0"
            style={{ background: 'transparent' }}
        />
    );
};

export default ParticleWave;
