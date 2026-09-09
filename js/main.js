// ====================================================
// ENERSOUL HEALING — Main JavaScript
// ====================================================

document.addEventListener('DOMContentLoaded', () => {

  // ════════════════════════════════════════
  // 1. NAVBAR — Scroll behaviour & mobile toggle
  // ════════════════════════════════════════
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('nav-toggle');
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
  // 2. PARTICLE SYSTEM — REMOVED
  // ════════════════════════════════════════
  // Particles removed per user request (distracting animations)

  // ════════════════════════════════════════
  // 3. SCROLL REVEAL — Intersection Observer
  // ════════════════════════════════════════
  const revealEls = document.querySelectorAll('.reveal');
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
  // 4. PARALLAX — REMOVED (distracting)
  // ════════════════════════════════════════

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
  const sections = document.querySelectorAll('section[id]');
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
  // 11. CURSOR GLOW — REMOVED
  // ════════════════════════════════════════
  // Cursor glow effect removed per user request

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

  // ════════════════════════════════════════
  // 13. HERO EMBLEM — Transparent Background Keying
  // ════════════════════════════════════════
  (function initHeroEmblem() {
    const img = document.getElementById('hero-emblem-img');
    if (!img) return;

    function makeTransparent() {
      if (img.dataset.processed === 'true' || (img.src && img.src.startsWith('data:image/png'))) return;

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const w = img.naturalWidth || img.width;
      const h = img.naturalHeight || img.height;
      if (!w || !h) return;

      canvas.width = w;
      canvas.height = h;
      ctx.drawImage(img, 0, 0);

      try {
        const imgData = ctx.getImageData(0, 0, w, h);
        const d = imgData.data;

        // Sample corner pixels to determine background tone
        const cornerR = (d[0] + d[(w - 1) * 4] + d[(h - 1) * w * 4]) / 3;
        const cornerG = (d[1] + d[(w - 1) * 4 + 1] + d[(h - 1) * w * 4 + 1]) / 3;
        const cornerB = (d[2] + d[(w - 1) * 4 + 2] + d[(h - 1) * w * 4 + 2]) / 3;

        for (let i = 0; i < d.length; i += 4) {
          const r = d[i];
          const g = d[i + 1];
          const b = d[i + 2];

          // Distance from the background cream/white tone
          const dist = Math.hypot(r - cornerR, g - cornerG, b - cornerB);

          // Also check overall brightness (cream/white background is high luminance)
          const lum = 0.299 * r + 0.587 * g + 0.114 * b;

          if (dist < 26 || lum > 248) {
            d[i + 3] = 0;
          } else if (dist < 52) {
            const alphaFactor = (dist - 26) / 26;
            d[i + 3] = Math.round(d[i + 3] * alphaFactor);
          }
        }

        ctx.putImageData(imgData, 0, 0);
        img.dataset.processed = 'true';
        img.src = canvas.toDataURL('image/png');
        img.style.mixBlendMode = 'normal';
      } catch (err) {
        // Fallback: mix-blend-mode: multiply handles transparency reliably
        img.style.mixBlendMode = 'multiply';
      }
    }

    if (img.complete && img.naturalWidth > 0) {
      makeTransparent();
    } else {
      img.addEventListener('load', makeTransparent, { once: true });
    }
  })();

});
