// ===== PRELOADER =====
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  setTimeout(() => {
    preloader.classList.add('hidden');
  }, 1800);
});

// ===== NAVBAR =====
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Sticky navbar on scroll
window.addEventListener('scroll', () => {
  if (window.scrollY > 80) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Mobile menu toggle
navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  navMenu.classList.toggle('open');
  document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
});

// Close mobile menu on link click
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('active');
    navMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');

function setActiveNav() {
  const scrollY = window.scrollY + 200;
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

    if (navLink && scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      navLinks.forEach(l => l.classList.remove('active'));
      navLink.classList.add('active');
    }
  });
}

window.addEventListener('scroll', setActiveNav);

// ===== HERO PARTICLES =====
function createParticles() {
  const container = document.getElementById('heroParticles');
  if (!container) return;

  for (let i = 0; i < 30; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    const size = Math.random() * 6 + 2;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.animationDuration = `${Math.random() * 15 + 10}s`;
    particle.style.animationDelay = `${Math.random() * 10}s`;
    container.appendChild(particle);
  }
}

createParticles();

// ===== SCROLL REVEAL ANIMATION =====
function revealElements() {
  const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  const windowHeight = window.innerHeight;

  reveals.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;
    const revealPoint = 100;

    if (elementTop < windowHeight - revealPoint) {
      el.classList.add('revealed');
    }
  });
}

window.addEventListener('scroll', revealElements);
window.addEventListener('load', revealElements);



// ===== TESTIMONIALS CAROUSEL =====
function initTestimonialsCarousel() {
  const track = document.getElementById('testimonialsTrack');
  const prevBtn = document.getElementById('testimonialPrev');
  const nextBtn = document.getElementById('testimonialNext');

  if (!track || !prevBtn || !nextBtn) return;

  let currentIndex = 0;
  let cardsPerView = 3;
  const cards = track.querySelectorAll('.testimonial-card');
  const totalCards = cards.length;

  function updateCardsPerView() {
    if (window.innerWidth <= 768) {
      cardsPerView = 1;
    } else if (window.innerWidth <= 1024) {
      cardsPerView = 2;
    } else {
      cardsPerView = 3;
    }
  }

  function updateSlider() {
    const gap = 28;
    const cardWidth = cards[0].offsetWidth + gap;
    track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
  }

  function goNext() {
    updateCardsPerView();
    const maxIndex = totalCards - cardsPerView;
    currentIndex = currentIndex < maxIndex ? currentIndex + 1 : 0;
    updateSlider();
  }

  function goPrev() {
    updateCardsPerView();
    const maxIndex = totalCards - cardsPerView;
    currentIndex = currentIndex > 0 ? currentIndex - 1 : maxIndex;
    updateSlider();
  }

  nextBtn.addEventListener('click', goNext);
  prevBtn.addEventListener('click', goPrev);

  // Auto-play
  let autoPlay = setInterval(goNext, 4000);

  track.addEventListener('mouseenter', () => clearInterval(autoPlay));
  track.addEventListener('mouseleave', () => {
    autoPlay = setInterval(goNext, 4000);
  });

  // Swipe support for mobile touch devices
  let touchStartX = 0;
  let touchEndX = 0;

  track.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  track.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });

  function handleSwipe() {
    const swipeThreshold = 50;
    if (touchEndX < touchStartX - swipeThreshold) {
      goNext();
    } else if (touchEndX > touchStartX + swipeThreshold) {
      goPrev();
    }
  }

  // Recalculate on resize
  window.addEventListener('resize', () => {
    updateCardsPerView();
    if (currentIndex > totalCards - cardsPerView) {
      currentIndex = Math.max(0, totalCards - cardsPerView);
    }
    updateSlider();
  });

  updateCardsPerView();
}

initTestimonialsCarousel();


