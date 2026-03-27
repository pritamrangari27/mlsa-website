// NeonRibbon

// RibbonCursor

'use client';

import Link from 'next/link';
import React, { useEffect, useRef } from 'react';

// Configuration for the ribbon effect
const CONFIG = {
    SPEED_X: 0.15,
    SPEED_Y: 0.15,
    MAX_LENGTH: 120,
    RED_STEP: 0.02,
    GREEN_STEP: 0.015,
    BLUE_STEP: 0.025,
    SPREAD_LIMIT: 20, // Limit how wide the ribbon gets
};

interface Point {
    x: number;
    y: number;
    dx: number;
    dy: number;
    size: number;
    color: string;
}

function RibbonCursor() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // We use refs for mutable state to avoid triggering React re-renders 60 times a second
    const animationRef = useRef<number>(0);
    const pointsRef = useRef<Point[]>([]);
    const mouseRef = useRef({ x: 0, y: 0 });
    const prevMouseRef = useRef({ x: 0, y: 0 });

    // Color state
    const colorState = useRef({ red: 0, green: 255, blue: 255, size: 0 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Initialize Canvas Size
        const resize = () => {
            if (containerRef.current) {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            }
        };

        // Set initial size
        resize();
        window.addEventListener('resize', resize);

        // Helper: Spread Logic (moves points apart)
        const spreadPoint = (p: Point) => {
            p.x += p.dx;
            p.y += p.dy;
        };

        // Helper: Draw Lines
        const drawLines = () => {
            const points = pointsRef.current;
            const total = points.length;

            // Need at least 3 points to draw a curve
            if (total < 3) return;

            let p0, p1, p2;

            for (let i = total - 1; i > 1; i--) {
                p0 = points[i];
                p1 = points[i - 1];
                p2 = points[i - 2];

                ctx.beginPath();
                ctx.strokeStyle = p0.color;
                ctx.lineWidth = p0.size;
                ctx.globalAlpha = i / total; // Fade out tail

                // Quadratic Bezier curve for smooth lines
                ctx.moveTo((p1.x + p0.x) / 2, (p1.y + p0.y) / 2);
                ctx.quadraticCurveTo(p1.x, p1.y, (p1.x + p2.x) / 2, (p1.y + p2.y) / 2);

                ctx.stroke();

                spreadPoint(p0);
            }

            // Spread head and tail
            if (points[0]) spreadPoint(points[0]);
            if (points[total - 1]) spreadPoint(points[total - 1]);
        };

        // Main Draw Loop
        const draw = () => {
            const { x: mouseX, y: mouseY } = mouseRef.current;
            const { x: px, y: py } = prevMouseRef.current;

            // Calculate movement delta
            let dx = (mouseX - px) * CONFIG.SPEED_X;
            let dy = (mouseY - py) * CONFIG.SPEED_Y;

            // Limit spread
            const limit = CONFIG.SPREAD_LIMIT; // Using a fixed spread limit for stability
            if (dx < -limit) dx = -limit;
            if (dx > limit) dx = limit;
            if (dy < -limit) dy = -limit;
            if (dy > limit) dy = limit;

            // Update Previous Mouse
            prevMouseRef.current.x = mouseX;
            prevMouseRef.current.y = mouseY;

            // Update Color Sine Waves
            colorState.current.size += 0.125;
            colorState.current.red += CONFIG.RED_STEP;
            colorState.current.green += CONFIG.GREEN_STEP;
            colorState.current.blue += CONFIG.BLUE_STEP;

            const size = Math.abs(Math.sin(colorState.current.size) * 10) + 1;
            const r = Math.floor(Math.sin(colorState.current.red) * 128 + 128);
            const g = Math.floor(Math.sin(colorState.current.green) * 128 + 128);
            const b = Math.floor(Math.sin(colorState.current.blue) * 128 + 128);

            // Add New Point
            pointsRef.current.push({
                x: mouseX,
                y: mouseY,
                dx,
                dy,
                size,
                color: `rgb(${r}, ${g}, ${b})`,
            });

            // Limit Array Size
            if (pointsRef.current.length > CONFIG.MAX_LENGTH) {
                pointsRef.current.shift();
            }

            // Clear Canvas (with fade effect)
            ctx.globalCompositeOperation = 'source-over';
            ctx.globalAlpha = 1;

            // This fills the background. 
            // Important: If you want the underlying text to be visible, 
            // you cannot fill with opacity 1 unless it's transparent.
            // But this specific effect relies on "trails" (not clearing fully).
            // So we fill with low opacity black to create the trail fade.
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw Ribbon
            ctx.globalCompositeOperation = 'lighter'; // Makes overlapping colors glow
            drawLines();
            drawLines();
            drawLines();

            animationRef.current = requestAnimationFrame(draw);
        };

        // Event Listeners
        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current.x = e.clientX;
            mouseRef.current.y = e.clientY;
        };

        const handleTouchMove = (e: TouchEvent) => {
            e.preventDefault();
            mouseRef.current.x = e.touches[0].clientX;
            mouseRef.current.y = e.touches[0].clientY;
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('touchmove', handleTouchMove, { passive: false });

        // Initial Start
        mouseRef.current.x = window.innerWidth / 2;
        mouseRef.current.y = window.innerHeight / 2;
        prevMouseRef.current.x = window.innerWidth / 2;
        prevMouseRef.current.y = window.innerHeight / 2;

        draw();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('touchmove', handleTouchMove);
            cancelAnimationFrame(animationRef.current);
        };
    }, []);

    return (
        <div ref={containerRef} className="fixed inset-0 bg-black -z-10">
            <canvas
                ref={canvasRef}
                className="block w-full h-full cursor-none touch-none"
            />
        </div>
    );
}


export default function Shaders() {
    return (
        <main className="relative min-h-screen w-full overflow-hidden text-white">

            {/* 1. The Background Animation */}
            <RibbonCursor />

            {/* 2. Your Overlay Content */}
            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen pointer-events-none">
                <h1 className="text-7xl font-bold tracking-tight text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-purple-500 drop-shadow-2xl">
                    LEARN.BUILD.LEAD
                </h1>

                <p className="mt-6 text-xl text-gray-300 font-light max-w-lg text-center">
                    Built by students, for students. <br />
                    Driven to innovate beyond boundaries
                </p>

                <div className="mt-12 pointer-events-auto">
                <Link href="/home">
                    <button className="px-8 py-3 border border-white/20 rounded-full hover:bg-white/10 transition-colors backdrop-blur-sm">
                        Join MLSA
                    </button>
                </Link>
                </div>
            </div>

        </main>
    );
}