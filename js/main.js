/* Dreamers Collective — main.js */

// Scrollspy
const navLinks = document.querySelectorAll('.nav-links a[data-section]');
const sections = document.querySelectorAll('section[id]');
const sectionObserver = new IntersectionObserver(
  (entries) => entries.forEach((e) => {
    if (e.isIntersecting) {
      const id = e.target.getAttribute('id');
      navLinks.forEach((l) => l.classList.toggle('active', l.dataset.section === id));
    }
  }),
  { rootMargin: '-40% 0px -50% 0px' }
);
sections.forEach((s) => sectionObserver.observe(s));

// Vimeo lite
document.querySelectorAll('.vimeo-lite').forEach((el) => {
  el.addEventListener('click', function () {
    const id = this.dataset.vimeoId;
    const iframe = document.createElement('iframe');
    iframe.src = `https://player.vimeo.com/video/${id}?autoplay=1&color=fbff80&title=0&byline=0&portrait=0`;
    iframe.allow = 'autoplay; fullscreen; picture-in-picture';
    iframe.allowFullscreen = true;
    this.innerHTML = '';
    this.appendChild(iframe);
    this.style.cursor = 'default';
  });
});

// Reveal on scroll
const revealObserver = new IntersectionObserver(
  (entries) => entries.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add('visible'); revealObserver.unobserve(e.target); }
  }),
  { threshold: 0.12 }
);
document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

// Stagger grid reveals
document.querySelectorAll('.results-grid .reveal, .work-grid .reveal, .process-steps .reveal').forEach((el, i) => {
  el.style.transitionDelay = `${i * 80}ms`;
});
