// Modern JavaScript for Portfolio Website

// Utility function to safely access localStorage
function safeLocalStorage(key, defaultValue = null) {
  try {
    if (typeof Storage !== "undefined") {
      return localStorage.getItem(key) || defaultValue;
    }
    return defaultValue;
  } catch (e) {
    console.warn("localStorage not available:", e);
    return defaultValue;
  }
}

function safeSetLocalStorage(key, value) {
  try {
    if (typeof Storage !== "undefined") {
      localStorage.setItem(key, value);
    }
  } catch (e) {
    console.warn("localStorage not available:", e);
  }
}

// Theme Management
class ThemeManager {
  constructor() {
    this.theme = safeLocalStorage("theme", "dark");
    console.log("ThemeManager initialized with theme:", this.theme);
    this.init();
  }

  init() {
    console.log(
      "ThemeManager init called, document.readyState:",
      document.readyState
    );
    // Ensure DOM is ready
    if (document.readyState === "loading") {
      console.log("DOM still loading, waiting for DOMContentLoaded...");
      document.addEventListener("DOMContentLoaded", () => this.setup());
    } else {
      console.log("DOM ready, setting up theme...");
      this.setup();
    }
  }

  setup() {
    console.log("ThemeManager setup called");
    document.documentElement.setAttribute("data-theme", this.theme);
    console.log("Theme attribute set to:", this.theme);

    // Add a small delay to ensure DOM is fully rendered
    setTimeout(() => {
      this.updateThemeIcon();
      this.bindEvents();
    }, 100);
  }

  toggle() {
    console.log("Theme toggle called, current theme:", this.theme);
    this.theme = this.theme === "dark" ? "light" : "dark";
    console.log("New theme:", this.theme);
    document.documentElement.setAttribute("data-theme", this.theme);
    safeSetLocalStorage("theme", this.theme);
    this.updateThemeIcon();
  }

  updateThemeIcon() {
    const icon = document.querySelector("#theme-toggle i");
    console.log("Updating theme icon, icon element:", icon);
    if (icon) {
      const newClass = this.theme === "dark" ? "fas fa-sun" : "fas fa-moon";
      icon.className = newClass;
      console.log("Theme icon updated to:", newClass);
    } else {
      console.warn("Theme toggle icon not found");
    }
  }

  bindEvents() {
    const themeToggle = document.getElementById("theme-toggle");
    console.log("Binding theme events, themeToggle element:", themeToggle);
    if (themeToggle) {
      // Remove any existing listeners
      themeToggle.removeEventListener("click", this.handleToggle);
      // Add new listener
      this.handleToggle = () => this.toggle();
      themeToggle.addEventListener("click", this.handleToggle);
      console.log("Theme toggle event listener added");
    } else {
      console.warn("Theme toggle button not found");
      // Retry after a short delay
      setTimeout(() => {
        console.log("Retrying theme toggle binding...");
        this.bindEvents();
      }, 500);
    }
  }
}

// Navigation Manager
class NavigationManager {
  constructor() {
    this.navbar = null;
    this.hamburger = null;
    this.navMenu = null;
    this.navLinks = [];
    console.log("NavigationManager initialized");
    this.init();
  }

  init() {
    console.log(
      "NavigationManager init called, document.readyState:",
      document.readyState
    );
    // Wait for DOM to be ready
    if (document.readyState === "loading") {
      console.log("DOM still loading, waiting for DOMContentLoaded...");
      document.addEventListener("DOMContentLoaded", () => this.setup());
    } else {
      console.log("DOM ready, setting up navigation...");
      this.setup();
    }
  }

  setup() {
    console.log("NavigationManager setup called");
    this.navbar = document.getElementById("navbar");
    this.hamburger = document.getElementById("hamburger");
    this.navMenu = document.getElementById("nav-menu");
    this.navLinks = document.querySelectorAll(".nav-link");

    console.log("Navigation elements found:", {
      navbar: !!this.navbar,
      hamburger: !!this.hamburger,
      navMenu: !!this.navMenu,
      navLinksCount: this.navLinks.length,
    });

    // Add a small delay to ensure DOM is fully rendered
    setTimeout(() => {
      this.bindEvents();
      this.handleScroll();
      this.setActiveLink();
    }, 100);
  }

