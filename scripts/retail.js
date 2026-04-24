/**
 * RETAIL SECTION - Animated JavaScript
 * Only targets elements inside #section-2
 */
(function() {
  const section = document.getElementById('section-2');
  if (!section) return;

  // 1. SCROLL ANIMATION - Intersection Observer
  const fadeElements = section.querySelectorAll('.fade-animate');
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  fadeElements.forEach(el => fadeObserver.observe(el));

  // 2. NUMBER ANIMATION
  const statNumbers = section.querySelectorAll('.retail-stat-num');
  const numberObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
        entry.target.classList.add('animated');
        animateNumber(entry.target);
      }
    });
  }, { threshold: 0.5 });
  statNumbers.forEach(num => numberObserver.observe(num));

  function animateNumber(element) {
    const text = element.textContent;
    const targetValue = parseInt(text.replace(/[^0-9]/g, ''));
    if (!targetValue || targetValue > 1000) return;
    
    const prefix = text.includes('$') ? '$' : '';
    const suffix = text.includes('%') ? '%' : text.includes('+') ? '+' : '';
    let current = 0;
    const step = targetValue / 30;
    const duration = 1500;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      if (elapsed < duration) {
        current = Math.min(Math.floor(step * (elapsed / 50)), targetValue);
        element.textContent = prefix + current + suffix;
        element.classList.add('animate');
        requestAnimationFrame(update);
      } else {
        element.textContent = text;
        element.classList.remove('animate');
      }
    }
    requestAnimationFrame(update);
  }

  // 3. STAT CARDS - Add glass positioning
  const statCards = section.querySelectorAll('.retail-stat');
  statCards.forEach(card => {
    card.style.position = 'relative';
    card.style.overflow = 'hidden';
  });

  // 4. TITLE - Add shine positioning
  const title = section.querySelector('.glow-title');
  if (title) {
    title.style.position = 'relative';
    title.style.overflow = 'hidden';
  }
})();