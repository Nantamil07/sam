/* =====================================================
   RAGA — GANG 51  |  script.js
   Vanilla JS only — no libraries
   ===================================================== */

/* ---------- Reusable markup ---------- */

const NAV_LINKS = [
  { href: 'index.html', label: 'Home' },
  { href: 'avenues.html', label: 'Avenues' },
  { href: 'council.html', label: 'Council' },
  { href: 'directory.html', label: 'Directory' },
  { href: 'events', label: 'Events', dropdown: [
      { href: 'event1.html', label: 'Club Service Events' },
      { href: 'event2.html', label: 'Community Service Events' },
      { href: 'event3.html', label: 'Professional Service Events' },
      { href: 'event4.html', label: 'International Service Events' },
      { href: 'event5.html', label: 'Special Events' },
  ]},
  { href: 'gallery.html', label: 'Gallery' },
  { href: 'contact.html', label: 'Contact' },
];

function currentPage(){
  const path = window.location.pathname.split('/').pop();
  return path === '' ? 'index.html' : path;
}

function buildNavbar(){
  const page = currentPage();
  const isEventPage = /^event[1-5]\.html$/.test(page);

  const linksHTML = NAV_LINKS.map(link => {
    if (link.dropdown){
      const activeClass = isEventPage ? 'active' : '';
      const items = link.dropdown.map(d =>
        `<a href="${d.href}">${d.label}</a>`
      ).join('');
      return `
        <li class="nav-dropdown">
          <a href="#" class="${activeClass}" data-dropdown-toggle>${link.label} ▾</a>
          <div class="nav-dropdown-menu">${items}</div>
        </li>`;
    }
    const activeClass = page === link.href ? 'active' : '';
    return `<li><a href="${link.href}" class="${activeClass}">${link.label}</a></li>`;
  }).join('');

  return `
    <nav class="navbar" id="mainNavbar">
      <div class="container">
        <a href="index.html" class="nav-brand">RAGA · Gang 51</a>
        <button class="hamburger" id="hamburgerBtn" aria-label="Menu">
          <span></span><span></span><span></span>
        </button>
        <ul class="nav-links" id="navLinks">
          ${linksHTML}
        </ul>
      </div>
    </nav>`;
}

function buildFooter(){
  return `
    <footer class="contact-footer" id="siteFooter">
      <div class="container contact-columns">
        <div>
      <h3>Quick Links</h3>
      <ul>
        <li><a href="index.html">Home</a></li>
        <li><a href="avenues.html">Avenues</a></li>
        <li><a href="council.html">Council</a></li>
        <li><a href="event1.html">Events</a></li>
        <li><a href="gallery.html">Gallery</a></li>
        <li><a href="contact.html">Contact</a></li>
      </ul>
      <br>
      <br>
      <h3 style="margin-top:28px;">Follow Us</h3>
      <div class="social-icons">
        <a href="#" aria-label="Instagram" data-placeholder-link>IG</a>
        <a href="#" aria-label="Facebook" data-placeholder-link>FB</a>
        <a href="#" aria-label="LinkedIn" data-placeholder-link>IN</a>
        <a href="#" aria-label="YouTube" data-placeholder-link>YT</a>
      </div>
    </div>
    <div class="address-block">
      <h3>Contact Us</h3>
      <p>Rotaract Club of Coimbatore Institute of Technology</p>
      <p>Coimbatore Institute of Technology</p>
      <p>Civil Aerodrome Post, Peelamedu</p>
      <p>Coimbatore – 641014</p>
      <br>
      <p>Rtr. Varsha P V (President)               : 9600298552</p>
      <p>Rtr. Vaisali S (Secretary Administrations): 9384728901</p>
      <p>Rtr. Meghna J (Secretary Communications)  : 8925153138</p>
      <br>
      <p>Email: rcofcitsecretary@gmail.com</p>
    </div>
  </div>

      <div class="footer-bottom">
        &copy; <span id="footerYear"></span> Rotaract Club of Coimbatore Institute of Technology — Gang 51. All rights reserved.
      </div>
    </footer>`;
}