  bindEvents() {
    console.log("Binding navigation events...");

    // Hamburger menu toggle
    if (this.hamburger && this.navMenu) {
      console.log("Setting up hamburger menu...");
      // Remove any existing listeners
      this.hamburger.removeEventListener("click", this.handleHamburgerClick);
      // Add new listener
      this.handleHamburgerClick = (e) => {
        e.preventDefault();
        console.log("Hamburger clicked");
        this.toggleMobileMenu();
      };
      this.hamburger.addEventListener("click", this.handleHamburgerClick);
      console.log("Hamburger event listener added");
    } else {
      console.warn("Hamburger or nav menu not found:", {
        hamburger: !!this.hamburger,
        navMenu: !!this.navMenu,
      });
      // Retry after a short delay
      setTimeout(() => {
        console.log("Retrying hamburger binding...");
        this.setup();
      }, 500);
    }

    // Close mobile menu when clicking on links
    this.navLinks.forEach((link, index) => {
      link.addEventListener("click", () => {
        console.log(`Nav link ${index} clicked`);
        this.closeMobileMenu();
      });
    });

    // Close mobile menu when clicking outside
    document.addEventListener("click", (e) => {
      if (this.navMenu && this.navMenu.classList.contains("active")) {
        if (
          !this.navMenu.contains(e.target) &&
          !this.hamburger.contains(e.target)
        ) {
          console.log("Clicked outside menu, closing...");
          this.closeMobileMenu();
        }
      }
    });

    // Scroll events with throttling
    let ticking = false;
    window.addEventListener("scroll", () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          this.handleScroll();
          this.setActiveLink();
          ticking = false;
        });
        ticking = true;
      }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e) => this.handleSmoothScroll(e));
    });
  }

  toggleMobileMenu() {
    console.log("Toggling mobile menu...");
    if (this.navMenu && this.hamburger) {
      const isActive = this.navMenu.classList.contains("active");
      console.log("Menu currently active:", isActive);

      this.navMenu.classList.toggle("active");
      this.hamburger.classList.toggle("active");

      const newIsActive = this.navMenu.classList.contains("active");
      console.log("Menu now active:", newIsActive);

      // Prevent body scroll when menu is open
      if (newIsActive) {
        document.body.style.overflow = "hidden";
        console.log("Body scroll disabled");
      } else {
        document.body.style.overflow = "";
        console.log("Body scroll enabled");
      }
    } else {
      console.warn("Cannot toggle menu - elements not found");
    }
  }

  closeMobileMenu() {
    console.log("Closing mobile menu...");
    if (this.navMenu && this.hamburger) {
      this.navMenu.classList.remove("active");
      this.hamburger.classList.remove("active");
      document.body.style.overflow = "";
      console.log("Mobile menu closed");
    }
  }

  handleScroll() {
    if (this.navbar) {
      if (window.scrollY > 50) {
        this.navbar.classList.add("scrolled");
      } else {
        this.navbar.classList.remove("scrolled");
      }
    }
  }

  setActiveLink() {
    const sections = document.querySelectorAll("section");
    const scrollPos = window.scrollY + 100;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;
      const id = section.getAttribute("id");

      if (scrollPos >= top && scrollPos <= bottom) {
        this.navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  handleSmoothScroll(e) {
    const href =
      e.target.getAttribute("href") ||
      e.target.closest("a").getAttribute("href");
    if (href && href.startsWith("#")) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const offsetTop = target.offsetTop - 70;
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
        this.closeMobileMenu();
      }
    }
  }
}

// Typing Animation
class TypingAnimation {
  constructor(element, texts, speed = 100, deleteSpeed = 50, delay = 2000) {
    this.element = element;
    this.texts = texts;
    this.speed = speed;
    this.deleteSpeed = deleteSpeed;
    this.delay = delay;
    this.textIndex = 0;
    this.charIndex = 0;
    this.isDeleting = false;
    this.timeoutId = null;

    console.log("TypingAnimation constructor called");
    console.log("Element:", this.element);
    console.log("Texts:", this.texts);

    if (this.element && this.texts && this.texts.length > 0) {
      console.log("Starting typing animation...");
      this.init();
    } else {
      console.warn("TypingAnimation: Missing element or texts");
    }
  }

  init() {
    console.log("TypingAnimation initialized");
    this.type();
  }

