import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  originalX: number;
  originalY: number;
  glowIntensity: number;
  glowDirection: boolean;
}

const InteractiveDots: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const mouse = useRef({ x: 0, y: 0 });
  const animationFrameId = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      particles.current = [];
      const numberOfParticles = 50;

      for (let i = 0; i < numberOfParticles; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        particles.current.push({
          x,
          y,
          radius: Math.random() * 2 + 1.5,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          originalX: x,
          originalY: y,
          glowIntensity: Math.random(),
          glowDirection: Math.random() > 0.5,
        });
      }
    };

    const drawParticle = (particle: Particle) => {
      if (!ctx) return;

      // Update glow intensity
      if (particle.glowDirection) {
        particle.glowIntensity += 0.01;
        if (particle.glowIntensity >= 1) {
          particle.glowDirection = false;
        }
      } else {
        particle.glowIntensity -= 0.01;
        if (particle.glowIntensity <= 0.3) {
          particle.glowDirection = true;
        }
      }

      // Create multiple layered gradients for enhanced glow effect
      // Base glow
      const baseGlow = ctx.createRadialGradient(
        particle.x,
        particle.y,
        0,
        particle.x,
        particle.y,
        particle.radius * 4
      );

      baseGlow.addColorStop(0, `rgba(59, 130, 246, ${0.8 * particle.glowIntensity})`);
      baseGlow.addColorStop(0.4, `rgba(147, 51, 234, ${0.3 * particle.glowIntensity})`);
      baseGlow.addColorStop(1, 'rgba(59, 130, 246, 0)');

      // Outer glow
      const outerGlow = ctx.createRadialGradient(
        particle.x,
        particle.y,
        0,
        particle.x,
        particle.y,
        particle.radius * 6
      );

      outerGlow.addColorStop(0, `rgba(96, 165, 250, ${0.4 * particle.glowIntensity})`);
      outerGlow.addColorStop(0.5, `rgba(167, 139, 250, ${0.2 * particle.glowIntensity})`);
      outerGlow.addColorStop(1, 'rgba(96, 165, 250, 0)');

      // Draw outer glow
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius * 6, 0, Math.PI * 2);
      ctx.fillStyle = outerGlow;
      ctx.fill();

      // Draw base particle
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius * 2, 0, Math.PI * 2);
      ctx.fillStyle = baseGlow;
      ctx.fill();

      // Add center highlight
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${0.8 * particle.glowIntensity})`;
      ctx.fill();
    };

    const connectParticles = () => {
      if (!ctx) return;

      for (let i = 0; i < particles.current.length; i++) {
        for (let j = i + 1; j < particles.current.length; j++) {
          const dx = particles.current[i].x - particles.current[j].x;
          const dy = particles.current[i].y - particles.current[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            const avgGlow = (particles.current[i].glowIntensity + particles.current[j].glowIntensity) / 2;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(147, 197, 253, ${0.3 * (1 - distance / 150) * avgGlow})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles.current[i].x, particles.current[i].y);
            ctx.lineTo(particles.current[j].x, particles.current[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.current.forEach((particle) => {
        // Mouse interaction
        const dx = mouse.current.x - particle.x;
        const dy = mouse.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 200;

        if (distance < maxDistance) {
          const force = (maxDistance - distance) / maxDistance;
          particle.x -= dx * force * 0.03;
          particle.y -= dy * force * 0.03;
          // Increase glow intensity when near mouse
          particle.glowIntensity = Math.min(1, particle.glowIntensity + 0.05);
        }

        // Return to original position
        particle.x += (particle.originalX - particle.x) * 0.05;
        particle.y += (particle.originalY - particle.y) * 0.05;

        // Add some movement
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        drawParticle(particle);
      });

      connectParticles();
      animationFrameId.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    resizeCanvas();
    createParticles();
    animate();

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0"
      style={{ background: 'transparent' }}
    />
  );
};

export default InteractiveDots;