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
  // 2. PARTICLE SYSTEM — REMOVED
  // ════════════════════════════════════════
  // Particles removed per user request (distracting animations)

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
  // 13. CHROMA KEY — Hero logo animation (green-screen removal)
  //     Reads each frame of the hidden source video, removes green pixels,
  //     and draws the result to a visible canvas for a seamless blend.
  // ════════════════════════════════════════
  (function initChromaKey() {
    const video  = document.getElementById('hero-logo-src');
    const canvas = document.getElementById('hero-logo-canvas');
    if (!video || !canvas) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });

    // ── Chroma-key algorithm ───────────────────────────────────────────
    //
    // OLD approach (BROKEN for pale green):
    //   Required R < 120 AND B < 120 — fails because pale/light green
    //   has R ≈ 180–200, B ≈ 180–200, G ≈ 210–230.
    //
    // NEW approach — RELATIVE GREEN DOMINANCE:
    //   gDom  = how much greener G is compared to the max of R and B.
    //   gFrac = green's share of total brightness.
    //   Works for BOTH bright green (0,255,0) and pale mint (190,220,190).
    //
    // Tune if needed:
    //   domThreshold  — lower = more aggressive (catches paler greens)
    //   fracThreshold — lower = more aggressive (catches more grey-green)
    //   falloff       — range over which edges softly fade (larger = softer)
    const domThreshold  = 8;    // G must lead max(R,B) by at least this
    const fracThreshold = 0.34; // G must be at least this % of R+G+B
    const falloff       = 55;   // softness of key edges

    function resizeCanvas() {
      if (video.videoWidth && video.videoHeight) {
        canvas.width  = video.videoWidth;
        canvas.height = video.videoHeight;
      }
    }

    function processFrame() {
      if (video.paused || video.ended) {
        requestAnimationFrame(processFrame);
        return;
      }

      // Ensure canvas matches the video's native resolution
      if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
        resizeCanvas();
      }

      // Draw current video frame
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Read pixel data
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data; // [r,g,b,a, r,g,b,a, …]

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        // How much greener is G than the brighter of R/B?
        const gDom = g - Math.max(r, b);
        // What fraction of brightness comes from G?
        const gFrac = g / (r + g + b + 1);

        if (gDom > domThreshold && gFrac > fracThreshold) {
          // Graduated removal — stronger green dominance → more transparent
          // This naturally soft-keys edges (logo outline stays intact)
          const keyAmount = Math.min((gDom - domThreshold) / falloff, 1.0);
          data[i + 3] = Math.round(data[i + 3] * (1 - keyAmount));
        }
      }

      ctx.putImageData(imageData, 0, 0);
      requestAnimationFrame(processFrame);
    }

    // Start keying as soon as the video has loaded enough metadata
    video.addEventListener('loadedmetadata', () => {
      resizeCanvas();
      video.play().catch(() => {}); // ensure autoplay
      requestAnimationFrame(processFrame);
    });

    // Fallback: start if video is already loaded
    if (video.readyState >= 2) {
      resizeCanvas();
      requestAnimationFrame(processFrame);
    }
  })();

});
