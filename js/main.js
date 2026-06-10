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

// Vimeo lite — open in lightbox
document.querySelectorAll('.vimeo-lite').forEach((el) => {
  el.addEventListener('click', function () {
    const id = this.dataset.vimeoId;
    window.lbOpen(`<iframe src="https://player.vimeo.com/video/${id}?autoplay=1&color=fbff80&title=0&byline=0&portrait=0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen class="lb-vimeo"></iframe>`);
  });
});

// Testimony player
const testimonyPlayer = document.getElementById('testimonyPlayer');
if (testimonyPlayer) {
  const video = document.getElementById('testimonyVideo');
  const overlay = document.getElementById('testimonyOverlay');
  function handleTestimonyClick() {
    overlay.classList.add('hidden');
    video.controls = true;
    video.play();
    testimonyPlayer.style.cursor = 'default';
    testimonyPlayer.removeEventListener('click', handleTestimonyClick);
  }
  testimonyPlayer.addEventListener('click', handleTestimonyClick);
}

// Reveal on scroll
const revealObserver = new IntersectionObserver(
  (entries) => entries.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add('visible'); revealObserver.unobserve(e.target); }
  }),
  { threshold: 0.12 }
);
document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

// Lightbox
(function () {
  const lb = document.createElement('div');
  lb.id = 'lightbox';
  lb.innerHTML = '<div class="lb-backdrop"></div><button class="lb-close" aria-label="Close">&times;</button><div class="lb-content"></div>';
  document.body.appendChild(lb);

  const backdrop = lb.querySelector('.lb-backdrop');
  const content  = lb.querySelector('.lb-content');
  const closeBtn = lb.querySelector('.lb-close');

  window.lbOpen = function open(html) {
    content.innerHTML = html;
    lb.classList.add('lb-open');
    document.body.style.overflow = 'hidden';
  }
  function close() {
    lb.classList.remove('lb-open');
    document.body.style.overflow = '';
    setTimeout(() => { content.innerHTML = ''; }, 300);
  }

  backdrop.addEventListener('click', close);
  closeBtn.addEventListener('click', close);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });

  // Result card images
  document.querySelectorAll('.result-card img').forEach((img) => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => {
      window.lbOpen(`<img src="${img.src}" alt="${img.alt}" />`);
    });
  });

  // Testimony video — fullscreen on double-click after playing
  const testimonyVideo = document.getElementById('testimonyVideo');
  if (testimonyVideo) {
    testimonyVideo.addEventListener('dblclick', () => {
      if (testimonyVideo.requestFullscreen) testimonyVideo.requestFullscreen();
      else if (testimonyVideo.webkitRequestFullscreen) testimonyVideo.webkitRequestFullscreen();
    });
  }
})();

// Stagger grid reveals
document.querySelectorAll('.results-grid .reveal, .work-grid .reveal, .process-steps .reveal').forEach((el, i) => {
  el.style.transitionDelay = `${i * 80}ms`;
});
