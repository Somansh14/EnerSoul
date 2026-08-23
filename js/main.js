// ====================================================
// ENERSOUL HEALING — Main JavaScript
// ====================================================

document.addEventListener('DOMContentLoaded', () => {

  // ════════════════════════════════════════
  // 1. NAVBAR — Scroll behaviour & mobile toggle
  // ════════════════════════════════════════
  const navbar     = document.getElementById('navbar');
  const navToggle  = document.getElementById('nav-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = mobileMenu ? mobileMenu.querySelectorAll('a') : [];

  // Scroll class
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  // Mobile menu toggle
  if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      navToggle.classList.toggle('active', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        navToggle.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // ════════════════════════════════════════
  // 2. PARTICLE SYSTEM
  // ════════════════════════════════════════
  const canvas  = document.getElementById('particles-canvas');
  const ctx     = canvas ? canvas.getContext('2d') : null;

  if (canvas && ctx) {
    let particles = [];
    let animId;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    class Particle {
      constructor() { this.reset(); }

      reset() {
        this.x     = Math.random() * canvas.width;
        this.y     = canvas.height + 20;
        this.size  = Math.random() * 3 + 1;
        this.speedY = Math.random() * 0.6 + 0.2;
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.life   = 0;
        this.maxLife = Math.random() * 200 + 150;
        // Alternate between gold and sage
        this.color = Math.random() > 0.5
          ? `rgba(196,169,108,${Math.random() * 0.5 + 0.1})`
          : `rgba(143,175,139,${Math.random() * 0.4 + 0.1})`;
      }

      update() {
        this.x    += this.speedX;
        this.y    -= this.speedY;
        this.life += 1;
        if (this.y < -20 || this.life > this.maxLife) this.reset();
      }

      draw() {
        const progress = this.life / this.maxLife;
        const alpha    = progress < 0.1
          ? progress * 10
          : progress > 0.8
            ? (1 - progress) * 5
            : 1;

        ctx.save();
        ctx.globalAlpha = alpha * 0.7;
        ctx.fillStyle   = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    // Init particles
    const initParticles = () => {
      particles = [];
      const count = Math.min(Math.floor(canvas.width / 18), 50);
      for (let i = 0; i < count; i++) {
        const p = new Particle();
        p.y     = Math.random() * canvas.height; // scatter initially
        p.life  = Math.random() * p.maxLife;
        particles.push(p);
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => { p.update(); p.draw(); });
      animId = requestAnimationFrame(animate);
    };

    resize();
    initParticles();
    animate();

    window.addEventListener('resize', () => {
      cancelAnimationFrame(animId);
      resize();
      initParticles();
      animate();
    }, { passive: true });
  }

  // ════════════════════════════════════════
  // 3. SCROLL REVEAL — Intersection Observer
  // ════════════════════════════════════════
  const revealEls  = document.querySelectorAll('.reveal');
  const staggerEls = document.querySelectorAll('.stagger-children');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -60px 0px'
  });

  revealEls.forEach(el => revealObserver.observe(el));
  staggerEls.forEach(el => revealObserver.observe(el));

  // ════════════════════════════════════════
  // 4. PARALLAX — Hero background
  // ════════════════════════════════════════
  const heroBg = document.querySelector('.hero-bg');

  if (heroBg) {
    window.addEventListener('scroll', () => {
      if (window.scrollY < window.innerHeight * 1.5) {
        const offset = window.scrollY * 0.35;
        heroBg.style.transform = `translateY(${offset}px)`;
      }
    }, { passive: true });
  }

  // ════════════════════════════════════════
  // 5. SMOOTH SCROLL
  // ════════════════════════════════════════
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = navbar ? navbar.offsetHeight + 16 : 80;
      window.scrollTo({
        top: target.offsetTop - offset,
        behavior: 'smooth'
      });
    });
  });

  // ════════════════════════════════════════
  // 6. ACTIVE NAV LINK — Highlight on scroll
  // ════════════════════════════════════════
  const sections  = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navAnchors.forEach(a => {
          a.style.color = a.getAttribute('href') === `#${id}`
            ? 'var(--sage-deep)'
            : '';
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => sectionObserver.observe(s));

  // ════════════════════════════════════════
  // 7. TIMELINE — stagger timeline items
  // ════════════════════════════════════════
  const timelineItems = document.querySelectorAll('.timeline-item');

  const timelineObserver = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 120);
        timelineObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  timelineItems.forEach(item => {
    item.classList.add('reveal');
    timelineObserver.observe(item);
  });

  // ════════════════════════════════════════
  // 8. REASON CARDS — entrance stagger
  // ════════════════════════════════════════
  const reasonCards = document.querySelectorAll('.reason-card');
  const reasonObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const idx = Array.from(reasonCards).indexOf(entry.target);
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, idx * 90);
        reasonObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  reasonCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(28px)';
    card.style.transition = 'opacity 0.65s ease, transform 0.65s ease';
    reasonObserver.observe(card);
  });

  // ════════════════════════════════════════
  // 9. OUTCOME CARDS — entrance stagger
  // ════════════════════════════════════════
  const outcomeCards = document.querySelectorAll('.outcome-card');
  const outcomeObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const idx = Array.from(outcomeCards).indexOf(entry.target);
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0) scale(1)';
        }, idx * 80);
        outcomeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  outcomeCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(25px) scale(0.96)';
    card.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
    outcomeObserver.observe(card);
  });

  // ════════════════════════════════════════
  // 10. PILLAR CARDS — slide in
  // ════════════════════════════════════════
  const pillars = document.querySelectorAll('.pillar');
  const pillarObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const idx = Array.from(pillars).indexOf(entry.target);
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateX(0)';
        }, idx * 100);
        pillarObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  pillars.forEach(p => {
    p.style.opacity = '0';
    p.style.transform = 'translateX(-20px)';
    p.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    pillarObserver.observe(p);
  });

  // ════════════════════════════════════════
  // 11. CURSOR GLOW (desktop)
  // ════════════════════════════════════════
  if (window.matchMedia('(pointer: fine)').matches) {
    const glow = document.createElement('div');
    glow.id = 'cursor-glow';
    Object.assign(glow.style, {
      position: 'fixed',
      width: '300px',
      height: '300px',
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(196,169,108,0.06) 0%, transparent 70%)',
      pointerEvents: 'none',
      zIndex: '9999',
      transform: 'translate(-50%, -50%)',
      transition: 'left 0.12s ease, top 0.12s ease',
      top: '-200px',
      left: '-200px',
    });
    document.body.appendChild(glow);

    document.addEventListener('mousemove', e => {
      glow.style.left = e.clientX + 'px';
      glow.style.top  = e.clientY + 'px';
    }, { passive: true });
  }

  // ════════════════════════════════════════
  // 12. MODALITY CARDS — stagger
  // ════════════════════════════════════════
  const modalityCards = document.querySelectorAll('.modality-card');
  const modalityObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const idx = Array.from(modalityCards).indexOf(entry.target);
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, idx * 100);
        modalityObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  modalityCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease, box-shadow 0.4s ease, border-color 0.4s ease';
    modalityObserver.observe(card);
  });

});
