// ===== MODERN PORTFOLIO JAVASCRIPT =====

// DOM Elements
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");
const navLinks = document.querySelectorAll(".nav-link");
const navbar = document.getElementById("navbar");
const typingText = document.querySelector(".typing-text");
const skillBars = document.querySelectorAll(".skill-bar");
const certificateCards = document.querySelectorAll(".certificate-card");
const modal = document.getElementById("certificate-modal");
const modalImg = document.getElementById("modal-certificate");
const closeModal = document.querySelector(".close-modal");
const contactForm = document.getElementById("contact-form");

// ===== MOBILE NAVIGATION =====
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");

  // Prevent body scroll when menu is open
  if (navMenu.classList.contains("active")) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
});

// Close mobile menu when clicking on a link
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
    document.body.style.overflow = "auto";
  });
});

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
    document.body.style.overflow = "auto";
  }
});

// ===== NAVBAR SCROLL EFFECT =====
window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// ===== SMOOTH SCROLLING & ACTIVE NAVIGATION =====
function updateActiveNav() {
  const sections = document.querySelectorAll("section");
  const scrollPos = window.scrollY + 100;

  sections.forEach((section) => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    const id = section.getAttribute("id");
    const navLink = document.querySelector(`.nav-link[href="#${id}"]`);

    if (scrollPos >= top && scrollPos <= bottom) {
      navLinks.forEach((link) => link.classList.remove("active"));
      if (navLink) navLink.classList.add("active");
    }
  });
}

window.addEventListener("scroll", updateActiveNav);

// ===== TYPING ANIMATION =====
const typingTexts = [
  "Full Stack Developer",
  "Frontend Specialist",
  "Backend Developer",
  "Web Designer",
  "Problem Solver",
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeWriter() {
  const currentText = typingTexts[textIndex];

  if (isDeleting) {
    typingText.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingText.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;
  }

  let typeSpeed = isDeleting ? 50 : 100;

  if (!isDeleting && charIndex === currentText.length) {
    typeSpeed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex = (textIndex + 1) % typingTexts.length;
    typeSpeed = 500;
  }

  setTimeout(typeWriter, typeSpeed);
}

// Start typing animation when page loads
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(typeWriter, 1000);
});

// ===== SKILL BARS ANIMATION =====
function animateSkillBars() {
  skillBars.forEach((bar) => {
    const level = bar.getAttribute("data-level");
    bar.style.width = level + "%";
  });
}

// ===== SCROLL REVEAL ANIMATION =====
function revealOnScroll() {
  const reveals = document.querySelectorAll(".scroll-reveal");

  reveals.forEach((element) => {
    const windowHeight = window.innerHeight;
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;

    if (elementTop < windowHeight - elementVisible) {
      element.classList.add("revealed");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in-up");

      // Animate skill bars when skills section is visible
      if (entry.target.classList.contains("skills-section")) {
        setTimeout(animateSkillBars, 500);
      }
    }
  });
}, observerOptions);

// Observe sections for animations
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section");
  sections.forEach((section) => {
    observer.observe(section);
  });
});

// ===== CERTIFICATE MODAL =====
certificateCards.forEach((card) => {
  card.addEventListener("click", () => {
    const certType = card.getAttribute("data-certificate");
    const certImg = card.querySelector(".cert-img");

    if (certImg) {
      modalImg.src = certImg.src;
      modal.style.display = "block";
      document.body.style.overflow = "hidden";
    }
  });
});

// Close modal
closeModal.addEventListener("click", () => {
  modal.style.display = "none";
  document.body.style.overflow = "auto";
});

// Close modal when clicking outside
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  }
});

// Close modal with Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.style.display === "block") {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  }
});

// ===== CONTACT FORM =====
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(contactForm);
  const name = formData.get("name");
  const email = formData.get("email");
  const subject = formData.get("subject");
  const message = formData.get("message");

  // Basic validation
  if (!name || !email || !subject || !message) {
    showNotification("Please fill in all fields", "error");
    return;
  }

  if (!isValidEmail(email)) {
    showNotification("Please enter a valid email address", "error");
    return;
  }

  // Simulate form submission
  const submitBtn = contactForm.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;

  submitBtn.textContent = "Sending...";
  submitBtn.disabled = true;

  setTimeout(() => {
    showNotification(
      "Message sent successfully! I'll get back to you soon.",
      "success"
    );
    contactForm.reset();
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  }, 2000);
});

