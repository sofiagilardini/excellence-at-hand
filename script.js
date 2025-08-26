// Header scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const header = document.querySelector('.site-header');
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 100) {
    header.style.background = 'rgba(254, 254, 254, 0.98)';
    header.style.boxShadow = '0 2px 20px rgba(26, 35, 50, 0.1)';
  } else {
    header.style.background = 'rgba(254, 254, 254, 0.95)';
    header.style.boxShadow = 'none';
  }
  
  lastScroll = currentScroll;
});

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navList = document.querySelector('#nav-list');

if (menuToggle && navList) {
  menuToggle.addEventListener('click', () => {
    navList.classList.toggle('show');
    const isExpanded = navList.classList.contains('show');
    menuToggle.setAttribute('aria-expanded', isExpanded);
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!menuToggle.contains(e.target) && !navList.contains(e.target)) {
      navList.classList.remove('show');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Close mobile menu when clicking on a link
  navList.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navList.classList.remove('show');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Smooth scrolling for anchor links (if any)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Add entrance animations for cards when they come into view
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Apply observer to cards and other animated elements when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const animatedElements = document.querySelectorAll('.card, .testimonial, .team-info, .international-card');
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
});

// Form validation if contact forms are added later
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Add loading states for CTAs
document.querySelectorAll('.cta').forEach(button => {
  if (button.href && button.href.includes('mailto:')) {
    button.addEventListener('click', () => {
      const originalText = button.textContent;
      button.textContent = 'Opening email...';
      setTimeout(() => {
        button.textContent = originalText;
      }, 2000);
    });
  }
});

// Performance optimization: Lazy load images
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

// Add subtle parallax effect to hero section
window.addEventListener('scroll', () => {
  const hero = document.querySelector('.hero');
  if (hero) {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    hero.style.transform = `translateY(${rate}px)`;
  }
});

// Add focus management for accessibility
document.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') {
    document.body.classList.add('keyboard-navigation');
  }
});

document.addEventListener('mousedown', () => {
  document.body.classList.remove('keyboard-navigation');
});

// Add CSS for keyboard navigation
const style = document.createElement('style');
style.textContent = `
  .keyboard-navigation *:focus {
    outline: 2px solid var(--accent) !important;
    outline-offset: 2px;
  }
`;
document.head.appendChild(style);