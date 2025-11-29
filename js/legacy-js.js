/* Enhanced hero entrance + subtle parallax
  - Adds .visible to .hero-content on DOM ready (small delay for paint)
  - Adds mouse parallax for desktop (subtle)
  - Adds gentle scroll-based parallax zoom (optional)
  - Respects prefers-reduced-motion
*/
(function() {
  function onReady(fn) {
    if (document.readyState === 'complete' || document.readyState === 'interactive') setTimeout(fn, 0);
    else document.addEventListener('DOMContentLoaded', fn);
  }

  onReady(function() {
    const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hero = document.querySelector('.hero');
    const content = document.querySelector('.hero-content');
    const indicator = document.querySelector('.scroll-indicator');

    if (!content || !hero) return;

    // Entrance: small delay so browser paints first
    if (prefersReduced) {
      content.classList.add('visible');
      if (indicator) indicator.style.opacity = '1';
    } else {
      setTimeout(() => {
        content.classList.add('visible');
        // reveal scroll indicator slightly later
        if (indicator) setTimeout(() => indicator.style.opacity = '1', 220);
      }, 60);
    }

    // Mouse parallax (desktop only)
    const isDesktop = window.matchMedia('(pointer: fine) and (min-width: 900px)').matches;
    if (!prefersReduced && isDesktop) {
      hero.classList.add('parallax');
      hero.addEventListener('mousemove', (e) => {
        const rect = hero.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 .. 0.5
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        // subtle background position shift and content parallax
        const bgX = 50 + px * 2.5; // small shift
        const bgY = 50 + py * 2.5;
        hero.style.backgroundPosition = `${bgX}% ${bgY}%`;
        // content slight translate for depth
        content.style.transform = `translateY(${Math.max(0, -py * 8)}px) scale(1)`;
      });
      hero.addEventListener('mouseleave', () => {
        hero.style.backgroundPosition = '';
        content.style.transform = '';
      });
    }

    // Scroll-based subtle zoom (parallax) — gentle and throttled
    if (!prefersReduced) {
      let ticking = false;
      window.addEventListener('scroll', () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
          const rect = hero.getBoundingClientRect();
          // when hero is in view, apply small scale based on scroll progress
          if (rect.top < window.innerHeight && rect.bottom > 0) {
            const progress = Math.min(1, Math.max(0, 1 - (rect.top / window.innerHeight)));
            const scale = 1 + (progress * 0.02); // up to 2% zoom
            hero.style.transform = `scale(${scale})`;
          } else {
            hero.style.transform = '';
          }
          ticking = false;
        });
      }, { passive: true });
    }
  });
})();
