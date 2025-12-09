# Mortal Plugins · UI & CSS Showcase Template

This template is a design-first single-page UI gallery.  
It is built to show off **CSS, components, and layouts** with minimal HTML and ready-to-extend JavaScript.

Use it as a standalone demo page, a style guide, or a starting point for a design system.

---

## 1. Stack & structure

**Tech:**

- HTML (single page)
- CSS (one file, token-based theme)
- Vanilla JavaScript (simple hooks only)

**Folder layout:**

```text
mortal-ui-showcase/
├─ index.html                # Main page
├─ assets/
│  ├─ css/
│  │  └─ ui-showcase.css     # Styles, tokens, components, layouts
│  └─ js/
│     └─ ui-showcase.js      # Navigation, toggles, sliders hooks
└─ README.md                 # This file
```

No frameworks or build steps are required.

---

## 2. What the page contains

### 2.1 Sections

The page has four main sections, each with its own `<section>` and ID:

1. `hero` – Introduction and hero visual
2. `components` – Component gallery (buttons, badges, cards, toggles, typography, colours)
3. `layouts` – Layout samples (dashboard row, cards stripe, split hero)
4. `dev-notes` – Developer notes and support info

The navigation pills in the header scroll to these sections.

---

### 2.2 Components included

Inside **Components** you will find:

- Buttons: primary, outline, soft, danger, ghost, chip variants
- Badges & tags: status styles (new, stable, beta, deprecated, etc.)
- List cards: hover and selected states
- Toggles & sliders: shells for interactive components
- Typography scale: eyebrow, title, body, caption
- Colour tokens grid: a quick visual map of key theme variables

These are all styled in `ui-showcase.css` and can be edited or replaced freely.

---

## 3. CSS: tokens and theming

At the top of `assets/css/ui-showcase.css` you will find the core tokens:

```css
:root {
  --bg: #020617;
  --bg-alt: #0b1120;
  --surface: #020617;
  --surface-soft: #020617;
  --accent: #38bdf8;
  --accent-soft: rgba(56, 189, 248, 0.18);
  --accent-strong: #0ea5e9;
  --danger: #f97373;
  --warning: #facc15;
  --success: #22c55e;
  --text-main: #f9fafb;
  --text-muted: #9ca3af;
  --border-subtle: #1f2937;
  --radius-lg: 18px;
  --radius-md: 12px;
  --radius-pill: 999px;
  /* ... */
}
```

Change these values to retheme the entire page:

- **Colours** – `--accent`, `--success`, `--danger`, etc.
- **Radii** – `--radius-lg`, `--radius-md`, `--radius-pill`
- **Shadows** – `--shadow-soft`, `--shadow-subtle`

Everything underneath uses these tokens so you do not need to hunt through the file.

---

## 4. JavaScript: ready-to-code hooks

All JS is in `assets/js/ui-showcase.js`.

Included behaviours:

1. **Navigation pills**

   ```js
   const navPills = document.querySelectorAll(".nav-pill");
   navPills.forEach((pill) => {
     pill.addEventListener("click", () => {
       const targetId = pill.dataset.target;
       // scroll into view
     });
   });
   ```

   Each pill has `data-target="hero"`, `data-target="components"`, etc.

2. **Toggles**

   ```js
   const toggles = document.querySelectorAll(".toggle");
   toggles.forEach((toggle) => {
     toggle.addEventListener("click", () => {
       toggle.classList.toggle("is-on");
       const key = toggle.dataset.toggle;
       // add your own behaviour here
     });
   });
   ```

   Use `data-toggle="theme"` or any key you want, then implement your logic.

3. **Sliders**

   ```js
   const sliderRows = document.querySelectorAll(".slider-row");
   sliderRows.forEach((row) => {
     const range = row.querySelector('input[type="range"]');
     const valueEl = row.querySelector(".slider-value");
     // updates text as slider moves
   });
   ```

   You can wire these directly into CSS variables (live theming) if you want.

The bottom of the file includes commented-out examples for theme changes.  
You can un-comment and adapt them to control border radii, shadows, etc.

---

## 5. How to use / customise

### 5.1 Run locally

1. Place the `mortal-ui-showcase` folder anywhere on your machine.
2. Open `index.html` in a modern browser.
3. Scroll around to view all components and layouts.

No tooling or server is needed.

---

### 5.2 Swap styles

- To match your brand, update the tokens in `:root`.
- To change a component, edit the relevant section:
  - Buttons: look for `/* Buttons */` in the CSS.
  - Component cards: `/* Component grid */`.
  - Layout cards: `/* Layouts */`.

You can also remove whole blocks you do not need and keep only the patterns you use.

---

### 5.3 Add your own components

1. In `index.html`, within the `<section id="components">` element,
   duplicate one of the existing `<article class="component-card">…</article>`.
2. Rename the labels and drop in your own markup.
3. Style it in `ui-showcase.css` by targeting a new class name.

---

## 6. Support · Mortal Plugins

If you need help:

- Integrating this template into a bigger project  
- Turning it into a full design system or documentation site  
- Extending it with live previews, theme pickers, or interactive demos

Contact the **Mortal Plugins** team:

- Discord: https://discord.gg/dKbvtafN5E

Open a ticket and include a short description of your stack and use case.

---

## 7. How to remove this template from a project

If this page is embedded into a larger site and you want to remove it:

1. Delete or remove references to `index.html` (or the route serving it).
2. Remove the stylesheet and script includes if they are only used here:

   ```html
   <link rel="stylesheet" href="assets/css/ui-showcase.css" />
   <script src="assets/js/ui-showcase.js" defer></script>
   ```

3. Delete `assets/css/ui-showcase.css` and `assets/js/ui-showcase.js`
   if no other pages depend on them.

If you used any of the CSS classes on other pages, either keep the file
or move those rules into your main stylesheet before deleting this folder.
