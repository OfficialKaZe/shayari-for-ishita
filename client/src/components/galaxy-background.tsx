import { useEffect } from 'react';

export default function GalaxyBackground() {
  useEffect(() => {
    const galaxyBg = document.getElementById('galaxyBg');
    if (!galaxyBg) return;

    // Create static stars
    const createStars = () => {
      const starCount = 100;
      for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.width = Math.random() * 3 + 1 + 'px';
        star.style.height = star.style.width;
        star.style.animationDelay = Math.random() * 2 + 's';
        star.style.animationDuration = (Math.random() * 3 + 2) + 's';
        galaxyBg.appendChild(star);
      }
    };

    // Create falling stars
    const createFallingStars = () => {
      const addFallingStar = () => {
        const fallingStar = document.createElement('div');
        fallingStar.className = 'falling-star';
        fallingStar.style.left = Math.random() * 100 + '%';
        fallingStar.style.animationDuration = (Math.random() * 3 + 2) + 's';
        galaxyBg.appendChild(fallingStar);

        setTimeout(() => {
          if (fallingStar.parentNode) {
            fallingStar.remove();
          }
        }, 5000);
      };

      const interval = setInterval(addFallingStar, 2000);
      return () => clearInterval(interval);
    };

    createStars();
    const cleanupFallingStars = createFallingStars();

    return () => {
      cleanupFallingStars();
      // Clean up existing stars
      const stars = galaxyBg.querySelectorAll('.star, .falling-star');
      stars.forEach(star => star.remove());
    };
  }, []);

  return <div className="galaxy-bg" id="galaxyBg" />;
}
