
(() => {
  "use strict";

  const header = document.querySelector(".header");
  const menu = document.querySelector(".menu");
  const nav = document.querySelector("#navigation");
  const topButton = document.querySelector(".top");
  const navLinks = [...document.querySelectorAll(".header nav a[href^='#']")];
  const sections = [...document.querySelectorAll("main section[id]")];

  // Current year in the footer
  const year = document.querySelector("#year");
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // Mobile navigation
  function closeMenu() {
    nav?.classList.remove("open");
    menu?.setAttribute("aria-expanded", "false");

    if (menu) {
      menu.textContent = "☰";
      menu.setAttribute("aria-label", "Open navigation menu");
    }
  }

  menu?.addEventListener("click", () => {
    const isOpen = menu.getAttribute("aria-expanded") !== "true";

    menu.setAttribute("aria-expanded", String(isOpen));
    menu.textContent = isOpen ? "×" : "☰";
    menu.setAttribute(
      "aria-label",
      isOpen ? "Close navigation menu" : "Open navigation menu"
    );

    nav?.classList.toggle("open", isOpen);
  });

  navLinks.forEach(link => {
    link.addEventListener("click", closeMenu);
  });

  // Close menu with Escape
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  // Header and back-to-top button
  function updateScrollState() {
    const scrollPosition = window.scrollY;

    header?.classList.toggle("scrolled", scrollPosition > 24);
    topButton?.classList.toggle("show", scrollPosition > 450);
  }

  window.addEventListener("scroll", updateScrollState, {
    passive: true
  });

  updateScrollState();

  topButton?.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth"
    });
  });

  // Animate sections when they enter the viewport
  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.08,
      rootMargin: "0px 0px -25px 0px"
    });

    revealElements.forEach(element => {
      revealObserver.observe(element);
    });

    // Highlight the current navigation section
    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => {
            const isActive =
              link.getAttribute("href") === `#${entry.target.id}`;

            link.classList.toggle("active", isActive);
          });
        }
      });
    }, {
      rootMargin: "-30% 0px -60% 0px"
    });

    sections.forEach(section => {
      sectionObserver.observe(section);
    });
  } else {
    revealElements.forEach(element => {
      element.classList.add("visible");
    });
  }

  // Close mobile menu if the screen is resized to desktop
  window.addEventListener("resize", () => {
    if (window.innerWidth > 760) {
      closeMenu();
    }
  });
})();
