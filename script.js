/* Sarthak Upadhyay — Portfolio JS
   Smooth scroll + scroll-reveal for project cards. No external dependencies. */

document.addEventListener('DOMContentLoaded', () => {
  // Smooth scroll for in-page links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Scroll reveal for project rows — respects reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const rows = document.querySelectorAll('.project-row, .skill-tag');

  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    rows.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(16px)';
      el.style.transition = 'opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)';
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    rows.forEach(el => observer.observe(el));
  }

  // Back-to-top button — appears after scrolling past the hero section
  const backToTopBtn = document.getElementById('backToTop');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 500) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    });
  }

  // Mobile hamburger menu toggle
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      hamburger.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', navLinks.classList.contains('open'));
    });

    // Close the menu once a link is tapped
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburger.classList.remove('open');
        
      });
    });

    // Close menu when tapping anywhere outside
    document.addEventListener('click', (e) => {
      if (navLinks.classList.contains('open') && 
          !navLinks.contains(e.target) && 
          !hamburger.contains(e.target)) {
        navLinks.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });


  }

  // Scroll-spy — highlights the nav link matching the section currently in view
  const sections = document.querySelectorAll('main section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a');

  if (sections.length && navAnchors.length) {
    window.addEventListener('scroll', () => {
      let current = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (window.scrollY >= sectionTop) {
          current = section.getAttribute('id');
        }
      });

      navAnchors.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
      });
    });
  }
});