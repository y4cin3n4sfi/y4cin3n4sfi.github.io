// =============================
// SIMPLE ANIMATIONS ONLY
// =============================
gsap.registerPlugin(ScrollTrigger);

// Hero animation
gsap.from(".hero-text h1", {
  y: 80,
  opacity: 0,
  duration: 2,
  ease: "power4.out"
});

// =============================
// SCROLL-BASED ANIMATIONS
// =============================

// Fade up animation for all sections
gsap.utils.toArray(".section").forEach(section => {
  // Skip hero section for fade up (it has its own animation)
  if (!section.classList.contains('hero')) {
    gsap.fromTo(section, 
      { 
        y: 50, 
        opacity: 0 
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "top 50%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }
});

// Scale animation for background images
gsap.utils.toArray(".fullscreen-section").forEach(section => {
  gsap.fromTo(section.querySelector('.frame-photo'), 
    { scale: 1.2 },
    {
      scale: 1,
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "top top",
        scrub: true
      }
    }
  );
});

// Text animation for captions
gsap.utils.toArray(".fullscreen-section .caption, .transition-text").forEach(caption => {
  gsap.fromTo(caption, 
    { 
      y: 80, 
      opacity: 0 
    },
    {
      y: 0,
      opacity: 1,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: caption,
        start: "top 80%",
        end: "top 50%",
        toggleActions: "play none none reverse"
      }
    }
  );
});

// Staggered animation for CTA elements
gsap.fromTo(".cta h2, .cta p, .cta form", 
  { 
    y: 30, 
    opacity: 0 
  },
  {
    y: 0,
    opacity: 1,
    stagger: 0.3,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".cta",
      start: "top 80%",
      end: "top 50%",
      toggleActions: "play none none reverse"
    }
  }
);

// Parallax effect for transition section
gsap.fromTo(".transition .transition-bg", 
  { y: -100 },
  {
    y: 100,
    ease: "none",
    scrollTrigger: {
      trigger: ".transition",
      start: "top bottom",
      end: "bottom top",
      scrub: true
    }
  }
);

// =============================
// TOP NAVIGATION FUNCTIONALITY
// =============================
const topNav = document.querySelector('.top-nav');
const navItems = document.querySelectorAll('.nav-item');

// Show/hide nav on scroll with animation
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;
  
  // Show nav when scrolling down past hero section
  if (currentScrollY > 100) {
    topNav.classList.add('visible');
    
    // Add subtle scale effect on nav when scrolling
    if (currentScrollY > lastScrollY) {
      // Scrolling down - slight scale down
      topNav.style.transform = 'scaleY(0.98)';
    } else {
      // Scrolling up - normal scale
      topNav.style.transform = 'scaleY(1)';
    }
  } else {
    topNav.classList.remove('visible');
  }
  
  // Update active nav item
  updateActiveNav();
  
  lastScrollY = currentScrollY;
});

// Reset nav transform when not scrolling
let scrollTimeout;
window.addEventListener('scroll', () => {
  clearTimeout(scrollTimeout);
  topNav.style.transition = 'transform 0.1s ease';
  
  scrollTimeout = setTimeout(() => {
    topNav.style.transform = 'scaleY(1)';
    topNav.style.transition = 'transform 0.3s ease';
  }, 100);
});

// Click navigation
navItems.forEach(item => {
  item.addEventListener('click', function() {
    const targetSection = this.getAttribute('data-section');
    const targetElement = document.querySelector(`.${targetSection}`);
    
    if (targetElement) {
      // Add click animation to nav item
      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.style.transform = 'scale(1)';
      }, 200);
      
      // Calculate offset for fixed nav
      const navHeight = topNav.offsetHeight;
      const targetPosition = targetElement.offsetTop - navHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Update active nav item based on scroll position
function updateActiveNav() {
  let currentSection = '';
  const scrollPosition = window.scrollY + 100;

  navItems.forEach(item => {
    const sectionClass = item.getAttribute('data-section');
    const section = document.querySelector(`.${sectionClass}`);
    
    if (section) {
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        currentSection = sectionClass;
      }
    }
  });

  navItems.forEach(item => {
    const itemSection = item.getAttribute('data-section');
    if (itemSection === currentSection) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
}

// Initialize on load
updateActiveNav();

// Add loading animation for images
document.addEventListener('DOMContentLoaded', function() {
  const images = document.querySelectorAll('.frame-photo, .transition-bg');
  
  images.forEach(img => {
    // If it's a background image, we need to handle it differently
    const element = img;
    
    // Add fade-in animation for images as they load
    gsap.fromTo(element, 
      { opacity: 0.5, scale: 1.1 },
      { 
        opacity: 1, 
        scale: 1, 
        duration: 1.5, 
        ease: "power2.out" 
      }
    );
  });
});
// =============================
// SIMPLE LUXURY SLIDESHOW
// =============================
function initSimpleSlideshow() {
    const slides = document.querySelectorAll('.luxury-gallery .slide');
    let currentSlide = 0;
    
    if (slides.length <= 1) return; // No slideshow needed if only one image

    function nextSlide() {
        // Fade out current slide
        slides[currentSlide].classList.remove('active');
        
        // Move to next slide
        currentSlide = (currentSlide + 1) % slides.length;
        
        // Fade in next slide
        slides[currentSlide].classList.add('active');
    }

    // Start slideshow - change every 5 seconds
    setInterval(nextSlide, 7000);
}

// Initialize on load
document.addEventListener('DOMContentLoaded', initSimpleSlideshow);