const header = document.getElementById('siteHeader');
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const navLinks = document.querySelectorAll('.desktop-nav a, .mobile-menu a[href^="#"]');

function updateHeader() {
  header.classList.toggle('scrolled', window.scrollY > 24);
}

function setMenu(open) {
  menuToggle.classList.toggle('open', open);
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  mobileMenu.classList.toggle('open', open);
  mobileMenu.setAttribute('aria-hidden', String(!open));
  document.body.style.overflow = open ? 'hidden' : '';
}

menuToggle.addEventListener('click', () => {
  setMenu(!mobileMenu.classList.contains('open'));
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => setMenu(false));
});

window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

const sections = [...document.querySelectorAll('main section[id]')];
const desktopLinks = [...document.querySelectorAll('.desktop-nav a')];

const observer = new IntersectionObserver((entries) => {
  const visible = entries
    .filter((entry) => entry.isIntersecting)
    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

  if (!visible) return;
  desktopLinks.forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === `#${visible.target.id}`);
  });
}, { rootMargin: '-30% 0px -60% 0px', threshold: [0, .2, .5] });

sections.forEach((section) => observer.observe(section));
