import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  z: number;
  size: number;
  opacity: number;
  twinkleSpeed: number;
  color: string;
}

interface Meteor {
  x: number;
  y: number;
  length: number;
  speed: number;
  opacity: number;
  angle: number;
}

interface Planet {
  x: number;
  y: number;
  size: number;
  color: string;
  hasRings: boolean;
  speed: number;
  angle: number;
  type: 'rocky' | 'gas';
}

interface SolarBody {
    distance: number;
    size: number;
    color: string;
    speed: number;
    angle: number;
}

interface UFO {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  wobble: number;
  lights: number;
}

const STAR_COLORS = [
  '#ffffff', // White
  '#ffe9c4', // Light Yellow (G-type)
  '#d4f1f9', // Blue-White (A/B-type)
  '#ffc4c4', // Reddish (M-type)
];

export const StarField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    
    const setCanvasSize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      canvas.style.width =`${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Initialize stars
    const stars: Star[] = [];
    const starCount = 600; 
    
    for (let i = 0; i < starCount; i++) {
        stars.push({
            x: Math.random() * width,
            y: Math.random() * height,
            z: Math.random() * 3 + 0.1, 
            size: Math.random() * 1.2,
            opacity: Math.random(),
            twinkleSpeed: Math.random() * 0.03 + 0.002,
            color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)]
        });
    }

    // Initialize Planets
    const planets: Planet[] = [];
    // Spawn random planets
    for (let i = 0; i < 3; i++) {
        const isGasGiant = Math.random() > 0.6;
        planets.push({
            x: Math.random() * width,
            y: Math.random() * height,
            size: isGasGiant ? Math.random() * 60 + 30 : Math.random() * 15 + 5,
            color: isGasGiant ? (Math.random() > 0.5 ? '#d946ef' : '#4f46e5') : '#a1a1aa',
            hasRings: isGasGiant && Math.random() > 0.3,
            speed: Math.random() * 0.03 + 0.005,
            angle: Math.random() * Math.PI * 2,
            type: isGasGiant ? 'gas' : 'rocky'
        });
    }

    // Solar System Init
    const solarSystem = {
        x: width * 0.15,
        y: height * 0.9,
        planets: [
            { distance: 40, size: 3, color: '#a3a3a3', speed: 0.02, angle: Math.random() * Math.PI * 2 }, // Mercury
            { distance: 60, size: 5, color: '#eab308', speed: 0.015, angle: Math.random() * Math.PI * 2 }, // Venus
            { distance: 90, size: 6, color: '#3b82f6', speed: 0.01, angle: Math.random() * Math.PI * 2 }, // Earth
            { distance: 120, size: 4, color: '#ef4444', speed: 0.008, angle: Math.random() * Math.PI * 2 }, // Mars
        ] as SolarBody[]
    };

    // Meteors & UFOs
    let meteors: Meteor[] = [];
    let ufos: UFO[] = [];

    const spawnEntities = () => {
      // Meteors
      if (Math.random() < 0.02 && meteors.length < 2) {
        meteors.push({
          x: Math.random() * width,
          y: Math.random() * height * 0.5,
          length: Math.random() * 80 + 20,
          speed: Math.random() * 15 + 10,
          opacity: 1,
          angle: Math.PI / 4 + (Math.random() - 0.5) * 0.2
        });
      }

      // UFOs
      if (Math.random() < 0.003 && ufos.length < 1) {
        const startLeft = Math.random() > 0.5;
        ufos.push({
            x: startLeft ? -50 : width + 50,
            y: Math.random() * height * 0.6 + height * 0.2,
            size: 20,
            speedX: startLeft ? (Math.random() * 3 + 2) : -(Math.random() * 3 + 2),
            speedY: (Math.random() - 0.5) * 2,
            wobble: 0,
            lights: 0
        });
      }
    };

    // Animation Loop
    let animationFrameId: number;
    let time = 0;
    
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
        targetMouseX = (e.clientX - width / 2) * 0.02;
        targetMouseY = (e.clientY - height / 2) * 0.02;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const drawBlackHole = (bx: number, by: number) => {
        const bhX = bx + mouseX * 0.4;
        const bhY = by + mouseY * 0.4;
        
        // Accretion Disk Swirl
        const gradient = ctx.createRadialGradient(bhX, bhY, 10, bhX, bhY, 100);
        gradient.addColorStop(0, 'black');
        gradient.addColorStop(0.1, '#000'); // Event Horizon
        gradient.addColorStop(0.15, '#fff'); // Photon Ring
        gradient.addColorStop(0.3, '#fb923c'); // Inner Disk
        gradient.addColorStop(0.6, 'rgba(234, 88, 12, 0.4)'); // Outer Disk
        gradient.addColorStop(1, 'transparent');

        ctx.save();
        ctx.translate(bhX, bhY);
        ctx.scale(1, 0.4); // Tilt
        ctx.rotate(time * 0.2);
        ctx.beginPath();
        ctx.arc(0, 0, 100, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.restore();

        // Singularity (Vantablack center)
        ctx.beginPath();
        ctx.arc(bhX, bhY, 12, 0, Math.PI * 2);
        ctx.fillStyle = '#000000';
        ctx.fill();
        ctx.strokeStyle = 'rgba(255,255,255,0.3)'; // Lensing
        ctx.lineWidth = 1;
        ctx.stroke();
    };

    const drawSolarSystem = () => {
        const sunX = solarSystem.x + mouseX * 0.1;
        const sunY = solarSystem.y + mouseY * 0.1;

        // Sun
        const sunGrad = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, 20);
        sunGrad.addColorStop(0, '#fef3c7');
        sunGrad.addColorStop(0.5, '#f59e0b');
        sunGrad.addColorStop(1, 'rgba(245, 158, 11, 0)');
        
        ctx.beginPath();
        ctx.arc(sunX, sunY, 15, 0, Math.PI * 2);
        ctx.fillStyle = sunGrad;
        ctx.shadowBlur = 20;
        ctx.shadowColor = '#f59e0b';
        ctx.fill();
        ctx.shadowBlur = 0;

        // Planets
        solarSystem.planets.forEach(body => {
            body.angle += body.speed;
            const px = sunX + Math.cos(body.angle) * body.distance;
            const py = sunY + Math.sin(body.angle) * body.distance * 0.6; // Ellipse orbit

            // Orbit Path (Optional, subtle)
            ctx.beginPath();
            ctx.ellipse(sunX, sunY, body.distance, body.distance * 0.6, 0, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(255,255,255,0.05)';
            ctx.lineWidth = 1;
            ctx.stroke();

            // Planet Body
            ctx.beginPath();
            ctx.arc(px, py, body.size, 0, Math.PI * 2);
            ctx.fillStyle = body.color;
            ctx.fill();
        });
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Nebulas
      const gradient = ctx.createRadialGradient(
        width / 2 + (mouseX * 5), height / 2 + (mouseY * 5), 0,
        width / 2, height / 2, width
      );
      gradient.addColorStop(0, 'rgba(20, 10, 40, 0.3)'); 
      gradient.addColorStop(0.5, 'rgba(10, 20, 40, 0.1)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;
      time += 0.01;

      // Draw Background Elements First
      drawBlackHole(width * 0.2, height * 0.8);
      drawSolarSystem();

      // Draw Stars
      stars.forEach(star => {
        const twinkle = Math.sin(time / star.twinkleSpeed) * 0.3 + 0.7;
        ctx.beginPath();
        const x = (star.x + mouseX * star.z) % width;
        const y = (star.y + mouseY * star.z) % height;
        const drawX = x < 0 ? x + width : x;
        const drawY = y < 0 ? y + height : y;

        ctx.arc(drawX, drawY, star.size, 0, Math.PI * 2);
        const alpha = star.opacity * twinkle;
        ctx.fillStyle = star.color;
        ctx.globalAlpha = alpha;
        ctx.fill();
        
        if (alpha > 0.8 && star.size > 0.8) {
            ctx.shadowBlur = 10;
            ctx.shadowColor = star.color;
            ctx.fill();
            ctx.shadowBlur = 0;
        }
        ctx.globalAlpha = 1;
      });

      // Draw Drifting Planets
      planets.forEach(planet => {
        planet.x += planet.speed * Math.cos(planet.angle);
        planet.y += planet.speed * Math.sin(planet.angle);

        if (planet.x < -100) planet.x = width + 100;
        if (planet.x > width + 100) planet.x = -100;
        if (planet.y < -100) planet.y = height + 100;
        if (planet.y > height + 100) planet.y = -100;

        const planetX = planet.x + mouseX * 0.5;
        const planetY = planet.y + mouseY * 0.5;

        const pGrad = ctx.createRadialGradient(
            planetX - planet.size/3, planetY - planet.size/3, 0,
            planetX, planetY, planet.size
        );
        pGrad.addColorStop(0, planet.color);
        pGrad.addColorStop(1, 'rgba(0,0,0,0.8)');

        ctx.beginPath();
        ctx.arc(planetX, planetY, planet.size, 0, Math.PI * 2);
        ctx.fillStyle = pGrad;
        ctx.fill();

        if (planet.hasRings) {
            ctx.beginPath();
            ctx.ellipse(planetX, planetY, planet.size * 2, planet.size * 0.4, Math.PI / 6, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
            ctx.lineWidth = planet.size / 10;
            ctx.stroke();
        }
      });

      spawnEntities();

      // Meteors
      meteors = meteors.filter(meteor => {
        meteor.x += meteor.speed * Math.cos(meteor.angle);
        meteor.y += meteor.speed * Math.sin(meteor.angle);
        meteor.opacity -= 0.02;

        if (meteor.opacity <= 0) return false;

        ctx.beginPath();
        const tailX = meteor.x - meteor.length * Math.cos(meteor.angle);
        const tailY = meteor.y - meteor.length * Math.sin(meteor.angle);
        const mGrad = ctx.createLinearGradient(meteor.x, meteor.y, tailX, tailY);
        mGrad.addColorStop(0, 'rgba(255, 255, 255, 1)');
        mGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.strokeStyle = mGrad;
        ctx.lineWidth = 2;
        ctx.moveTo(meteor.x, meteor.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();
        return true;
      });

      // UFOs
      ufos = ufos.filter(ufo => {
          ufo.x += ufo.speedX;
          ufo.y += ufo.speedY + Math.sin(time * 5) * 1;
          
          if (ufo.x < -100 || ufo.x > width + 100) return false;

          const ufoX = ufo.x + mouseX * 0.8;
          const ufoY = ufo.y + mouseY * 0.8;

          ctx.beginPath();
          ctx.ellipse(ufoX, ufoY - 5, 10, 8, 0, Math.PI, 0);
          ctx.fillStyle = 'rgba(100, 200, 255, 0.8)';
          ctx.fill();

          ctx.beginPath();
          ctx.ellipse(ufoX, ufoY, 25, 6, 0, 0, Math.PI * 2);
          ctx.fillStyle = '#888';
          ctx.fill();
          ctx.strokeStyle = '#fff';
          ctx.lineWidth = 1;
          ctx.stroke();

          for(let i=0; i<3; i++){
              const lx = ufoX + (i-1)*15;
              ctx.beginPath();
              ctx.arc(lx, ufoY, 2, 0, Math.PI*2);
              ctx.fillStyle = Math.sin(time * 10 + i) > 0 ? '#f00' : '#444';
              ctx.fill();
          }
          return true;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 -z-20 pointer-events-none bg-transparent"
    />
  );
};