// ===== BACK TO TOP =====
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 500) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== APPOINTMENT FORM =====
function handleFormSubmit(event) {
  event.preventDefault();

  const name = document.getElementById('patientName').value;
  const phone = document.getElementById('patientPhone').value;
  const date = document.getElementById('preferredDate').value;
  const treatment = document.getElementById('treatmentType').value;
  const message = document.getElementById('patientMessage').value;

  // Construct WhatsApp message
  let whatsappMessage = `Hello Dr. A.K. Gupta,\n\nI would like to book an appointment.\n\n`;
  whatsappMessage += `*Name:* ${name}\n`;
  whatsappMessage += `*Phone:* ${phone}\n`;
  if (date) whatsappMessage += `*Preferred Date:* ${date}\n`;
  if (treatment) whatsappMessage += `*Treatment:* ${treatment}\n`;
  if (message) whatsappMessage += `*Message:* ${message}\n`;
  whatsappMessage += `\nThank you!`;

  const encodedMessage = encodeURIComponent(whatsappMessage);
  const whatsappUrl = `https://wa.me/918601060738?text=${encodedMessage}`;

  // Show success feedback
  const btn = document.getElementById('submitAppointment');
  const originalHTML = btn.innerHTML;
  btn.innerHTML = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:20px;height:20px;">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
    Appointment Sent!
  `;
  btn.style.background = '#25D366';

  setTimeout(() => {
    btn.innerHTML = originalHTML;
    btn.style.background = '';
  }, 3000);

  // Open WhatsApp
  window.open(whatsappUrl, '_blank');

  // Reset form
  event.target.reset();
}

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// ===== COUNTER ANIMATION (Hero Stats) =====
function animateCounters() {
  const counters = document.querySelectorAll('.hero-stat-number');
  counters.forEach(counter => {
    const text = counter.textContent;
    const match = text.match(/(\d+)/);
    if (!match) return;

    const target = parseInt(match[1]);
    const suffix = text.replace(match[1], '');
    let current = 0;
    const increment = target / 60;
    const duration = 2000;
    const stepTime = duration / 60;

    function updateCounter() {
      current += increment;
      if (current >= target) {
        counter.textContent = target + suffix;
        return;
      }
      counter.textContent = Math.floor(current) + suffix;
      requestAnimationFrame(updateCounter);
    }

    // Start after a delay
    setTimeout(updateCounter, 500);
  });
}

// Run counter animation when hero is visible
const heroObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounters();
      heroObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const heroSection = document.getElementById('home');
if (heroSection) heroObserver.observe(heroSection);

// ===== SERVICE CARD STAGGER ANIMATION =====
const serviceObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('revealed');
      }, index * 100);
      serviceObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.service-card').forEach(card => {
  serviceObserver.observe(card);
});

// ===== WHY CARDS STAGGER =====
const whyObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('revealed');
      }, index * 100);
      whyObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.why-card').forEach(card => {
  whyObserver.observe(card);
});

// ===== SET MIN DATE FOR APPOINTMENT =====
const dateInput = document.getElementById('preferredDate');
if (dateInput) {
  const today = new Date().toISOString().split('T')[0];
  dateInput.setAttribute('min', today);
}

// ===== FORM INPUT ANIMATIONS =====
document.querySelectorAll('.form-group input, .form-group textarea, .form-group select').forEach(input => {
  input.addEventListener('focus', () => {
    input.parentElement.classList.add('focused');
  });
  input.addEventListener('blur', () => {
    input.parentElement.classList.remove('focused');
  });
});

// ===== BEFORE & AFTER SCROLL PINNING & STACKING =====
function initBeforeAfterScroll() {
  const section = document.querySelector('.before-after');
  const cards = document.querySelectorAll('.ba-card');
  if (!section || cards.length === 0) return;

  const clamp = (val, min, max) => Math.min(Math.max(val, min), max);

  function updateCardStack() {
    const rect = section.getBoundingClientRect();
    const sectionTop = rect.top + window.scrollY;
    const sectionHeight = rect.height;
    const windowHeight = window.innerHeight;

    // Calculate how much we have scrolled past the start of the section
    const maxScroll = sectionHeight - windowHeight;
    const currentScroll = window.scrollY - sectionTop;
    const progress = clamp(currentScroll / maxScroll, 0, 1);

    // Update each card's progress variable
    cards.forEach((card, idx) => {
      if (idx === 0) {
        card.style.setProperty('--card-progress', '1');
        card.classList.add('active-top');
        return;
      }

      // Card 1 (idx 0) is always shown.
      // Card 2 (idx 1) starts at progress 0.05
      // Card 3 (idx 2) starts at progress 0.30
      // Card 4 (idx 3) starts at progress 0.55
      const start = 0.05 + (idx - 1) * 0.25;
      const duration = 0.22; // leaving a small scroll range at the end of each card animation
      const cardProgress = clamp((progress - start) / duration, 0, 1);

      card.style.setProperty('--card-progress', cardProgress.toFixed(4));
      
      // Make only the top active card interactive
      if (cardProgress > 0.99) {
        card.classList.add('active-top');
        // Remove active-top from previous cards
        for (let i = 0; i < idx; i++) {
          cards[i].classList.remove('active-top');
        }
      } else {
        card.classList.remove('active-top');
        // Restore active-top to previous card if this one is not yet fully visible
        if (idx > 0 && cards[idx - 1].style.getPropertyValue('--card-progress') >= 0.99) {
          cards[idx - 1].classList.add('active-top');
        }
      }
    });
  }

  // Bind to scroll and resize
  window.addEventListener('scroll', updateCardStack, { passive: true });
  window.addEventListener('resize', updateCardStack, { passive: true });
  
  // Run once initially
  updateCardStack();
}

initBeforeAfterScroll();

// ===== OVERLAP SWIPING & DYNAMIC DOT INDICATORS FOR MOBILE CAROUSELS =====
function initMobileCarousels() {
  const grids = document.querySelectorAll('.services-grid, .why-grid');
  
  grids.forEach(grid => {
    if (!grid) return;

    const cards = Array.from(grid.children).filter(child => !child.classList.contains('carousel-dots'));
    if (cards.length === 0) return;

    // Avoid duplicating dots container if script is re-run
    let dotsContainer = grid.nextElementSibling;
    if (dotsContainer && dotsContainer.classList.contains('carousel-dots')) {
      dotsContainer.innerHTML = '';
    } else {
      dotsContainer = document.createElement('div');
      dotsContainer.classList.add('carousel-dots');
      grid.parentNode.insertBefore(dotsContainer, grid.nextSibling);
    }

    // Create dots and attach click scroll handlers
    cards.forEach((card, idx) => {
      const dot = document.createElement('span');
      dot.classList.add('carousel-dot');
      if (idx === 0) dot.classList.add('active');
      
      dot.addEventListener('click', () => {
        // Scroll to the card center relative to the grid
        const gridWidth = grid.offsetWidth;
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const scrollTarget = cardCenter - gridWidth / 2;
        
        grid.scrollTo({
          left: scrollTarget,
          behavior: 'smooth'
        });
      });

      dotsContainer.appendChild(dot);
    });

    function updateCarousel() {
      // Only run on mobile/tablet (width <= 768px)
      if (window.innerWidth > 768) {
        // Reset styles for desktop
        cards.forEach(card => {
          card.style.transform = '';
          card.style.opacity = '';
          card.style.zIndex = '';
        });
        dotsContainer.style.display = 'none';
        return;
      }

      dotsContainer.style.display = 'flex';
      const gridWidth = grid.offsetWidth;
      const viewportCenter = gridWidth / 2;
      const stepDistance = cards[1] ? (cards[1].offsetLeft - cards[0].offsetLeft) : gridWidth;

      let activeIndex = 0;
      let minDiff = Infinity;

      cards.forEach((card, idx) => {
        // Calculate the card center relative to the grid's scrolling viewport
        const relativeLeft = card.offsetLeft - grid.scrollLeft;
        const cardCenterViewport = relativeLeft + card.offsetWidth / 2;
        const diff = cardCenterViewport - viewportCenter;
        
        // Track the closest card to the viewport center to determine active index
        const absDiff = Math.abs(diff);
        if (absDiff < minDiff) {
          minDiff = absDiff;
          activeIndex = idx;
        }

        // Normalize using stepDistance instead of gridWidth for exact progression
        const ratio = diff / stepDistance;
        const clampedRatio = Math.max(-1, Math.min(1, ratio));

        let tx = 0;
        let scale = 1;
        let opacity = 1;
        const zIndex = idx + 1; // Fixed stacking context

        if (clampedRatio < 0) {
          // Left card (being swiped away to the left)
          // Counteract 30% of its movement so it stays visible underneath (overlap)
          tx = -clampedRatio * card.offsetWidth * 0.3;
          scale = 0.9 + (1 + clampedRatio) * 0.1; // scale down slightly (to 0.9)
          opacity = 1 + clampedRatio * 0.6; // fade to 0.4
        } else {
          // Right card (incoming from the right, slides normally on top of the left card)
          tx = 0;
          scale = 1;
          opacity = 1;
        }

        card.style.transform = `translateX(${tx.toFixed(1)}px) scale(${scale.toFixed(3)})`;
        card.style.opacity = opacity.toFixed(3);
        card.style.zIndex = zIndex;
      });

      // Update indicator dots active state
      const dots = dotsContainer.querySelectorAll('.carousel-dot');
      dots.forEach((dot, idx) => {
        if (idx === activeIndex) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    }

    // Attach scroll and resize listeners
    grid.addEventListener('scroll', updateCarousel, { passive: true });
    window.addEventListener('resize', updateCarousel, { passive: true });
    
    // Initial runs to position everything correctly
    window.addEventListener('load', updateCarousel);
    updateCarousel();
    setTimeout(updateCarousel, 200);
    setTimeout(updateCarousel, 800);
  });
}

initMobileCarousels();
