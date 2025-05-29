import { useEffect } from 'react';

const heartMessages = [
  "You matter to someone ❤️",
  "You are loved beyond measure 💫",
  "Someone thinks about you every day ✨",
  "You bring joy to someone's life 🌟",
  "You are someone's reason to smile 😊",
  "Your presence makes the world brighter ☀️",
  "You are appreciated more than you know 💝",
  "Someone is grateful for you every day 🙏",
  "You make someone's life beautiful 🌸",
  "Your existence is a blessing to someone 🌈"
];

export default function GalaxyBackground() {
  useEffect(() => {
    const galaxyBg = document.getElementById('galaxyBg');
    if (!galaxyBg) return;

    // Create static stars
    const createStars = () => {
      const starCount = 150;
      for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.width = Math.random() * 3 + 1 + 'px';
        star.style.height = star.style.width;
        star.style.animationDelay = Math.random() * 2 + 's';
        star.style.animationDuration = (Math.random() * 4 + 2) + 's';
        star.style.filter = 'blur(0.5px)';
        galaxyBg.appendChild(star);
      }
    };

    // Create falling stars
    const createFallingStars = () => {
      const addFallingStar = () => {
        const fallingStar = document.createElement('div');
        fallingStar.className = 'falling-star';
        fallingStar.style.left = Math.random() * 100 + '%';
        fallingStar.style.animationDuration = (Math.random() * 2 + 2) + 's';
        fallingStar.style.animationDelay = Math.random() * 1 + 's';
        galaxyBg.appendChild(fallingStar);

        setTimeout(() => {
          if (fallingStar.parentNode) {
            fallingStar.remove();
          }
        }, 6000);
      };

      // Create initial falling stars
      for (let i = 0; i < 4; i++) {
        setTimeout(addFallingStar, i * 300);
      }

      const interval = setInterval(addFallingStar, 1000);
      return () => clearInterval(interval);
    };

    // Create shooting stars
    const createShootingStars = () => {
      const addShootingStar = () => {
        const shootingStar = document.createElement('div');
        shootingStar.className = 'shooting-star';
        shootingStar.style.left = Math.random() * 30 + '%';
        shootingStar.style.top = Math.random() * 30 + '%';
        shootingStar.style.animation = `shootingStar ${Math.random() * 2 + 1.5}s linear`;
        galaxyBg.appendChild(shootingStar);

        setTimeout(() => {
          if (shootingStar.parentNode) {
            shootingStar.remove();
          }
        }, 4000);
      };

      const interval = setInterval(addShootingStar, 3000);
      return () => clearInterval(interval);
    };

    // Create floating hearts
    const createFloatingHearts = () => {
      const addFloatingHeart = () => {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.style.left = Math.random() * 90 + 5 + '%';
        heart.style.animationDuration = (Math.random() * 3 + 6) + 's';
        heart.style.animationDelay = Math.random() * 2 + 's';
        
        heart.addEventListener('click', () => {
          heart.classList.add('heart-pop');
          
          // Show message popup
          const message = document.createElement('div');
          message.className = 'message-popup';
          message.textContent = heartMessages[Math.floor(Math.random() * heartMessages.length)];
          document.body.appendChild(message);

          setTimeout(() => {
            if (message.parentNode) {
              message.remove();
            }
          }, 3000);

          setTimeout(() => {
            if (heart.parentNode) {
              heart.remove();
            }
          }, 600);
        });

        galaxyBg.appendChild(heart);

        setTimeout(() => {
          if (heart.parentNode) {
            heart.remove();
          }
        }, 10000);
      };

      const interval = setInterval(addFloatingHeart, 4000);
      return () => clearInterval(interval);
    };

    createStars();
    const cleanupFallingStars = createFallingStars();
    const cleanupShootingStars = createShootingStars();
    const cleanupHearts = createFloatingHearts();

    return () => {
      cleanupFallingStars();
      cleanupShootingStars();
      cleanupHearts();
      // Clean up existing elements
      const elements = galaxyBg.querySelectorAll('.star, .falling-star, .shooting-star, .floating-heart');
      elements.forEach(element => element.remove());
    };
  }, []);

  return <div className="galaxy-bg" id="galaxyBg" />;
}
