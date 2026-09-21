/* =====================================================
   RAGA — GANG 51  |  script.js
   Vanilla JS only — no libraries
   ===================================================== */

/* ---------- Reusable markup ---------- */

const NAV_LINKS = [
  { href: 'index.html', label: 'Home' },
  { href: 'events', label: 'Avenues', dropdown: [
      { href: 'club.html', label: 'Club Service' },
      { href: 'professional.html', label: 'Professional Service' },
      { href: 'community.html', label: 'Community Service' },
      { href: 'international.html', label: 'International Service' },
      { href: 'dpp.html', label: 'District Priority Project' },
  ]},
  { href: 'council.html', label: 'Council' },
  { href: 'directory.html', label: 'Directory' },
  { href: 'events', label: 'Events', dropdown: [
      { href: 'event1.html', label: 'Club Service Events' },
      { href: 'event3.html', label: 'Professional Service Events' },
      { href: 'event2.html', label: 'Community Service Events' },
      { href: 'event4.html', label: 'International Service Events' },
      { href: 'event5.html', label: 'DISTRICT PRIORITY PROJECT' },
  ]},
  { href: 'gallery.html', label: 'Gallery' },
  { href: 'contact.html', label: 'Contact' },
   { href: 'bulletin.html', label: 'Bulletin' },
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
        <a href="index.html" class="nav-brand">Gang 51</a>
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
      <h3 style="margin-top:28px;">Follow Us</h3>
      <div class="social-icons">
        <a href="https://www.instagram.com/rac_of_cit" aria-label="Instagram"><img src="assets/gallery/instagram.png" alt="IG"></a>
        <a href="https://www.linkedin.com/company/rotaract-club-of-coimbatore-institute-of-technology/" aria-label="LinkedIn"><img src="assets/gallery/linkedin.png" alt="IN"></a>
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
  // Decorative floating icons were removed as part of the professional
  // restyle — #floating-decor is hidden in style.css and this mount point
  // is left empty intentionally.
  return '';
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
      this.style.background = '#F0F2F8';
      this.style.border = '1px dashed #C7CEDB';
      this.style.minHeight = '160px';
      this.style.objectFit = 'contain';
      this.alt = this.alt || 'Image placeholder — add your image to this path';
      this.title = this.alt;
    }, { once: true });
  });
}

/* ---------- Navbar behavior (Desktop + Mobile Fixed) ---------- */
function initNavbarBehavior(){

  const navbar = document.getElementById("mainNavbar");
  const hamburger = document.getElementById("hamburgerBtn");
  const navLinks = document.getElementById("navLinks");

  if (!navbar) return;

  /* Sticky navbar shadow */
  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 20);
  });

  /* Mobile hamburger */
  if (hamburger && navLinks){

    hamburger.addEventListener("click", () => {

      hamburger.classList.toggle("active");
      navLinks.classList.toggle("open");

      // Close dropdowns whenever menu is closed
      if (!navLinks.classList.contains("open")){
        document.querySelectorAll(".nav-dropdown")
          .forEach(drop => drop.classList.remove("open"));
      }

    });

  }

  /* -------- Mobile Dropdown Fix -------- */

  const dropdownToggles = document.querySelectorAll("[data-dropdown-toggle]");

  dropdownToggles.forEach(toggle => {

    toggle.addEventListener("click", function(e){

      // Mobile only
      if (window.innerWidth <= 860){

        e.preventDefault();

        const currentDropdown = this.closest(".nav-dropdown");

        // Close every other dropdown
        document.querySelectorAll(".nav-dropdown").forEach(drop => {
          if (drop !== currentDropdown){
            drop.classList.remove("open");
          }
        });

        // Toggle current dropdown
        currentDropdown.classList.toggle("open");
      }

    });

  });

  /* Close mobile menu after clicking submenu item */
  document.querySelectorAll(".nav-dropdown-menu a").forEach(link => {

    link.addEventListener("click", () => {

      if (window.innerWidth <= 860){

        navLinks.classList.remove("open");
        hamburger.classList.remove("active");

        document.querySelectorAll(".nav-dropdown")
          .forEach(drop => drop.classList.remove("open"));
      }

    });

  });

  /* Close menu when normal link clicked (mobile) */
  document.querySelectorAll(".nav-links > li > a:not([data-dropdown-toggle])")
    .forEach(link => {

      link.addEventListener("click", () => {

        if (window.innerWidth <= 860){
          navLinks.classList.remove("open");
          hamburger.classList.remove("active");
        }

      });

    });

  /* Smooth scrolling for same-page anchors */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function(e){

      const target = document.querySelector(this.getAttribute("href"));

      if (target){
        e.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }

    });

  });

  /* Remove mobile dropdown state when resized to desktop */
  window.addEventListener("resize", () => {

    if (window.innerWidth > 860){

      navLinks.classList.remove("open");
      hamburger.classList.remove("active");

      document.querySelectorAll(".nav-dropdown")
        .forEach(drop => drop.classList.remove("open"));
    }

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