function buildFloatingDecor(){
  const icons = [
    // music note
    `<svg viewBox="0 0 24 24" width="34" height="34" fill="currentColor"><path d="M9 17V5l12-2v12"/><circle cx="6" cy="17" r="3"/><circle cx="18" cy="15" r="3"/></svg>`,
    // treble clef-ish (simplified swirl)
    `<svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 3c-2 2-3 4-3 6s2 3 3 5-1 5-3 5-3-2-2-4"/></svg>`,
    // vinyl disc
    `<svg viewBox="0 0 24 24" width="38" height="38" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg>`,
    // headphones
    `<svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 14v-2a8 8 0 0116 0v2"/><rect x="2" y="14" width="5" height="7" rx="2"/><rect x="17" y="14" width="5" height="7" rx="2"/></svg>`,
    // guitar (simplified body + neck)
    `<svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="8" cy="16" r="5"/><path d="M11 12l7-9"/><path d="M15 6l3 2"/></svg>`,
    // microphone
    `<svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0014 0"/><path d="M12 18v4"/></svg>`,
    // sparkle
    `<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M12 2l1.6 6.4L20 10l-6.4 1.6L12 18l-1.6-6.4L4 10l6.4-1.6z"/></svg>`,
  ];

  let html = '';
  const positions = [
    [4,10],[12,70],[22,25],[30,85],[40,15],[48,55],[58,80],
    [65,8],[72,45],[80,90],[86,20],[92,60],[15,40],[55,30]
  ];
  positions.forEach((pos, i) => {
    const icon = icons[i % icons.length];
    const size = 0.7 + (i % 4) * 0.25;
    const duration = 10 + (i % 6) * 2.4;
    const delay = (i % 5) * 1.3;
    const opacity = 0.1 + (i % 3) * 0.05;
    html += `<div class="float-icon" style="top:${pos[0]}%; left:${pos[1]}%; opacity:${opacity}; transform:scale(${size}); animation-duration:${duration}s; animation-delay:${delay}s;">${icon}</div>`;
  });
  return html;
}

/* ---------- Inject shared markup ---------- */
document.addEventListener('DOMContentLoaded', () => {
  const navMount = document.getElementById('site-navbar');
  if (navMount) navMount.outerHTML = buildNavbar();

  const footerMount = document.getElementById('site-footer');
  if (footerMount) footerMount.outerHTML = buildFooter();

  const decorMount = document.getElementById('floating-decor');
  if (decorMount) decorMount.innerHTML = buildFloatingDecor();

  const yearEl = document.getElementById('footerYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  initNavbarBehavior();
  initRevealAnimations();
  initRippleButtons();
  initLightbox();
  initGalleryFilters();
  initPlaceholderLinks();
  initImageFallbacks();
});

/* ---------- Graceful fallback for missing placeholder images ---------- */
function initImageFallbacks(){
  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function(){
      this.style.background = 'linear-gradient(160deg, rgba(0,43,127,0.6), rgba(2,16,58,0.8))';
      this.style.border = '2px dashed rgba(255,213,79,0.25)';
      this.style.minHeight = '160px';
      this.style.objectFit = 'contain';
      this.alt = this.alt || 'Image placeholder — add your image to this path';
      this.title = this.alt;
    }, { once: true });
  });
}

/* ---------- Navbar behavior ---------- */
function initNavbarBehavior(){
  const navbar = document.getElementById('mainNavbar');
  const hamburger = document.getElementById('hamburgerBtn');
  const navLinks = document.getElementById('navLinks');

  if (!navbar) return;

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  });

  if (hamburger && navLinks){
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('open');
    });
  }

  // Dropdown: hover on desktop is handled by CSS; add click support for touch
  document.querySelectorAll('[data-dropdown-toggle]').forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      if (window.innerWidth <= 860){
        e.preventDefault();
        toggle.closest('.nav-dropdown').classList.toggle('open');
      }
    });
  });

  // Smooth scroll for in-page anchors
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target){
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

/* ---------- Reveal on scroll ---------- */
function initRevealAnimations(){
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  els.forEach(el => observer.observe(el));
}

/* ---------- Button ripple ---------- */
function initRippleButtons(){
  document.querySelectorAll('.btn-gold').forEach(btn => {
    btn.addEventListener('click', function(e){
      const rect = this.getBoundingClientRect();
      const ripple = document.createElement('span');
      const size = Math.max(rect.width, rect.height);
      ripple.className = 'ripple';
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 650);
    });
  });
}

/* ---------- Gallery lightbox ---------- */
function initLightbox(){
  const items = document.querySelectorAll('.masonry-item img, .poster-card img');
  if (!items.length) return;

  const overlay = document.createElement('div');
  overlay.className = 'lightbox-overlay';
  overlay.innerHTML = `<button class="lightbox-close" aria-label="Close">&times;</button><img src="" alt="">`;
  document.body.appendChild(overlay);

  const overlayImg = overlay.querySelector('img');
  const closeBtn = overlay.querySelector('.lightbox-close');

  items.forEach(img => {
    img.addEventListener('click', () => {
      overlayImg.src = img.src;
      overlayImg.alt = img.alt || '';
      overlay.classList.add('active');
    });
  });

  function closeLightbox(){ overlay.classList.remove('active'); overlayImg.src = ''; }
  closeBtn.addEventListener('click', closeLightbox);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) closeLightbox(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });
}

/* ---------- Gallery category filters ---------- */
function initGalleryFilters(){
  const buttons = document.querySelectorAll('.gallery-filters button');
  const items = document.querySelectorAll('.masonry-item');
  if (!buttons.length) return;

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      items.forEach(item => {
        const match = filter === 'all' || item.getAttribute('data-category') === filter;
        item.style.display = match ? '' : 'none';
      });
    });
  });
}

/* ---------- Placeholder link guard ---------- */
function initPlaceholderLinks(){
  document.querySelectorAll('[data-placeholder-link]').forEach(link => {
    link.addEventListener('click', (e) => e.preventDefault());
  });
}