  type() {
    if (!this.element || !this.texts || this.texts.length === 0) {
      console.warn("TypingAnimation: Missing element or texts in type()");
      return;
    }

    const currentText = this.texts[this.textIndex];

    if (this.isDeleting) {
      this.element.textContent = currentText.substring(0, this.charIndex - 1);
      this.charIndex--;
    } else {
      this.element.textContent = currentText.substring(0, this.charIndex + 1);
      this.charIndex++;
    }

    let typeSpeed = this.isDeleting ? this.deleteSpeed : this.speed;

    if (!this.isDeleting && this.charIndex === currentText.length) {
      typeSpeed = this.delay;
      this.isDeleting = true;
    } else if (this.isDeleting && this.charIndex === 0) {
      this.isDeleting = false;
      this.textIndex = (this.textIndex + 1) % this.texts.length;
    }

    this.timeoutId = setTimeout(() => this.type(), typeSpeed);
  }

  destroy() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }
}

// Counter Animation
class CounterAnimation {
  constructor() {
    this.counters = document.querySelectorAll(".stat-number");
    this.animatedCounters = new Set();
    console.log(
      "CounterAnimation initialized, found",
      this.counters.length,
      "counters"
    );
    this.init();
  }

  init() {
    if (this.counters.length > 0) {
      console.log("Setting up counter observers...");
      this.observeCounters();
    } else {
      console.warn("No counter elements found");
      // Retry after a short delay in case elements aren't loaded yet
      setTimeout(() => {
        console.log("Retrying counter initialization...");
        this.counters = document.querySelectorAll(".stat-number");
        if (this.counters.length > 0) {
          this.observeCounters();
        }
      }, 1000);
    }
  }

