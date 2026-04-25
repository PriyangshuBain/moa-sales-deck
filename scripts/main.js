/**
 * Mall of America Sales Deck
 * Application Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  
  // Trigger hero animations immediately
  triggerHeroAnimations();

  // NAVIGATION
  document.querySelectorAll('.nav-dot').forEach(dot => {
    dot.addEventListener('click', () => {
      const target = dot.dataset.section;
      document.getElementById('section-' + target)?.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // SECTION OBSERVER
  const sections = document.querySelectorAll('section');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id.split('-')[1];
        document.querySelectorAll('.nav-dot').forEach(d => d.classList.remove('active'));
        document.querySelector('.nav-dot[data-section="' + id + '"]')?.classList.add('active');
      }
    });
  }, { rootMargin: '-50% 0px' });
  sections.forEach(s => observer.observe(s));

  // SCROLL ANIMATIONS
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => e.isIntersecting && e.target.classList.add('visible'));
  }, { threshold: 0.1 });
  document.querySelectorAll('.fade-up').forEach(el => fadeObserver.observe(el));

  const staggerObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => e.isIntersecting && e.target.classList.add('visible'));
  }, { threshold: 0.2 });
  document.querySelectorAll('.stagger-children').forEach(el => staggerObserver.observe(el));

  // LOGO REVEAL
  const retailSection = document.getElementById('section-2');
  if (retailSection) {
    const logoObs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        document.querySelectorAll('.logo-item').forEach((logo, i) => {
          setTimeout(() => logo.classList.add('visible'), i * 80);
        });
        logoObs.unobserve(retailSection);
      }
    }, { threshold: 0.3 });
    logoObs.observe(retailSection);
  }

  // TILT EFFECT
  document.querySelectorAll('[data-tilt]').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = e.clientX - r.left, y = e.clientY - r.top;
      const cx = r.width / 2, cy = r.height / 2;
      card.style.transform = `perspective(1000px) rotateX(${(y - cy) / 25}deg) rotateY(${(cx - x) / 25}deg) scale(1.02)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });

  // MODAL
  document.querySelectorAll('[data-modal-trigger]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.getElementById(btn.dataset.modalTrigger)?.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });
  document.querySelector('.modal-close')?.addEventListener('click', () => {
    document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));
    document.body.style.overflow = '';
  });
  document.querySelector('.modal-overlay')?.addEventListener('click', e => {
    if (e.target.classList.contains('modal-overlay')) {
      e.target.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') { document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active')); document.body.style.overflow = ''; } });

  // TABS
  document.querySelectorAll('.dining-tabs .tab, .events-tabs .tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const parent = tab.closest('.dining-tabs, .events-tabs');
      parent?.querySelectorAll('.tab').forEach(t => t.classList.toggle('active', t === tab));
    });
  });

  // SMOOTH SCROLL
  document.querySelectorAll('a[href^="#section-"]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      document.getElementById(a.getAttribute('href').slice(1))?.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // KEYBOARD NAV
  let current = 0;
  document.addEventListener('keydown', e => {
    const total = document.querySelectorAll('.nav-dot').length;
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault();
      current = Math.min(current + 1, total - 1);
      document.getElementById('section-' + current)?.scrollIntoView({ behavior: 'smooth' });
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault();
      current = Math.max(current - 1, 0);
      document.getElementById('section-' + current)?.scrollIntoView({ behavior: 'smooth' });
    }
  });

  console.log('Mall of America Sales Deck initialized');
});

function triggerHeroAnimations() {
  document.querySelectorAll('.hero .fade-up').forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), i * 150);
  });
}