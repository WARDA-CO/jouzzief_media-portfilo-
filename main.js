/* =============================================
   JOUZZEIF MEDIA – main.js
   Navbar scroll, mobile menu, scroll animations
   ============================================= */

// ---- Navbar scroll effect ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });

// ---- Mobile Nav Toggle ----
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  navLinks.classList.toggle('open');
});

// Close nav when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('active');
    navLinks.classList.remove('open');
  });
});

// ---- Scroll Animation (AOS-like) ----
const aosEls = document.querySelectorAll('[data-aos]');

const observerOptions = {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger delay for sibling elements
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => {
        entry.target.classList.add('aos-in');
      }, delay);
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Add stagger delays to children inside grids/step grids
document.querySelectorAll('.services-grid, .examples-grid, .contact-grid').forEach(grid => {
  const cards = grid.querySelectorAll('[id]');
  cards.forEach((card, i) => {
    card.setAttribute('data-delay', i * 100);
  });
});

document.querySelectorAll('.step-card').forEach((card, i) => {
  card.setAttribute('data-delay', i * 120);
});

// Observe all [data-aos] elements
aosEls.forEach(el => observer.observe(el));

// ---- Smooth scroll for anchor links ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 68;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ---- Floating WhatsApp button pulse on page load ----
const floatWa = document.getElementById('floatWaBtn');
if (floatWa) {
  setTimeout(() => {
    floatWa.style.boxShadow = '0 0 0 12px rgba(37,211,102,0)';
    floatWa.style.transition = 'box-shadow 0.6s ease';
  }, 1500);
}

// ---- Hero counter animation ----
function animateCounter(el, target, duration = 1200) {
  let start = 0;
  const step = Math.ceil(target / (duration / 16));
  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      el.textContent = target + '+';
      clearInterval(timer);
    } else {
      el.textContent = start + '+';
    }
  }, 16);
}


// Trigger counters when hero is in view
const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
  const heroObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      const statNums = document.querySelectorAll('.stat-num');
      // Animate 6+, 50+
      animateCounter(statNums[0], 6);
      animateCounter(statNums[1], 50);
      // 100% stays as is
      heroObserver.disconnect();
    }
  }, { threshold: 0.5 });
  heroObserver.observe(heroStats);
}

// ---- WhatsApp Form Submission ----
const waForm = document.getElementById('waForm');
if (waForm) {
  waForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const company = document.getElementById('companyName').value;
    const website = document.getElementById('websiteUrl').value || 'لا يوجد';
    const phone   = document.getElementById('userPhone').value;
    
    const message = encodeURIComponent(`مرحباً جوزيف، أريد الاستفسار عن خدماتك:\n\n` +
                    `*اسم المشروع:* ${company}\n` +
                    `*الموقع الإلكتروني:* ${website}\n` +
                    `*رقم الجوال:* ${phone}\n\n` +
                    `بانتظار تواصلك معي.`);
    
    const waUrl = `https://wa.me/971507691127?text=${message}`;
    window.open(waUrl, '_blank');
  });
}

// ---- Projects Slider Navigation ----
const slider = document.getElementById('projectsSlider');
const prevBtn = document.getElementById('sliderPrev');
const nextBtn = document.getElementById('sliderNext');

if (slider && prevBtn && nextBtn) {
  const scrollAmount = 300; // Pixels to scroll per click
  
  prevBtn.addEventListener('click', () => {
    slider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  });
  
  nextBtn.addEventListener('click', () => {
    slider.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  });
}