  observeCounters() {
    console.log("Setting up counter observation...");
    // Fallback for browsers without IntersectionObserver
    if (!window.IntersectionObserver) {
      console.log("IntersectionObserver not available, using scroll fallback");
      window.addEventListener("scroll", () => this.checkCountersInView());
      // Also trigger immediately in case elements are already in view
      setTimeout(() => this.checkCountersInView(), 500);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        console.log(
          "Counter intersection observed:",
          entries.length,
          "entries"
        );
        entries.forEach((entry) => {
          if (
            entry.isIntersecting &&
            !this.animatedCounters.has(entry.target)
          ) {
            console.log("Counter entering view, animating...");
            this.animateCounter(entry.target);
            this.animatedCounters.add(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    this.counters.forEach((counter, index) => {
      console.log(`Observing counter ${index}:`, counter);
      observer.observe(counter);
    });

    // Also add a fallback trigger after some time
    setTimeout(() => {
      console.log("Fallback counter trigger...");
      this.checkCountersInView();
    }, 2000);
  }

  checkCountersInView() {
    console.log("Checking counters in view...");
    this.counters.forEach((counter, index) => {
      if (!this.animatedCounters.has(counter)) {
        const rect = counter.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight && rect.bottom > 0;
        console.log(`Counter ${index} in view:`, isInView);
        if (isInView) {
          this.animateCounter(counter);
          this.animatedCounters.add(counter);
        }
      }
    });
  }

  animateCounter(counter) {
    const target = parseFloat(counter.getAttribute("data-target"));
    console.log("Animating counter to:", target);

    if (isNaN(target)) {
      console.warn("Invalid target value for counter:", counter);
      return;
    }

    const increment = target / 100;
    let current = 0;

    const updateCounter = () => {
      if (current < target) {
        current += increment;
        if (target === 3.4) {
          counter.textContent = Math.min(current, target).toFixed(1);
        } else {
          counter.textContent = Math.min(Math.floor(current), target);
        }
        requestAnimationFrame(updateCounter);
      } else {
        const finalValue = target === 3.4 ? target.toFixed(1) : target;
        counter.textContent = finalValue;
        console.log("Counter animation completed:", finalValue);
      }
    };

    updateCounter();
  }
}

// Scroll Animations
class ScrollAnimations {
  constructor() {
    this.elements = document.querySelectorAll(
      ".skill-category, .project-card, .timeline-item, .contact-card"
    );
    this.init();
  }

  init() {
    this.observeElements();
  }

  observeElements() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-on-scroll");
            setTimeout(() => {
              entry.target.classList.add("animated");
            }, 100);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    this.elements.forEach((element) => {
      observer.observe(element);
    });
  }
}

// Contact Form Handler
class ContactForm {
  constructor() {
    this.form = document.getElementById("contact-form");
    this.init();
  }

  init() {
    if (this.form) {
      this.form.addEventListener("submit", (e) => this.handleSubmit(e));
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(this.form);
    const name = formData.get("name");
    const email = formData.get("email");
    const subject = formData.get("subject");
    const message = formData.get("message");

    // Create mailto link
    const mailtoLink = `mailto:ibtehaj572@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    )}`;

    // Open mailto link
    window.location.href = mailtoLink;

    // Show success message
    this.showNotification(
      "Thank you for your message! Your email client should open with a pre-filled email.",
      "success"
    );

    // Reset form
    this.form.reset();
  }

  showNotification(message, type = "info") {
    const notification = document.createElement("div");
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--primary);
            color: var(--text-inverse);
            padding: var(--space-md) var(--space-lg);
            border-radius: var(--radius-md);
            box-shadow: var(--shadow-lg);
            z-index: var(--z-tooltip);
            transform: translateX(100%);
            transition: transform var(--transition-normal);
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
}

// Scroll to Top Button
class ScrollToTop {
  constructor() {
    this.createButton();
    this.init();
  }

  createButton() {
    this.button = document.createElement("button");
    this.button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    this.button.className = "scroll-to-top";
    this.button.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: var(--gradient-primary);
            color: var(--text-inverse);
            border: none;
            border-radius: 50%;
            font-size: 1.2rem;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all var(--transition-normal);
            z-index: var(--z-fixed);
            box-shadow: var(--shadow-lg);
        `;

    document.body.appendChild(this.button);
  }

  init() {
    this.button.addEventListener("click", () => this.scrollToTop());
    window.addEventListener("scroll", () => this.handleScroll());
  }

  handleScroll() {
    if (window.scrollY > 500) {
      this.button.style.opacity = "1";
      this.button.style.visibility = "visible";
    } else {
      this.button.style.opacity = "0";
      this.button.style.visibility = "hidden";
    }
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
}

// Preloader
class Preloader {
  constructor() {
    this.createPreloader();
    this.init();
  }

  createPreloader() {
    this.preloader = document.createElement("div");
    this.preloader.className = "preloader";
    this.preloader.innerHTML = `
            <div class="preloader-content">
                <div class="spinner"></div>
                <p>Loading...</p>
            </div>
        `;

    this.preloader.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: var(--bg-primary);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            transition: opacity var(--transition-normal);
        `;

    // Add spinner styles
    const style = document.createElement("style");
    style.textContent = `
            .preloader-content {
                text-align: center;
                color: var(--text-primary);
            }
            
            .spinner {
                width: 40px;
                height: 40px;
                border: 4px solid var(--border-primary);
                border-top: 4px solid var(--primary);
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin: 0 auto var(--space-md);
            }
            
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;

    document.head.appendChild(style);
    document.body.appendChild(this.preloader);
  }

  init() {
    window.addEventListener("load", () => this.hide());
  }

  hide() {
    setTimeout(() => {
      this.preloader.style.opacity = "0";
      setTimeout(() => {
        if (this.preloader.parentNode) {
          this.preloader.parentNode.removeChild(this.preloader);
        }
      }, 300);
    }, 500);
  }
}

// Parallax Effect
class ParallaxEffect {
  constructor() {
    this.elements = document.querySelectorAll(".floating-element");
    this.init();
  }

  init() {
    window.addEventListener("scroll", () => this.handleScroll());
  }

  handleScroll() {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;

    this.elements.forEach((element, index) => {
      const speed = (index + 1) * 0.2;
      element.style.transform = `translateY(${rate * speed}px)`;
    });
  }
}

// Initialize everything when DOM is loaded
function initializeApp() {
  console.log("Initializing app...");
  try {
    // Initialize all components with error handling
    console.log("Creating Preloader...");
    new Preloader();

    console.log("Creating ThemeManager...");
    new ThemeManager();

    console.log("Creating NavigationManager...");
    new NavigationManager();

    console.log("Creating CounterAnimation...");
    new CounterAnimation();

    console.log("Creating ScrollAnimations...");
    new ScrollAnimations();

    console.log("Creating ContactForm...");
    new ContactForm();

    console.log("Creating ScrollToTop...");
    new ScrollToTop();

    console.log("Creating ParallaxEffect...");
    new ParallaxEffect();

    // Initialize typing animation
    console.log("Initializing typing animation...");
    const typingElement = document.getElementById("typing-text");
    if (typingElement) {
      console.log("Typing element found, creating animation...");
      new TypingAnimation(typingElement, [
        ".NET Developer",
        "Python Developer",
        "Full Stack Engineer",
        "AI/ML Enthusiast",
        "Problem Solver",
      ]);
    } else {
      console.warn("Typing element not found");
    }

    // Add loading class to body
    document.body.classList.add("loaded");
    console.log("Body loaded class added");

    // Add ripple effects to buttons
    console.log("Initializing ripple effects...");
    initializeRippleEffects();

    console.log("App initialization completed successfully");
  } catch (error) {
    console.error("Error initializing app:", error);
    // Fallback initialization
    console.log("Attempting fallback initialization...");
    initializeFallback();
  }
}

function initializeRippleEffects() {
  try {
    // Add ripple effect to buttons
    document.querySelectorAll(".btn").forEach((btn) => {
      btn.addEventListener("click", function (e) {
        const ripple = document.createElement("span");
        ripple.classList.add("ripple");
        this.appendChild(ripple);

        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    background: rgba(255, 255, 255, 0.3);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    pointer-events: none;
                `;

        setTimeout(() => {
          if (ripple && ripple.parentNode) {
            ripple.remove();
          }
        }, 600);
      });
    });

    // Add ripple animation styles
    const rippleStyle = document.createElement("style");
    rippleStyle.textContent = `
            .btn {
                position: relative;
                overflow: hidden;
            }
            
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
    document.head.appendChild(rippleStyle);
  } catch (error) {
    console.error("Error initializing ripple effects:", error);
  }
}

function initializeFallback() {
  // Basic fallback initialization
  try {
    // Mobile menu fallback
    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("nav-menu");

    if (hamburger && navMenu) {
      hamburger.addEventListener("click", () => {
        navMenu.classList.toggle("active");
        hamburger.classList.toggle("active");
      });
    }

    // Theme toggle fallback
    const themeToggle = document.getElementById("theme-toggle");
    if (themeToggle) {
      themeToggle.addEventListener("click", () => {
        const currentTheme =
          document.documentElement.getAttribute("data-theme");
        const newTheme = currentTheme === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", newTheme);
      });
    }

    // Smooth scrolling fallback
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
          });
        }
      });
    });
  } catch (error) {
    console.error("Error in fallback initialization:", error);
  }
}

// Multiple initialization strategies for better compatibility
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeApp);
} else {
  initializeApp();
}

// Backup initialization
window.addEventListener("load", () => {
  if (!document.body.classList.contains("loaded")) {
    initializeApp();
  }
});

// Additional backup for mobile devices
setTimeout(() => {
  if (!document.body.classList.contains("loaded")) {
    initializeFallback();
  }
}, 2000);

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
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

// Apply debouncing to scroll-heavy functions
window.addEventListener(
  "scroll",
  debounce(() => {
    // Any additional scroll-based functionality can go here
  }, 10)
);

// Final initialization check and diagnostics
function performInitializationDiagnostics() {
  console.log("=== Portfolio Initialization Diagnostics ===");

  // Check if all classes are properly initialized
  console.log("ThemeManager instance:", window.themeManager ? "OK" : "MISSING");
  console.log(
    "NavigationManager instance:",
    window.navigationManager ? "OK" : "MISSING"
  );
  console.log(
    "CounterAnimation instance:",
    window.counterAnimation ? "OK" : "MISSING"
  );
  console.log(
    "TypingAnimation instance:",
    window.typingAnimation ? "OK" : "MISSING"
  );

  // Check essential DOM elements
  const darkToggle = document.querySelector(".dark-toggle");
  const mobileToggle = document.querySelector(".mobile-toggle");
  const counters = document.querySelectorAll(".stat-number");
  const typingElement = document.querySelector(".typing-text");

  console.log("Dark toggle element:", darkToggle ? "FOUND" : "MISSING");
  console.log("Mobile toggle element:", mobileToggle ? "FOUND" : "MISSING");
  console.log("Counter elements:", counters.length, "found");
  console.log("Typing element:", typingElement ? "FOUND" : "MISSING");

  // Check theme functionality
  if (darkToggle) {
    console.log(
      "Dark theme current state:",
      document.body.classList.contains("dark") ? "DARK" : "LIGHT"
    );
  }

  // Check mobile nav functionality
  if (mobileToggle) {
    const sidebar = document.querySelector(".sidebar");
    console.log("Mobile sidebar element:", sidebar ? "FOUND" : "MISSING");
  }

  console.log("=== End Diagnostics ===");
}

// Run diagnostics after everything should be initialized
setTimeout(performInitializationDiagnostics, 3000);
