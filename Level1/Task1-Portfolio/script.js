/*
  script.js — simplified interactions for the local portfolio
  - Theme toggle (localStorage)
  - Mobile menu open/close
  - Scroll-to-top visibility + action
  - Smooth anchor scrolling
  - Lightweight, low-cost particle background (optional)
  - Safe AOS initialization
*/

(function () {
  "use strict";

  const $ = (s) => document.querySelector(s);
  const $$ = (s) => Array.from(document.querySelectorAll(s));

  document.addEventListener("DOMContentLoaded", () => {
    // --- Theme toggle (simple, safe) ---
    const themeToggle = $("#theme-toggle");
    const sunIcon = $("#sun-icon");
    const moonIcon = $("#moon-icon");
    const body = document.body;

    const savedTheme = localStorage.getItem("theme") || "dark";
    if (savedTheme === "light") {
      body.classList.add("light-theme");
      if (sunIcon) sunIcon.classList.add("hidden");
      if (moonIcon) moonIcon.classList.remove("hidden");
    }

    if (themeToggle) {
      themeToggle.addEventListener("click", () => {
        const isLight = body.classList.toggle("light-theme");
        localStorage.setItem("theme", isLight ? "light" : "dark");
        if (sunIcon) sunIcon.classList.toggle("hidden");
        if (moonIcon) moonIcon.classList.toggle("hidden");
      });
    }

    // --- Mobile menu (open / close) ---
    const mobileBtn = $("#mobile-menu-button");
    const mobileMenu = $("#mobile-menu");
    const closeBtn = $("#close-menu");
    const mobileLinks = $$(".mobile-nav-link");

    function openMenu() {
      if (!mobileMenu) return;
      mobileMenu.classList.remove("hidden");
      mobileMenu.classList.remove("-translate-x-full");
      document.body.style.overflow = "hidden";
    }

    function closeMenu() {
      if (!mobileMenu) return;
      mobileMenu.classList.add("-translate-x-full");
      document.body.style.overflow = "";
      setTimeout(() => mobileMenu.classList.add("hidden"), 220);
    }

    if (mobileBtn) mobileBtn.addEventListener("click", openMenu);
    if (closeBtn) closeBtn.addEventListener("click", closeMenu);
    mobileLinks.forEach((l) => l.addEventListener("click", closeMenu));

    // Close menu when clicking outside (safe guards)
    document.addEventListener("click", (e) => {
      if (!mobileMenu || !mobileBtn) return;
      if (!mobileMenu.contains(e.target) && !mobileBtn.contains(e.target)) {
        closeMenu();
      }
    });

    // --- Scroll-to-top button ---
    const scrollBtn = $("#scroll-to-top");
    function updateScrollButton() {
      if (!scrollBtn) return;
      if (window.scrollY > 300) {
        scrollBtn.classList.remove("translate-y-20", "opacity-0");
        scrollBtn.classList.add("translate-y-0", "opacity-100");
      } else {
        scrollBtn.classList.add("translate-y-20", "opacity-0");
        scrollBtn.classList.remove("translate-y-0", "opacity-100");
      }
    }
    updateScrollButton();
    window.addEventListener("scroll", updateScrollButton);
    if (scrollBtn)
      scrollBtn.addEventListener("click", () =>
        window.scrollTo({ top: 0, behavior: "smooth" }),
      );

    // --- Smooth anchor scrolling ---
    $$('a[href^="#"]').forEach((a) => {
      a.addEventListener("click", function (e) {
        const href = this.getAttribute("href");
        if (!href || href === "#") return;
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth", block: "start" });
          closeMenu();
        }
      });
    });

    // --- Initialize AOS (if present) ---
    if (window.AOS && typeof AOS.init === "function") {
      AOS.init({ duration: 800, once: true });
    }

    // --- Lightweight particle background (optional, low-cost) ---
    const canvas = document.getElementById("particle-canvas");
    if (canvas && canvas.getContext) {
      const ctx = canvas.getContext("2d");
      let w = window.innerWidth;
      let h = window.innerHeight;
      function resize() {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
      }

      class Particle {
        constructor() {
          this.x = Math.random() * w;
          this.y = Math.random() * h;
          this.vx = (Math.random() - 0.5) * 0.3;
          this.vy = (Math.random() - 0.5) * 0.3;
          this.r = Math.random() * 1.2 + 0.3;
        }
        update() {
          this.x += this.vx;
          this.y += this.vy;
          if (this.x < 0) this.x = w;
          if (this.x > w) this.x = 0;
          if (this.y < 0) this.y = h;
          if (this.y > h) this.y = 0;
        }
        draw() {
          ctx.fillStyle = "rgba(34,211,238,0.9)";
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      let particles = [];
      function initParticles() {
        resize();
        const count = window.innerWidth < 768 ? 12 : 40;
        particles = Array.from({ length: count }, () => new Particle());
      }
      function loop() {
        ctx.clearRect(0, 0, w, h);
        particles.forEach((p) => {
          p.update();
          p.draw();
        });
        requestAnimationFrame(loop);
      }
      initParticles();
      loop();
      window.addEventListener("resize", initParticles);
    }
  });
})();
/*
 * script.js — simplified for clarity
 * Features kept: theme toggle, mobile menu, smooth anchor scrolling,
 * scroll-to-top button, navbar shrink, AOS init (if present).
 */

(function () {
  "use strict";

  const qs = (s) => document.querySelector(s);
  const qsa = (s) => Array.from(document.querySelectorAll(s));
  const THEME_KEY = "theme";

  function setTheme(light) {
    if (light) {
      document.body.classList.add("light-theme");
      const sun = qs("#sun-icon");
      const moon = qs("#moon-icon");
      if (sun) sun.classList.add("hidden");
      if (moon) moon.classList.remove("hidden");
      localStorage.setItem(THEME_KEY, "light");
    } else {
      document.body.classList.remove("light-theme");
      const sun = qs("#sun-icon");
      const moon = qs("#moon-icon");
      if (sun) sun.classList.remove("hidden");
      if (moon) moon.classList.add("hidden");
      localStorage.setItem(THEME_KEY, "dark");
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    // Initialize theme from storage
    const stored = localStorage.getItem(THEME_KEY);
    setTheme(stored === "light");

    // Theme toggle
    const themeToggle = qs("#theme-toggle");
    if (themeToggle) {
      themeToggle.addEventListener("click", function () {
        setTheme(!document.body.classList.contains("light-theme"));
      });
    }

    // Mobile menu
    const mobileMenu = qs("#mobile-menu");
    const menuBtn = qs("#mobile-menu-button");
    const closeBtn = qs("#close-menu");

    function openMenu() {
      if (!mobileMenu) return;
      mobileMenu.classList.remove("hidden");
      mobileMenu.classList.remove("-translate-x-full");
      document.body.style.overflow = "hidden";
    }

    function closeMenu() {
      if (!mobileMenu) return;
      mobileMenu.classList.add("-translate-x-full");
      document.body.style.overflow = "";
      setTimeout(() => mobileMenu.classList.add("hidden"), 300);
    }

    if (menuBtn) menuBtn.addEventListener("click", openMenu);
    if (closeBtn) closeBtn.addEventListener("click", closeMenu);
    qsa(".mobile-nav-link").forEach((el) =>
      el.addEventListener("click", closeMenu),
    );

    // Smooth scroll for internal anchors
    qsa('a[href^="#"]').forEach((a) => {
      a.addEventListener("click", function (e) {
        const href = this.getAttribute("href");
        if (!href || href === "#") return;
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    });

    // Scroll-to-top button
    const scrollBtn = qs("#scroll-to-top");
    function updateScrollBtn() {
      if (!scrollBtn) return;
      if (window.scrollY > 300) {
        scrollBtn.classList.remove("translate-y-20", "opacity-0");
        scrollBtn.classList.add("translate-y-0", "opacity-100");
      } else {
        scrollBtn.classList.add("translate-y-20", "opacity-0");
        scrollBtn.classList.remove("translate-y-0", "opacity-100");
      }
    }
    updateScrollBtn();
    window.addEventListener("scroll", updateScrollBtn);
    if (scrollBtn)
      scrollBtn.addEventListener("click", () =>
        window.scrollTo({ top: 0, behavior: "smooth" }),
      );

    // Navbar shrink on scroll
    const navbar = qs("#navbar");
    function updateNavbar() {
      if (!navbar) return;
      if (window.scrollY > 50) {
        navbar.classList.add("glass-nav", "py-4");
        navbar.classList.remove("py-6");
      } else {
        navbar.classList.remove("glass-nav", "py-4");
        navbar.classList.add("py-6");
      }
    }
    updateNavbar();
    window.addEventListener("scroll", updateNavbar);

    // Initialize AOS if available
    if (window.AOS && typeof window.AOS.init === "function") {
      window.AOS.init({ duration: 800, once: true });
    }
  });
})();
