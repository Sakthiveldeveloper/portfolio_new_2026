import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export const CyberGridBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let animationFrameId: number;

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Mouse tracking for interactive 3D wave ripples
    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);

    // Star specks in the upper sky
    const skyStars = Array.from({ length: 45 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height * 0.5,
      size: Math.random() * 1.5 + 0.8,
      baseAlpha: Math.random() * 0.6 + 0.2,
      twinkleSpeed: Math.random() * 0.03 + 0.01,
      phase: Math.random() * Math.PI * 2,
    }));

    // 3D Perspective Grid Parameters
    const cols = width < 768 ? 24 : 38;
    const rows = width < 768 ? 22 : 28;
    const fov = 320;
    const cameraHeight = 150;

    let time = 0;

    const render = () => {
      time += 0.025;

      // Mouse smoothing
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      ctx.clearRect(0, 0, width, height);

      // Deep space base
      ctx.fillStyle = '#05050A';
      ctx.fillRect(0, 0, width, height);

      const centerX = width / 2;
      const horizonY = height * 0.44;

      // 1. Draw Upper Sky Stars
      for (let s = 0; s < skyStars.length; s++) {
        const star = skyStars[s];
        star.phase += star.twinkleSpeed;
        const alpha = star.baseAlpha + Math.sin(star.phase) * 0.25;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(216, 180, 254, ${Math.max(0.1, alpha)})`;
        ctx.fill();
      }

      // 2. Horizon Laser Line
      const horizonGradient = ctx.createLinearGradient(0, horizonY, width, horizonY);
      horizonGradient.addColorStop(0, 'rgba(6, 182, 212, 0)');
      horizonGradient.addColorStop(0.2, 'rgba(6, 182, 212, 0.4)');
      horizonGradient.addColorStop(0.5, 'rgba(168, 85, 247, 0.8)');
      horizonGradient.addColorStop(0.8, 'rgba(6, 182, 212, 0.4)');
      horizonGradient.addColorStop(1, 'rgba(6, 182, 212, 0)');

      ctx.beginPath();
      ctx.moveTo(0, horizonY);
      ctx.lineTo(width, horizonY);
      ctx.strokeStyle = horizonGradient;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // 3. 3D Coordinates -> 2D Screen Projection
      const project = (gx: number, gy: number, gz: number) => {
        const pz = gz + 80;
        if (pz <= 0) return null;
        const scale = fov / pz;
        const sx = centerX + gx * scale;
        const sy = horizonY + (gy + cameraHeight) * scale;
        return { x: sx, y: sy, scale, z: gz };
      };

      // Elevation wave function
      const getElevation = (x: number, z: number) => {
        // Continuous rolling cyber waves
        const wave1 = Math.sin(x * 0.006 + time) * 18;
        const wave2 = Math.cos(z * 0.007 - time * 1.4) * 16;
        const wave3 = Math.sin((x + z) * 0.005 + time) * 12;

        let elevation = wave1 + wave2 + wave3;

        // Interactive mouse kinetic ripple
        if (mouse.x > 0 && mouse.y > 0) {
          const dx = x - (mouse.x - centerX) * 1.5;
          const dz = z - (mouse.y - horizonY) * 2.5;
          const dist = Math.sqrt(dx * dx + dz * dz);
          if (dist < 280) {
            const force = (1 - dist / 280) * 55;
            elevation += Math.sin(dist * 0.06 - time * 3.5) * force;
          }
        }

        return elevation;
      };

      const spacingX = width < 768 ? 44 : 52;
      const spacingZ = 34;
      const startX = -((cols - 1) * spacingX) / 2;
      const startZ = 30;

      // Calculate grid points
      const projectedGrid: Array<Array<{ x: number; y: number; scale: number; z: number } | null>> = [];

      for (let r = 0; r < rows; r++) {
        projectedGrid[r] = [];
        const gz = startZ + r * spacingZ;
        for (let c = 0; c < cols; c++) {
          const gx = startX + c * spacingX;
          const gy = getElevation(gx, gz);
          projectedGrid[r][c] = project(gx, gy, gz);
        }
      }

      // 4. Draw Horizontal Grid Waves (Cyan with dynamic brightness)
      for (let r = 0; r < rows; r++) {
        const depthRatio = r / rows; // 0 at horizon, 1 near bottom
        const alpha = Math.min(0.85, 0.15 + depthRatio * 0.65);

        ctx.beginPath();
        let started = false;
        for (let c = 0; c < cols; c++) {
          const pt = projectedGrid[r][c];
          if (!pt) continue;
          if (!started) {
            ctx.moveTo(pt.x, pt.y);
            started = true;
          } else {
            ctx.lineTo(pt.x, pt.y);
          }
        }

        ctx.strokeStyle = `rgba(6, 182, 212, ${alpha})`;
        ctx.lineWidth = Math.max(0.8, depthRatio * 1.8);
        ctx.stroke();
      }

      // 5. Draw Longitudinal Perspective Lines (Violet/Purple)
      for (let c = 0; c < cols; c++) {
        ctx.beginPath();
        let started = false;
        for (let r = 0; r < rows; r++) {
          const pt = projectedGrid[r][c];
          if (!pt) continue;
          if (!started) {
            ctx.moveTo(pt.x, pt.y);
            started = true;
          } else {
            ctx.lineTo(pt.x, pt.y);
          }
        }

        ctx.strokeStyle = `rgba(168, 85, 247, 0.45)`;
        ctx.lineWidth = 1.0;
        ctx.stroke();
      }

      // 6. Glowing Data Nodes at Intersection Peaks
      for (let r = 0; r < rows; r += 2) {
        for (let c = 0; c < cols; c += 2) {
          const pt = projectedGrid[r][c];
          if (!pt) continue;
          const depthRatio = r / rows;
          if (depthRatio < 0.25) continue;

          const pulse = Math.sin(time * 3 + r * 0.6 + c * 0.4);
          if (pulse > 0.6) {
            const glowAlpha = (depthRatio * 0.9).toFixed(2);
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, Math.max(1.2, depthRatio * 2.8), 0, Math.PI * 2);
            ctx.fillStyle = `rgba(6, 182, 212, ${glowAlpha})`;
            ctx.shadowColor = '#06b6d4';
            ctx.shadowBlur = 10;
            ctx.fill();
            ctx.shadowBlur = 0;
          }
        }
      }

      // 7. Subtle Vignette only around top edges to ensure text readability
      const topVignette = ctx.createLinearGradient(0, 0, 0, horizonY * 0.9);
      topVignette.addColorStop(0, 'rgba(5, 5, 10, 0.7)');
      topVignette.addColorStop(1, 'rgba(5, 5, 10, 0)');
      ctx.fillStyle = topVignette;
      ctx.fillRect(0, 0, width, horizonY);

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    const handleVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationFrameId);
      } else {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-30 pointer-events-none overflow-hidden bg-[#05050A]">
      {/* Ambient Horizon Neon Glow */}
      <motion.div
        animate={{
          opacity: [0.4, 0.7, 0.4],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-[38%] left-1/2 -translate-x-1/2 w-[85vw] h-[280px] rounded-full bg-gradient-to-r from-cyan-500/20 via-purple-600/25 to-cyan-500/20 blur-[110px] -z-20 will-change-transform"
      />

      {/* Cyber Grid Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full -z-10" />
    </div>
  );
};
