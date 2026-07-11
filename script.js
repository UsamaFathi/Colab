const header = document.querySelector('.site-header');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
const sections = document.querySelectorAll('main section[id]');
const backToTop = document.querySelector('#back-to-top');
const filterButtons = document.querySelectorAll('.filter-button');
const projectCards = document.querySelectorAll('.project-card');
const contactForm = document.querySelector('#contact-form');

const cvUrl = 'https://drive.google.com/file/d/1MgYwb0NYqoWDnHqa5p-j4-ExKwirc2C_/view?usp=sharing';
document.querySelectorAll('a[href*="drive.google.com/file/d/"]').forEach((link) => {
  link.href = cvUrl;
});

const closeMenu = () => {
  navToggle?.classList.remove('active');
  navMenu?.classList.remove('open');
  navToggle?.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('menu-open');
};

navToggle?.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('open');
  navToggle.classList.toggle('active', isOpen);
  navToggle.setAttribute('aria-expanded', String(isOpen));
  document.body.classList.toggle('menu-open', isOpen);
});

navLinks.forEach((link) => link.addEventListener('click', closeMenu));

document.addEventListener('click', (event) => {
  if (!navMenu?.classList.contains('open')) return;
  if (!navMenu.contains(event.target) && !navToggle.contains(event.target)) closeMenu();
});

const handleScroll = () => {
  const scrollY = window.scrollY;
  header?.classList.toggle('scrolled', scrollY > 24);
  backToTop?.classList.toggle('visible', scrollY > 650);

  let currentSection = '';
  sections.forEach((section) => {
    const top = section.offsetTop - 140;
    if (scrollY >= top) currentSection = section.id;
  });

  navLinks.forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === `#${currentSection}`);
  });
};

window.addEventListener('scroll', handleScroll, { passive: true });
handleScroll();

backToTop?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -35px 0px' }
);

document.querySelectorAll('.reveal').forEach((element, index) => {
  element.style.transitionDelay = `${Math.min((index % 4) * 70, 210)}ms`;
  revealObserver.observe(element);
});

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((item) => item.classList.remove('active'));
    button.classList.add('active');

    projectCards.forEach((card) => {
      const categories = card.dataset.category.split(' ');
      const shouldShow = filter === 'all' || categories.includes(filter);
      card.classList.toggle('hidden', !shouldShow);
    });
  });
});

contactForm?.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(contactForm);
  const name = formData.get('name')?.toString().trim();
  const email = formData.get('email')?.toString().trim();
  const subject = formData.get('subject')?.toString().trim();
  const message = formData.get('message')?.toString().trim();

  if (!name || !email || !subject || !message) return;

  const mailSubject = encodeURIComponent(`[Portfolio] ${subject}`);
  const mailBody = encodeURIComponent(
    `Hello Usama,\n\n${message}\n\nFrom: ${name}\nEmail: ${email}`
  );

  window.location.href = `mailto:hhg1765@gmail.com?subject=${mailSubject}&body=${mailBody}`;
});

const currentYear = document.querySelector('#current-year');
if (currentYear) currentYear.textContent = new Date().getFullYear();