// ===== UTILITY FUNCTIONS =====
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function showNotification(message, type) {
  // Create notification element
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.textContent = message;

  // Style the notification
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 2rem;
        border-radius: 10px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        ${type === "success" ? "background: #10b981;" : "background: #ef4444;"}
    `;

  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 100);

  // Remove after 5 seconds
  setTimeout(() => {
    notification.style.transform = "translateX(100%)";
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 5000);
}

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// ===== LOADING ANIMATION =====
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});

// ===== PARALLAX EFFECT =====
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll(".parallax");

  parallaxElements.forEach((element) => {
    const speed = element.dataset.speed || 0.5;
    element.style.transform = `translateY(${scrolled * speed}px)`;
  });
});

// ===== PERFORMANCE OPTIMIZATION =====
// Throttle scroll events
function throttle(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Apply throttling to scroll events
const throttledScroll = throttle(() => {
  updateActiveNav();
  revealOnScroll();
}, 16); // ~60fps

window.addEventListener("scroll", throttledScroll);

// ===== VIEW MORE PROJECTS FUNCTIONALITY =====
document.addEventListener("DOMContentLoaded", () => {
  const viewMoreBtn = document.getElementById("view-more-projects");
  const additionalProjects = document.getElementById("additional-projects");

  if (viewMoreBtn && additionalProjects) {
    viewMoreBtn.addEventListener("click", (e) => {
      e.preventDefault();

      if (
        additionalProjects.style.display === "none" ||
        !additionalProjects.style.display
      ) {
        additionalProjects.style.display = "grid";
        viewMoreBtn.textContent = "Show Less Projects";

        // Smooth scroll to additional projects
        setTimeout(() => {
          additionalProjects.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 100);
      } else {
        additionalProjects.style.display = "none";
        viewMoreBtn.textContent = "View All Projects";

        // Scroll back to main projects
        document.getElementById("projects").scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  }
});

// ===== MOBILE OPTIMIZATIONS =====
// Detect mobile device
function isMobile() {
  return window.innerWidth <= 768;
}

// Optimize animations for mobile
function optimizeForMobile() {
  if (isMobile()) {
    // Add touch-friendly classes
    document.body.classList.add("mobile-device");

    // Optimize scroll behavior
    document.documentElement.style.scrollBehavior = "smooth";

    // Reduce motion for better performance
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );
    if (prefersReducedMotion.matches) {
      document.documentElement.style.setProperty(
        "--animation-duration",
        "0.1s"
      );
    }
  } else {
    document.body.classList.remove("mobile-device");
  }
}

// Run on load and resize
window.addEventListener("load", optimizeForMobile);
window.addEventListener("resize", optimizeForMobile);

// ===== TOUCH ENHANCEMENTS =====
// Add touch feedback for interactive elements
document.addEventListener("DOMContentLoaded", () => {
  const interactiveElements = document.querySelectorAll(
    ".btn, .project-link, .social-link, .nav-link, .project-card"
  );

  interactiveElements.forEach((element) => {
    element.addEventListener("touchstart", function () {
      this.style.transform = "scale(0.98)";
      this.style.transition = "transform 0.1s ease";
    });

    element.addEventListener("touchend", function () {
      this.style.transform = "";
      this.style.transition = "";
    });

    element.addEventListener("touchcancel", function () {
      this.style.transform = "";
      this.style.transition = "";
    });
  });
});

// ===== MOBILE VIEWPORT FIXES =====
// Fix viewport height issues on mobile browsers
function setMobileViewportHeight() {
  if (isMobile()) {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }
}

window.addEventListener("load", setMobileViewportHeight);
window.addEventListener("resize", setMobileViewportHeight);
window.addEventListener("orientationchange", () => {
  setTimeout(setMobileViewportHeight, 100);
});

// ===== MOBILE PERFORMANCE IMPROVEMENTS =====
// Lazy load images on mobile
function lazyLoadImages() {
  if (isMobile() && "IntersectionObserver" in window) {
    const images = document.querySelectorAll("img[data-src]");
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove("lazy");
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach((img) => imageObserver.observe(img));
  }
}

// Initialize lazy loading
document.addEventListener("DOMContentLoaded", lazyLoadImages);

// ===== MOBILE SCROLL IMPROVEMENTS =====
// Debounce scroll events on mobile for better performance
let scrollTimeout;
function handleMobileScroll() {
  if (isMobile()) {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      updateActiveNav();
      revealOnScroll();
    }, 10);
  }
}

// Use optimized scroll handler for mobile
if (isMobile()) {
  window.removeEventListener("scroll", throttledScroll);
  window.addEventListener("scroll", handleMobileScroll, { passive: true });
}
