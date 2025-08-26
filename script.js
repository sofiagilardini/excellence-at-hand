// Enhanced header scroll effect
window.addEventListener('scroll', () => {
  const header = document.querySelector('.site-header');
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 20) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Mobile menu toggle with enhanced animations
const menuToggle = document.querySelector('.menu-toggle');
const navList = document.querySelector('#nav-list');

if (menuToggle && navList) {
  menuToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    navList.classList.toggle('show');
    const isExpanded = navList.classList.contains('show');
    menuToggle.setAttribute('aria-expanded', isExpanded);
    
    // Animate hamburger to X
    menuToggle.innerHTML = isExpanded ? '✕' : '☰';
    
    // Prevent body scroll when menu is open
    document.body.style.overflow = isExpanded ? 'hidden' : '';
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!menuToggle.contains(e.target) && !navList.contains(e.target)) {
      navList.classList.remove('show');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.innerHTML = '☰';
      document.body.style.overflow = '';
    }
  });

  // Close mobile menu when clicking on a link
  navList.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navList.classList.remove('show');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.innerHTML = '☰';
      document.body.style.overflow = '';
    });
  });

  // Close menu on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navList.classList.contains('show')) {
      navList.classList.remove('show');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.innerHTML = '☰';
      document.body.style.overflow = '';
    }
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

// Form validation function (ready for future contact forms)
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
    const rate = scrolled * -0.3;
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

// Smooth reveal animations on scroll
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
    }
  });
}, {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
});

// Observe all reveal elements
revealElements.forEach(el => {
  revealObserver.observe(el);
});

// Add dynamic navigation highlighting based on current page
window.addEventListener('DOMContentLoaded', () => {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.main-nav a');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
});

// Enhanced CTA button interactions
document.querySelectorAll('.cta').forEach(cta => {
  cta.addEventListener('mouseenter', () => {
    cta.style.transform = 'translateY(-2px) scale(1.02)';
  });
  
  cta.addEventListener('mouseleave', () => {
    cta.style.transform = 'translateY(0) scale(1)';
  });
  
  cta.addEventListener('mousedown', () => {
    cta.style.transform = 'translateY(0) scale(0.98)';
  });
  
  cta.addEventListener('mouseup', () => {
    cta.style.transform = 'translateY(-2px) scale(1.02)';
  });
});

// Add loading animation for page transitions
function showLoader() {
  const loader = document.createElement('div');
  loader.className = 'page-loader';
  loader.innerHTML = '<div class="loader-spinner"></div>';
  loader.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(26, 35, 50, 0.9);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    opacity: 0;
    transition: opacity 0.3s ease;
  `;
  
  const spinner = loader.querySelector('.loader-spinner');
  spinner.style.cssText = `
    width: 40px;
    height: 40px;
    border: 3px solid rgba(201, 169, 110, 0.3);
    border-top: 3px solid #c9a96e;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  `;
  
  document.body.appendChild(loader);
  
  // Add CSS animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(style);
  
  setTimeout(() => {
    loader.style.opacity = '1';
  }, 10);
  
  return loader;
}

function hideLoader(loader) {
  if (loader) {
    loader.style.opacity = '0';
    setTimeout(() => {
      if (loader.parentNode) {
        loader.parentNode.removeChild(loader);
      }
    }, 300);
  }
}

// Add smooth page transitions for internal links
document.querySelectorAll('a[href$=".html"]').forEach(link => {
  if (link.hostname === window.location.hostname) {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const loader = showLoader();
      
      setTimeout(() => {
        window.location.href = link.href;
      }, 200);
    });
  }
});

// Hide loader on page load
window.addEventListener('load', () => {
  const existingLoader = document.querySelector('.page-loader');
  if (existingLoader) {
    hideLoader(existingLoader);
  }
});

// Add CSS for enhanced interactions
const dynamicStyles = document.createElement('style');
dynamicStyles.textContent = `
  .cta {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
  }
  
  .card:hover .card-icon {
    transform: scale(1.1) rotate(5deg);
    transition: all 0.3s ease;
  }
  
  .international-card:hover .flag {
    transform: scale(1.2);
    transition: all 0.3s ease;
  }
  
  .testimonial::before {
    content: '"';
    position: absolute;
    top: -10px;
    left: 20px;
    font-size: 4rem;
    color: var(--accent);
    opacity: 0.3;
    font-family: Georgia, serif;
  }
  
  .team-photo {
    transition: all 0.4s ease;
  }
  
  .team-photo:hover {
    transform: scale(1.02);
    box-shadow: 0 25px 70px var(--shadow-strong);
  }
`;
document.head.appendChild(dynamicStyles);