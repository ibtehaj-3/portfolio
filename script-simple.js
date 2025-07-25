// Simple JavaScript for Portfolio - Vercel Compatible
console.log("Script loading...");

// Global variables
let isMenuOpen = false;
let currentTheme = "dark";
let typingIndex = 0;
let typingCharIndex = 0;
let isTypingDeleting = false;
let countersAnimated = [];

// Wait for DOM to load
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM loaded, initializing...");

  // Initialize all features
  initializeTheme();
  initializeNavigation();
  initializeTyping();
  initializeCounters();
  initializeScrollAnimations();
  initializeContactForm();
  initializeScrollToTop();

  console.log("All features initialized");
});

// Theme Management
function initializeTheme() {
  console.log("Initializing theme...");

  // Get saved theme or default to dark
  try {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      currentTheme = savedTheme;
    }
  } catch (e) {
    console.log("localStorage not available, using default theme");
  }

  // Apply theme
  document.documentElement.setAttribute("data-theme", currentTheme);
  updateThemeIcon();

  // Bind theme toggle
  const themeToggle = document.getElementById("theme-toggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme);
    console.log("Theme toggle bound");
  } else {
    console.log("Theme toggle not found");
  }
}

function toggleTheme() {
  console.log("Toggling theme from", currentTheme);
  currentTheme = currentTheme === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", currentTheme);

  // Save to localStorage
  try {
    localStorage.setItem("theme", currentTheme);
  } catch (e) {
    console.log("Cannot save theme to localStorage");
  }

  updateThemeIcon();
  console.log("Theme toggled to", currentTheme);
}

function updateThemeIcon() {
  const icon = document.querySelector("#theme-toggle i");
  if (icon) {
    icon.className = currentTheme === "dark" ? "fas fa-sun" : "fas fa-moon";
  }
}

// Navigation Management
function initializeNavigation() {
  console.log("Initializing navigation...");

  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", function (e) {
      e.preventDefault();
      toggleMobileMenu();
    });

    // Close menu when clicking on links
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        closeMobileMenu();
      });
    });

    // Close menu when clicking outside
    document.addEventListener("click", function (e) {
      if (
        isMenuOpen &&
        !navMenu.contains(e.target) &&
        !hamburger.contains(e.target)
      ) {
        closeMobileMenu();
      }
    });

    console.log("Navigation bound");
  } else {
    console.log("Navigation elements not found");
  }

  // Navbar scroll effect
  window.addEventListener("scroll", function () {
    const navbar = document.getElementById("navbar");
    if (navbar) {
      if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    }
  });

  // Smooth scrolling for anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        const offsetTop = target.offsetTop - 70;
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });
}

function toggleMobileMenu() {
  console.log("Toggling mobile menu");
  const navMenu = document.getElementById("nav-menu");
  const hamburger = document.getElementById("hamburger");

  if (navMenu && hamburger) {
    isMenuOpen = !isMenuOpen;

    if (isMenuOpen) {
      navMenu.classList.add("active");
      hamburger.classList.add("active");
      document.body.style.overflow = "hidden";
    } else {
      navMenu.classList.remove("active");
      hamburger.classList.remove("active");
      document.body.style.overflow = "";
    }

    console.log("Menu is now", isMenuOpen ? "open" : "closed");
  }
}

function closeMobileMenu() {
  console.log("Closing mobile menu");
  const navMenu = document.getElementById("nav-menu");
  const hamburger = document.getElementById("hamburger");

  if (navMenu && hamburger) {
    isMenuOpen = false;
    navMenu.classList.remove("active");
    hamburger.classList.remove("active");
    document.body.style.overflow = "";
  }
}

// Typing Animation
function initializeTyping() {
  console.log("Initializing typing animation...");

  const typingElement = document.getElementById("typing-text");
  if (typingElement) {
    const texts = [
      ".NET Developer",
      "Python Developer",
      "Full Stack Engineer",
      "AI/ML Enthusiast",
      "Problem Solver",
    ];

    function typeText() {
      const currentText = texts[typingIndex];

      if (isTypingDeleting) {
        typingElement.textContent = currentText.substring(
          0,
          typingCharIndex - 1
        );
        typingCharIndex--;
      } else {
        typingElement.textContent = currentText.substring(
          0,
          typingCharIndex + 1
        );
        typingCharIndex++;
      }

      let speed = isTypingDeleting ? 50 : 100;

      if (!isTypingDeleting && typingCharIndex === currentText.length) {
        speed = 2000;
        isTypingDeleting = true;
      } else if (isTypingDeleting && typingCharIndex === 0) {
        isTypingDeleting = false;
        typingIndex = (typingIndex + 1) % texts.length;
        speed = 500;
      }

      setTimeout(typeText, speed);
    }

    typeText();
    console.log("Typing animation started");
  } else {
    console.log("Typing element not found");
  }
}

