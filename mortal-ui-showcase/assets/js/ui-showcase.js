// Mortal Plugins · UI & CSS Showcase
// This file holds all interactive hooks for the template.
// Extend or replace them with your own behaviour as needed.

// Navigation pills: switch visible section
const navPills = document.querySelectorAll(".nav-pill");
const panels = document.querySelectorAll(".panel");

navPills.forEach((pill) => {
  pill.addEventListener("click", () => {
    const targetId = pill.dataset.target;
    // Update active pill
    navPills.forEach((p) => p.classList.remove("active"));
    pill.classList.add("active");

    // Scroll to the corresponding panel
    const targetPanel = document.getElementById(targetId);
    if (targetPanel) {
      targetPanel.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// Toggles: simple on/off visual state
const toggles = document.querySelectorAll(".toggle");
toggles.forEach((toggle) => {
  toggle.addEventListener("click", () => {
    toggle.classList.toggle("is-on");

    // Example: hook into theme toggle or feature flag
    const key = toggle.dataset.toggle;
    if (!key) return;

    // Placeholder for your logic:
    // if (key === "theme") { ... }
    // console.log(`Toggle changed: ${key}, isOn = ${toggle.classList.contains("is-on")}`);
  });
});

// Sliders: show live values next to range inputs
const sliderRows = document.querySelectorAll(".slider-row");
sliderRows.forEach((row) => {
  const range = row.querySelector('input[type="range"]');
  const valueEl = row.querySelector(".slider-value");
  if (!range || !valueEl) return;

  const sync = () => {
    valueEl.textContent = range.value;
  };

  sync();
  range.addEventListener("input", sync);
});

// Example theme hooks (optional)
// Add your own JS for dynamic theming, animations, or live previews below.

// function setRadius(value) {
//   document.documentElement.style.setProperty("--radius-lg", value + "px");
// }

// function setBlur(value) {
//   document.documentElement.style.setProperty("--shadow-soft", `0 18px ${value}px rgba(0, 0, 0, 0.5)`);
// }
