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

// Mobile nav toggle
const hamburger = document.querySelector('.nav-hamburger');
const mobileMenu = document.querySelector('.nav-mobile-menu');
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen);
    mobileMenu.classList.toggle('open', isOpen);
    mobileMenu.setAttribute('aria-hidden', !isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });
  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      mobileMenu.classList.remove('open');
      mobileMenu.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    });
  });
}

// ── IMAGE LIGHTBOX ──────────────────────────────────────────────
const imgLightbox = document.getElementById('imgLightbox');
const lightboxImg = imgLightbox.querySelector('.lightbox-img');
const lightboxCaption = imgLightbox.querySelector('.lightbox-caption');

function openLightbox(src, alt, caption) {
  lightboxImg.src = src;
  lightboxImg.alt = alt;
  lightboxCaption.textContent = caption || '';
  imgLightbox.classList.add('open');
  imgLightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  imgLightbox.classList.remove('open');
  imgLightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

document.querySelectorAll('.result-card-img-wrapper').forEach((wrapper) => {
  const img = wrapper.querySelector('img');
  const caption = wrapper.dataset.caption || '';
  wrapper.addEventListener('click', () => openLightbox(img.src, img.alt, caption));
});

imgLightbox.querySelector('.lightbox-backdrop').addEventListener('click', closeLightbox);
imgLightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);

// ── VIDEO MODAL ─────────────────────────────────────────────────
const videoModal = document.getElementById('videoModal');
const videoModalPlayer = document.getElementById('videoModalPlayer');
const videoModalCaption = document.getElementById('videoModalCaption');

function openVideoModal(vimeoId, caption) {
  videoModalPlayer.innerHTML = '';
  const iframe = document.createElement('iframe');
  iframe.src = `https://player.vimeo.com/video/${vimeoId}?autoplay=1&color=fbff80&title=0&byline=0&portrait=0`;
  iframe.allow = 'autoplay; fullscreen; picture-in-picture';
  iframe.allowFullscreen = true;
  videoModalPlayer.appendChild(iframe);
  videoModalCaption.textContent = caption || '';
  videoModal.classList.add('open');
  videoModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeVideoModal() {
  videoModal.classList.remove('open');
  videoModal.setAttribute('aria-hidden', 'true');
  videoModalPlayer.innerHTML = '';
  document.body.style.overflow = '';
}

document.querySelectorAll('.vimeo-lite').forEach((el) => {
  const caption = el.nextElementSibling?.classList.contains('vimeo-caption')
    ? el.nextElementSibling.textContent
    : '';
  el.addEventListener('click', () => openVideoModal(el.dataset.vimeoId, caption));
});

videoModal.querySelector('.video-modal-backdrop').addEventListener('click', closeVideoModal);
videoModal.querySelector('.video-modal-close').addEventListener('click', closeVideoModal);

// ── TESTIMONY PLAYER ────────────────────────────────────────────
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

// ESC key closes any open modal
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (imgLightbox.classList.contains('open')) closeLightbox();
    if (videoModal.classList.contains('open')) closeVideoModal();
    if (mobileMenu && mobileMenu.classList.contains('open')) {
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      mobileMenu.classList.remove('open');
      mobileMenu.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }
});