// Counter Animation
function initializeCounters() {
  console.log("Initializing counters...");

  const counters = document.querySelectorAll(".stat-number");
  if (counters.length > 0) {
    console.log("Found", counters.length, "counters");

    // Use scroll event to trigger counters
    window.addEventListener("scroll", function () {
      checkCounters();
    });

    // Also check immediately in case counters are already visible
    setTimeout(checkCounters, 1000);
  } else {
    console.log("No counters found");
  }
}

function checkCounters() {
  const counters = document.querySelectorAll(".stat-number");

  counters.forEach(function (counter, index) {
    if (countersAnimated.indexOf(index) === -1) {
      const rect = counter.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

      if (isVisible) {
        console.log("Animating counter", index);
        animateCounter(counter);
        countersAnimated.push(index);
      }
    }
  });
}

function animateCounter(counter) {
  const target = parseFloat(counter.getAttribute("data-target"));
  if (isNaN(target)) return;

  const increment = target / 100;
  let current = 0;

  function updateCounter() {
    if (current < target) {
      current += increment;
      if (target === 3.4) {
        counter.textContent = Math.min(current, target).toFixed(1);
      } else {
        counter.textContent = Math.min(Math.floor(current), target);
      }
      requestAnimationFrame(updateCounter);
    } else {
      counter.textContent = target === 3.4 ? target.toFixed(1) : target;
    }
  }

  updateCounter();
}

// Scroll Animations
function initializeScrollAnimations() {
  console.log("Initializing scroll animations...");

  const elements = document.querySelectorAll(
    ".skill-category, .project-card, .timeline-item, .contact-card"
  );

  if (elements.length > 0) {
    console.log("Found", elements.length, "scroll animation elements");

    window.addEventListener("scroll", function () {
      elements.forEach(function (element) {
        if (!element.classList.contains("animated")) {
          const rect = element.getBoundingClientRect();
          const isVisible = rect.top < window.innerHeight - 50;

          if (isVisible) {
            element.classList.add("animate-on-scroll");
            setTimeout(function () {
              element.classList.add("animated");
            }, 100);
          }
        }
      });
    });
  } else {
    console.log("No scroll animation elements found");
  }
}

// Contact Form
function initializeContactForm() {
  console.log("Initializing contact form...");

  const form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const formData = new FormData(form);
      const name = formData.get("name");
      const email = formData.get("email");
      const subject = formData.get("subject");
      const message = formData.get("message");

      // Create mailto link
      const mailtoLink =
        "mailto:ibtehaj572@gmail.com?subject=" +
        encodeURIComponent(subject) +
        "&body=" +
        encodeURIComponent(
          "Name: " + name + "\nEmail: " + email + "\n\nMessage:\n" + message
        );

      window.location.href = mailtoLink;

      showNotification(
        "Thank you for your message! Your email client should open with a pre-filled email."
      );
      form.reset();
    });

    console.log("Contact form bound");
  } else {
    console.log("Contact form not found");
  }
}

function showNotification(message) {
  const notification = document.createElement("div");
  notification.textContent = message;
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4338ca;
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        z-index: 9999;
        max-width: 300px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;

  document.body.appendChild(notification);

  setTimeout(function () {
    notification.style.transform = "translateX(0)";
  }, 100);

  setTimeout(function () {
    notification.style.transform = "translateX(100%)";
    setTimeout(function () {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 5000);
}

// Scroll to Top
function initializeScrollToTop() {
  console.log("Initializing scroll to top...");

  const scrollBtn = document.createElement("button");
  scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    `;

  document.body.appendChild(scrollBtn);

  scrollBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  window.addEventListener("scroll", function () {
    if (window.scrollY > 500) {
      scrollBtn.style.opacity = "1";
      scrollBtn.style.visibility = "visible";
    } else {
      scrollBtn.style.opacity = "0";
      scrollBtn.style.visibility = "hidden";
    }
  });
}

// Fallback initialization
window.addEventListener("load", function () {
  console.log("Window loaded, running fallback checks...");

  // Check if key elements exist and retry if needed
  setTimeout(function () {
    if (!document.getElementById("theme-toggle")) {
      console.log("Theme toggle missing, retrying...");
      initializeTheme();
    }

    if (!document.getElementById("hamburger")) {
      console.log("Hamburger missing, retrying...");
      initializeNavigation();
    }

    if (!document.getElementById("typing-text")) {
      console.log("Typing element missing, retrying...");
      initializeTyping();
    }
  }, 1000);
});

console.log("Script loaded successfully");
