// ========================================
// VIPE CODING - ADVANCED PARTICLES
// ========================================

document.addEventListener('DOMContentLoaded', () => {
  const particlesContainer = document.createElement('div');
  particlesContainer.id = 'particles-canvas';
  particlesContainer.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    pointer-events: none;
    overflow: hidden;
  `;
  document.body.prepend(particlesContainer);

  // Neon particle colors
  const colors = [
    'rgba(0, 0, 0, 0.8)',
    'rgba(50, 50, 50, 0.7)',
    'rgba(20, 20, 20, 0.9)',
    'rgba(100, 100, 100, 0.6)',
  ];

  // Create glowing particles
  const particleCount = 30;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    const size = Math.random() * 4 + 2;
    const posX = Math.random() * 100;
    const posY = Math.random() * 120 + 100;
    const duration = Math.random() * 20 + 15;
    const delay = Math.random() * -30;
    const color = colors[Math.floor(Math.random() * colors.length)];

    particle.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${posX}%;
      top: ${posY}%;
      background: ${color};
      border-radius: 50%;
      box-shadow: 0 0 ${size * 3}px ${color}, 0 0 ${size * 6}px ${color};
      animation: float-up ${duration}s linear ${delay}s infinite;
      opacity: ${Math.random() * 0.5 + 0.3};
    `;

    particlesContainer.appendChild(particle);
  }

  // Add particle animation styles
  const style = document.createElement('style');
  style.textContent = `
    @keyframes float-up {
      0% {
        transform: translateY(0) translateX(0) scale(0.5);
        opacity: 0;
      }
      10% {
        opacity: 1;
      }
      90% {
        opacity: 1;
      }
      100% {
        transform: translateY(-100vh) translateX(${Math.random() * 200 - 100}px) scale(1.2);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);

  // Create interactive glow effect following cursor
  const glowCursor = document.createElement('div');
  glowCursor.style.cssText = `
    position: fixed;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(0, 0, 0, 0.15) 0%, transparent 70%);
    pointer-events: none;
    z-index: 2;
    transform: translate(-50%, -50%);
    transition: opacity 0.3s ease;
    opacity: 0;
  `;
  document.body.appendChild(glowCursor);

  document.addEventListener('mousemove', (e) => {
    glowCursor.style.left = e.clientX + 'px';
    glowCursor.style.top = e.clientY + 'px';
    glowCursor.style.opacity = '1';
  });

  document.addEventListener('mouseleave', () => {
    glowCursor.style.opacity = '0';
  });

  // Create random sparkles on click
  document.addEventListener('click', (e) => {
    for (let i = 0; i < 8; i++) {
      const sparkle = document.createElement('div');
      const angle = (Math.PI * 2 * i) / 8;
      const distance = Math.random() * 50 + 30;
      const size = Math.random() * 4 + 2;

      sparkle.style.cssText = `
        position: fixed;
        left: ${e.clientX}px;
        top: ${e.clientY}px;
        width: ${size}px;
        height: ${size}px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        border-radius: 50%;
        box-shadow: 0 0 10px currentColor;
        pointer-events: none;
        z-index: 9999;
        animation: sparkle-burst 0.8s ease-out forwards;
        --x: ${Math.cos(angle) * distance}px;
        --y: ${Math.sin(angle) * distance}px;
      `;

      document.body.appendChild(sparkle);
      setTimeout(() => sparkle.remove(), 800);
    }
  });

  // Sparkle animation
  const sparkleStyle = document.createElement('style');
  sparkleStyle.textContent = `
    @keyframes sparkle-burst {
      0% {
        transform: translate(0, 0) scale(1);
        opacity: 1;
      }
      100% {
        transform: translate(var(--x), var(--y)) scale(0);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(sparkleStyle);
});
