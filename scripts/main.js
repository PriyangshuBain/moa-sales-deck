/**
 * ═══════════════════════════════════════════
 * MALL OF AMERICA - PREMIUM APPLICATION
 * World-Class Sales Deck Controller
 * ═══════════════════════════════════════════
 */

class MallOfAmericaApp {
  constructor() {
    this.currentSection = 0;
    this.init();
  }

  init() {
    this.initLoader();
    this.initNavigation();
    this.initScrollAnimations();
    this.initKeyboardNav();
    this.initTiltEffect();
    this.initVideoPlayback();
    this.initModal();
    this.initTabs();
    this.initSmoothScroll();
    console.log('Mall of America Sales Deck initialized');
  }

  // ═══════════════════════════════════
  // LOADER
  // ═══════════════════════════════════
  initLoader() {
    const loader = document.getElementById('loader');
    if (!loader) return;

    window.addEventListener('load', () => {
      setTimeout(() => {
        loader.classList.add('hidden');
        this.triggerHeroAnimations();
      }, 2200);
    });
  }

  triggerHeroAnimations() {
    const heroElements = document.querySelectorAll('.hero .fade-up');
    heroElements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('visible');
      }, index * 150);
    });
  }

  // ═══════════════════════════════════
  // NAVIGATION
  // ═══════════════════════════════════
  initNavigation() {
    const dots = document.querySelectorAll('.nav-dot');
    const sections = document.querySelectorAll('section');

    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        const target = dot.dataset.section;
        document.getElementById(`section-${target}`)?.scrollIntoView({ 
          behavior: 'smooth' 
        });
      });
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id.split('-')[1];
          this.updateActiveDot(sectionId);
        }
      });
    }, { rootMargin: '-50% 0px', threshold: 0 });

    sections.forEach(section => observer.observe(section));
  }

  updateActiveDot(index) {
    document.querySelectorAll('.nav-dot').forEach(dot => {
      dot.classList.remove('active');
      if (dot.dataset.section === String(index)) {
        dot.classList.add('active');
      }
    });
    this.currentSection = parseInt(index);
  }

  // ═══════════════════════════════════
  // KEYBOARD NAVIGATION
  // ═══════════════════════════════════
  initKeyboardNav() {
    document.addEventListener('keydown', (e) => {
      const total = document.querySelectorAll('.nav-dot').length;
      
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        const next = Math.min(this.currentSection + 1, total - 1);
        document.getElementById(`section-${next}`)?.scrollIntoView({ behavior: 'smooth' });
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        const prev = Math.max(this.currentSection - 1, 0);
        document.getElementById(`section-${prev}`)?.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // ════��══════════════════════════════
  // SCROLL ANIMATIONS
  // ═══════════════════════════════════
  initScrollAnimations() {
    // Fade up elements
    const fadeUpObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.fade-up').forEach(el => fadeUpObserver.observe(el));

    // Stagger children
    const staggerObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.2 });

    document.querySelectorAll('.stagger-children').forEach(el => staggerObserver.observe(el));

    // Logo reveal in retail
    const logoObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          document.querySelectorAll('.logo-item').forEach((logo, index) => {
            setTimeout(() => logo.classList.add('visible'), index * 80);
          });
          logoObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    const retailSection = document.getElementById('section-2');
    if (retailSection) logoObserver.observe(retailSection);
  }

  // ═══════════════════════════════════
  // TILT EFFECT (Micro-interaction)
  // ═══════════════════════════════════
  initTiltEffect() {
    const cards = document.querySelectorAll('[data-tilt]');
    
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 25;
        const rotateY = (centerX - x) / 25;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  // ═══════════════════════════════════
  // VIDEO PLAYBACK
  // ═══════════════════════════════════
  initVideoPlayback() {
    // Lazy load videos on scroll
    const videos = document.querySelectorAll('video[preload="metadata"]');
    
    videos.forEach(video => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const playPromise = video.play();
            if (playPromise !== undefined) {
              playPromise.catch(() => {});
            }
            observer.unobserve(video);
          }
        });
      }, { threshold: 0.3 });
      
      observer.observe(video);
    });

    // Event card play buttons
    const playButtons = document.querySelectorAll('.event-card-play');
    playButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const media = btn.closest('.event-card-media');
        const video = media?.querySelector('video');
        
        if (video) {
          if (video.paused) {
            video.play();
            btn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M6 4v16M18 4v16"/></svg>';
          } else {
            video.pause();
            btn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';
          }
        }
      });
    });
  }

  // ═══════════════════════════════════
  // MODAL
  // ═══════════════════════════════════
  initModal() {
    // Open modal triggers
    const modalTriggers = document.querySelectorAll('[data-modal-trigger]');
    
    modalTriggers.forEach(trigger => {
      trigger.addEventListener('click', () => {
        const modalId = trigger.dataset.modalTrigger;
        document.getElementById(modalId)?.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    // Close buttons
    const modalClose = document.querySelector('.modal-close');
    const modalOverlay = document.getElementById('events-modal');
    
    modalClose?.addEventListener('click', () => {
      modalOverlay?.classList.remove('active');
      document.body.style.overflow = '';
    });

    // Click outside to close
    modalOverlay?.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    });

    // Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalOverlay?.classList.contains('active')) {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // ═══════════════════════════════════
  // TABS
  // ═══════════════════════════════════
  initTabs() {
    const tabContainers = document.querySelectorAll('.dining-tabs, .events-tabs');
    
    tabContainers.forEach(container => {
      const tabs = container.querySelectorAll('.tab');
      
      tabs.forEach(tab => {
        tab.addEventListener('click', () => {
          const target = tab.dataset.tab;
          
          // Update active tab
          tabs.forEach(t => {
            t.classList.toggle('active', t === tab);
          });

          // Handle filtering if needed
          const parentSection = container.closest('section');
          const cards = parentSection?.querySelectorAll('[data-category]');
          
          if (cards && target !== 'all') {
            cards.forEach(card => {
              const category = card.dataset.category;
              if (category === target || target === 'all') {
                card.style.display = '';
              } else {
                card.style.display = 'none';
              }
            });
          }
        });
      });
    });
  }

  // ═══════════════════════════════════
  // SMOOTH SCROLL FOR ANCHORS
  // ═══════════════════════════════════
  initSmoothScroll() {
    document.querySelectorAll('a[href^="#section-"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = anchor.getAttribute('href').replace('#', '');
        document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
      });
    });
  }
}

// ═══════════════════════════════════
// INITIALIZE ON DOM READY
// ═══════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
  window.app = new MallOfAmericaApp();
  document.body.style.opacity = '1';
});

// ═══════════════════════════════════
// UTILITIES
// ═══════════════════════════════════
function debounce(func, wait = 300) {
  let timeout;
  return function executedFunction(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

function throttle(func, limit = 100) {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}