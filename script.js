// ========================================
// VIPE CODING - MINIMAL INTERACTIONS
// ========================================

document.addEventListener('DOMContentLoaded', () => {
  // Update Year in Footer
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Parallax Effect on Mouse Move
  document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    // Move floating symbols
    const floatItems = document.querySelectorAll('.float-item');
    floatItems.forEach((item, index) => {
      const speed = (index + 1) * 10;
      const x = (mouseX - 0.5) * speed;
      const y = (mouseY - 0.5) * speed;
      item.style.transform = `translate(${x}px, ${y}px)`;
    });

    // Profile image tilt effect
    const profile = document.querySelector('.profile-image');
    if (profile) {
      const tiltX = (mouseY - 0.5) * 10;
      const tiltY = (mouseX - 0.5) * -10;
      profile.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    }
  });

  // Add ripple effect on social button click
  const socialBtns = document.querySelectorAll('.social-btn');
  socialBtns.forEach(btn => {
    btn.addEventListener('click', function (e) {
      const ripple = document.createElement('div');
      ripple.classList.add('ripple-effect');
      this.appendChild(ripple);

      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';

      ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(0, 0, 0, 0.5);
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
      `;

      setTimeout(() => ripple.remove(), 600);
    });
  });

  // Smooth scroll reveal
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Add CSS for ripple animation
  if (!document.getElementById('ripple-styles')) {
    const style = document.createElement('style');
    style.id = 'ripple-styles';
    style.textContent = `
      @keyframes ripple-animation {
        from {
          transform: scale(0);
          opacity: 1;
        }
        to {
          transform: scale(2);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // Cursor trail effect
  const cursorTrail = [];
  const trailLength = 10;

  document.addEventListener('mousemove', (e) => {
    cursorTrail.push({ x: e.clientX, y: e.clientY, time: Date.now() });

    if (cursorTrail.length > trailLength) {
      cursorTrail.shift();
    }
  });

  // Console message for fun
  console.log('%cVIPE CODING FOR FUN', 'font-size: 24px; color: #00ffff; font-weight: bold; text-shadow: 0 0 10px #00ffff;');
  console.log('%cCoding without typing - powered by AI', 'font-size: 14px; color: #00aaff;');
  console.log('%cCurious developer exploring the AI-powered world of coding', 'font-size: 12px; color: #888;');

  // ========================================
  // LANGUAGE SWITCHER LOGIC
  // ========================================
  const translations = {
    en: {
      vipe_coding: "VIPE CODING",
      for_fun: "FOR FUN",
      tagline: "Coding Without Typing - AI Powered",
      philosophy: "Learning · Exploring · Creating",
      philosophy_subtitle: "Where AI meets curiosity",
      footer: "Made with AI & curiosity",
      lang_text: "AR",
      no_limits: "NO LIMITS"
    },
    ar: {
      vipe_coding: "برمجة ممتعة",
      for_fun: "للمتعة",
      tagline: "البرمجة بدون كتابة - مدعومة بالذكاء الاصطناعي",
      philosophy: "تعلم · استكشاف · إبداع",
      philosophy_subtitle: "حيث يلتقي الذكاء الاصطناعي بالفضول",
      footer: "صنع بالذكاء الاصطناعي والفضول",
      lang_text: "EN",
      no_limits: "بلا حدود"
    }
  };

  const langSwitcher = document.getElementById('lang-switcher');
  const langText = document.querySelector('.lang-text');
  let currentLang = localStorage.getItem('lang') || 'en';

  function updateLanguage(lang) {
    // Update text content
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      if (translations[lang][key]) {
        element.textContent = translations[lang][key];
      }
    });

    // Update button text
    if (langText) {
      langText.textContent = translations[lang].lang_text;
    }

    // Update direction and font
    if (lang === 'ar') {
      document.body.classList.add('rtl');
      document.documentElement.setAttribute('lang', 'ar');
      document.documentElement.setAttribute('dir', 'rtl');
    } else {
      document.body.classList.remove('rtl');
      document.documentElement.setAttribute('lang', 'en');
      document.documentElement.setAttribute('dir', 'ltr');
    }

    // Save preference
    localStorage.setItem('lang', lang);
    currentLang = lang;
  }

  // Initialize language
  updateLanguage(currentLang);

  // Toggle language on click
  if (langSwitcher) {
    langSwitcher.addEventListener('click', () => {
      const newLang = currentLang === 'en' ? 'ar' : 'en';
      updateLanguage(newLang);
    });
  }
});
