import React, { useRef, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

const VenomBackground = () => {
  const canvasRef = useRef(null);
  const { darkMode } = useTheme();
  const mouseRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);
  
  // Initialize the canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    
    // canvas dimensions
    const setCanvasSize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);
    
    // Track mouse position
    const handleMouseMove = (e) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY
      };
    };
    
    // Set default mouse position to center if not moved yet
    if (mouseRef.current.x === 0 && mouseRef.current.y === 0) {
      mouseRef.current = {
        x: width / 2,
        y: height / 2
      };
    }
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Create particles for Effect
    const particles = [];
    const particleCount = 250; // Increased particle count
    
    const distributeParticles = () => {
      // Clear existing particles
      particles.length = 0;
      
      // Create a grid of particles across the entire canvas
      const cols = Math.floor(width / 100);
      const rows = Math.floor(height / 100);
      
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          // Add some randomness to the grid positions
          const baseX = (i * width / cols) + (Math.random() * 50 - 25);
          const baseY = (j * height / rows) + (Math.random() * 50 - 25);
          
          particles.push({
            x: baseX,
            y: baseY,
            originalX: baseX, // Save original position for coming back
            originalY: baseY,
            size: Math.random() * 4 + 3, // Slightly larger particles
            speedX: Math.random() * 2 - 1,
            speedY: Math.random() * 2 - 1,
            color: darkMode ? 
              `rgba(${30 + Math.random() * 50}, ${60 + Math.random() * 80}, ${130 + Math.random() * 85}, ${0.6 + Math.random() * 0.4})` :
              `rgba(${100 + Math.random() * 55}, ${150 + Math.random() * 55}, ${220 + Math.random() * 35}, ${0.5 + Math.random() * 0.5})`
          });
        }
      }
      
      // extra random particles
      for (let i = 0; i < particleCount - (cols * rows); i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          originalX: Math.random() * width,
          originalY: Math.random() * height,
          size: Math.random() * 5 + 2,
          speedX: Math.random() * 2 - 1,
          speedY: Math.random() * 2 - 1,
          color: darkMode ? 
            `rgba(${30 + Math.random() * 50}, ${60 + Math.random() * 80}, ${130 + Math.random() * 85}, ${0.6 + Math.random() * 0.4})` :
            `rgba(${100 + Math.random() * 55}, ${150 + Math.random() * 55}, ${220 + Math.random() * 35}, ${0.5 + Math.random() * 0.5})`
        });
      }
    };
    
    // Initialize particles
    distributeParticles();
    
    // window resize
    window.addEventListener('resize', distributeParticles);
    
    // Animation loop
    const animate = () => {

      ctx.fillStyle = darkMode ? 'rgba(15, 23, 42, 0.12)' : 'rgba(219, 234, 254, 0.12)';
      ctx.fillRect(0, 0, width, height);
      
      // Draw and update particles
      particles.forEach(p => {
        // Calculate distance to mouse
        const dx = mouseRef.current.x - p.x;
        const dy = mouseRef.current.y - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Move particles toward mouse if close enough
        if (distance < 300) { // Increased reaction distance
          const angle = Math.atan2(dy, dx);
          const force = Math.pow(1 - Math.min(1, distance / 300), 2) * 0.7; // Non-linear force
          p.speedX += Math.cos(angle) * force;
          p.speedY += Math.sin(angle) * force;
        } else {
          // Returning to original position when far from mouse
          const dx = p.originalX - p.x;
          const dy = p.originalY - p.y;
          p.speedX += dx * 0.003;
          p.speedY += dy * 0.003;
        }
        
        // speed limits
        const maxSpeed = 3; // Increased max speed
        p.speedX = Math.max(-maxSpeed, Math.min(maxSpeed, p.speedX));
        p.speedY = Math.max(-maxSpeed, Math.min(maxSpeed, p.speedY));
        
        // Update position
        p.x += p.speedX;
        p.y += p.speedY;
        
        // Add friction
        p.speedX *= 0.95;
        p.speedY *= 0.95;
        
        // Keep particles within canvas
        p.x = Math.max(0, Math.min(width, p.x));
        p.y = Math.max(0, Math.min(height, p.y));
        
        // Draw particle with glowing effect
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2);
        const color = p.color.replace(/[\d.]+\)$/, '1)'); // Full opacity for center
        const transparentColor = p.color.replace(/[\d.]+\)$/, '0)'); // Transparent for edge
        
        gradient.addColorStop(0, color);
        gradient.addColorStop(1, transparentColor);
        
        ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Draw connections between close particles (web effect)
        particles.forEach(p2 => {
          if (p === p2) return;
          
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 120) { // Increased connection distance
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            
            // Thicker lines for closer particles
            ctx.lineWidth = Math.max(0.5, 1.5 * (1 - dist / 120));
            
            ctx.strokeStyle = darkMode ? 
              `rgba(20, 58, 138, ${(1 - dist / 120) * 0.6})` :
              `rgba(147, 197, 253, ${(1 - dist / 120) * 0.6})`;
            ctx.stroke();
          }
        });
      });
      
      rafRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    // Force initial mouse interaction
    setTimeout(() => {
      const simulateInteraction = () => {
        // wave effect by moving the virtual mouse
        const centerX = width / 2;
        const centerY = height / 2;
        let angle = 0;
        
        const moveVirtualMouse = () => {
          angle += 0.02;
          if (angle > Math.PI * 2) {
            return; // Stopping after one complete circle
          }
          
          const radius = Math.min(width, height) * 0.4;
          mouseRef.current = {
            x: centerX + Math.cos(angle) * radius,
            y: centerY + Math.sin(angle) * radius
          };
          
          setTimeout(moveVirtualMouse, 20);
        };
        
        moveVirtualMouse();
      };
      
      simulateInteraction();
    }, 500);
    
    // Cleanup
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', setCanvasSize);
      window.removeEventListener('resize', distributeParticles);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [darkMode]);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 z-0 w-full h-full" 
      style={{ pointerEvents: 'none' }}
    />
  );
};

export default VenomBackground;
