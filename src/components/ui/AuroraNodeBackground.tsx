import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface NodePoint {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  pulsePhase: number;
  pulseSpeed: number;
}

interface DataPacket {
  fromIndex: number;
  toIndex: number;
  progress: number;
  speed: number;
}

const NODE_COLORS = [
  'rgba(6, 182, 212, ',   // Electric Cyan
  'rgba(99, 102, 241, ',  // Indigo
  'rgba(16, 185, 129, ',  // Emerald
  'rgba(244, 244, 245, ', // Pure White
];

export const AuroraNodeBackground = () => {
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

    // Responsive node count
    const nodeCount = width < 768 ? 32 : 65;
    const maxConnectionDistance = width < 768 ? 110 : 145;

    // Initialize Architecture Nodes
    const nodes: NodePoint[] = [];
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 1.5 + 1.2,
        color: NODE_COLORS[Math.floor(Math.random() * NODE_COLORS.length)],
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.02,
      });
    }

    // Interactive Mouse Tracking
    const mouse = {
      x: -1000,
      y: -1000,
      radius: 160,
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);

    // Simulated API Data Packets
    const packets: DataPacket[] = [];
    const maxPackets = 12;

    const spawnPacket = (fromIdx: number, toIdx: number) => {
      if (packets.length >= maxPackets) return;
      packets.push({
        fromIndex: fromIdx,
        toIndex: toIdx,
        progress: 0,
        speed: 0.015 + Math.random() * 0.02,
      });
    };

    // Render Loop
    let lastTime = performance.now();

    const render = (time: number) => {
      const delta = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      // Update and Draw Nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        // Move
        node.x += node.vx;
        node.y += node.vy;

        // Bounce on boundary
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        // Mouse gentle push/attract
        const dxMouse = mouse.x - node.x;
        const dyMouse = mouse.y - node.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        if (distMouse < mouse.radius && distMouse > 0) {
          const force = (1 - distMouse / mouse.radius) * 0.5;
          node.x -= (dxMouse / distMouse) * force;
          node.y -= (dyMouse / distMouse) * force;
        }

        // Pulse calculation
        node.pulsePhase += node.pulseSpeed;
        const pulse = Math.sin(node.pulsePhase);
        const currentRadius = node.radius + pulse * 0.4;
        const alpha = 0.5 + pulse * 0.25;

        // Draw node glow halo
        ctx.beginPath();
        ctx.arc(node.x, node.y, currentRadius * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `${node.color}${alpha * 0.2})`;
        ctx.fill();

        // Draw node center core
        ctx.beginPath();
        ctx.arc(node.x, node.y, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = `${node.color}${alpha})`;
        ctx.fill();

        // Connections to other nodes
        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j];
          const dx = other.x - node.x;
          const dy = other.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxConnectionDistance) {
            const lineAlpha = (1 - dist / maxConnectionDistance) * 0.25;

            // Connection line (representing microservice bus / API route)
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(148, 163, 184, ${lineAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();

            // Randomly spawn data packet between connected nodes
            if (Math.random() < 0.0008) {
              spawnPacket(i, j);
            }
          }
        }

        // Connection to mouse cursor if nearby
        if (distMouse < mouse.radius) {
          const mouseLineAlpha = (1 - distMouse / mouse.radius) * 0.45;
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(6, 182, 212, ${mouseLineAlpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      // Draw and Update Data Packets (Simulating streaming API calls)
      for (let p = packets.length - 1; p >= 0; p--) {
        const pkt = packets[p];
        const from = nodes[pkt.fromIndex];
        const to = nodes[pkt.toIndex];

        if (!from || !to) {
          packets.splice(p, 1);
          continue;
        }

        pkt.progress += pkt.speed;

        if (pkt.progress >= 1) {
          packets.splice(p, 1);
          continue;
        }

        const px = from.x + (to.x - from.x) * pkt.progress;
        const py = from.y + (to.y - from.y) * pkt.progress;

        // Packet glow
        ctx.beginPath();
        ctx.arc(px, py, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(6, 182, 212, 0.95)';
        ctx.shadowColor = '#06b6d4';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    // Pause on hidden tab to save battery
    const handleVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationFrameId);
      } else {
        lastTime = performance.now();
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
      {/* LAYER 1: Deep Cosmic Aurora Gradient Mesh (Smooth Drifting Glows) */}
      <motion.div
        animate={{
          x: ['0%', '6%', '-4%', '0%'],
          y: ['0%', '-8%', '5%', '0%'],
          scale: [1, 1.15, 0.95, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-[-15%] left-[-10%] w-[65vw] h-[65vw] max-w-[850px] max-h-[850px] rounded-full bg-indigo-600/[0.13] blur-[130px] -z-20 will-change-transform"
      />

      <motion.div
        animate={{
          x: ['0%', '-8%', '5%', '0%'],
          y: ['0%', '10%', '-6%', '0%'],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-[25%] right-[-15%] w-[60vw] h-[60vw] max-w-[750px] max-h-[750px] rounded-full bg-cyan-500/[0.11] blur-[140px] -z-20 will-change-transform"
      />

      <motion.div
        animate={{
          x: ['0%', '8%', '-6%', '0%'],
          y: ['0%', '-6%', '8%', '0%'],
          scale: [1, 1.18, 0.92, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute bottom-[-10%] left-[20%] w-[55vw] h-[55vw] max-w-[700px] max-h-[700px] rounded-full bg-emerald-500/[0.08] blur-[140px] -z-20 will-change-transform"
      />

      {/* LAYER 2: Interactive Enterprise Architecture Node & Stream Grid */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full -z-10"
      />
    </div>
  );
};
