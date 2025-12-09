# Mortal Plugins · Payment Checkout Template

This repository contains a ready-made payment checkout page that you can drop
into your project and wire up to your own payment gateway (Stripe, Braintree,
PayPal, your own API, etc.).

All styling, layout, and basic browser-side validation are already handled.  
You only need to hook the **Pay now** button into your backend/payment logic.

---

## 1. Tech stack

- **HTML** – Structure and layout (`index.html`)
- **CSS** – Styling, animations, and theme (`assets/css/checkout.css`)
- **JavaScript (vanilla)** – Price toggle, validation, and demo behaviour
  (`assets/js/checkout.js`)

No frameworks are required.

---

## 2. File & folder structure

```text
payment-checkout/
├─ index.html                      # Main checkout page
├─ assets/
│  ├─ css/
│  │  └─ checkout.css             # All styles for the page
│  └─ js/
│     └─ checkout.js              # All front-end behaviour
└─ README.md                      # Documentation and usage notes
```

You can rename `payment-checkout` to match your own project name.

---

## 3. How to run locally

1. Download or clone this folder to your machine.
2. Open `index.html` in any modern browser (Chrome, Edge, Firefox, Safari).
3. You should see the full checkout page with:
   - Billing details form
   - Card details form
   - Monthly / yearly toggle
   - Order summary
   - Demo toast notification when clicking **Pay now**

No build step is required.

---

## 4. How the code is structured

### 4.1 `index.html`

- Contains the **markup only**.
- Links the stylesheet:

  ```html
  <link rel="stylesheet" href="assets/css/checkout.css" />
  ```

- Links the JavaScript:

  ```html
  <script src="assets/js/checkout.js" defer></script>
  ```

- Uses IDs such as `#payButton`, `#priceDisplay`, `#totalDisplay`, etc.,
  which the JavaScript file reads and updates.
- Contains a **Developer notes** section at the bottom-right of the layout,
  which explains how to integrate the checkout and how to contact the Mortal
  Plugins team.

If you are embedding this into an existing site, you can copy the main markup
from inside `<body>...</body>` and adjust the paths to CSS/JS.

---

### 4.2 `assets/css/checkout.css`

Key parts:

- Top-level CSS variables define theme and colours:

  ```css
  :root {
    --bg: #050816;
    --accent: #4f46e5;
    --text-main: #f9fafb;
    --text-muted: #9ca3af;
    /* etc... */
  }
  ```

  Changing these values lets you quickly retheme the checkout.

- Layout classes:
  - `.checkout-shell` – Outer container
  - `.main-layout` – Left-side form column
  - `.summary-panel` – Right-side order summary
- UI elements:
  - `.card` – Background cards
  - `.input-shell` / `.input-group` – Input wrappers
  - `.segment-btn` – Monthly / yearly toggle buttons
  - `.pay-button` – Primary call-to-action

You can safely adjust spacing, fonts, or colours in this file without
breaking the logic in `checkout.js`.

---

### 4.3 `assets/js/checkout.js`

Handles:

1. **Monthly / yearly toggle**

   - Uses `data-cadence="monthly"` / `data-cadence="yearly"` on the buttons.
   - Updates the price, period label, and summary text:

   ```js
   let cadence = "monthly";
   function updatePricing() {
     const monthlyPrice = 29;
     const yearlyPrice = 278;
     const price = cadence === "monthly" ? monthlyPrice : yearlyPrice;
     // updates DOM elements...
   }
   ```

   To change pricing, just adjust `monthlyPrice` and `yearlyPrice`.

2. **Input focus styling**

   - Adds `.focused` to `.input-shell` on focus so the CSS shows a strong focus
     ring.

3. **Basic front-end validation**

   - Checks that required fields are not empty.
   - Checks that email is in a valid format.
   - Shows a simple error message in `#errors` if something is missing.

   This is **not** a replacement for full server-side validation; you must
   validate again on the backend.

4. **Demo payment behaviour**

   - When **Pay now** is clicked:
     - If validation passes, the button shows “Processing…” briefly.
     - A toast appears saying:

       > Demo payment processed. Connect this button to your live gateway in code.

   - This is a placeholder. Replace it with your real gateway call in the
     `setTimeout` block.

---

## 5. How to connect to a payment gateway

Below is the general pattern. The exact code depends on which provider you use.

1. **Create a backend endpoint**, e.g.:

   - `/api/create-checkout-session`
   - `/api/charge`
   - or your existing order API.

2. **From `checkout.js`, replace the demo `setTimeout` with a `fetch` call**:

   ```js
   payButton.addEventListener("click", async (e) => {
     e.preventDefault();
     if (!validateForm()) return;

     payButton.disabled = true;
     payButton.innerHTML = "<span>Processing…</span>";

     try {
       const res = await fetch("/api/create-checkout-session", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({
           cadence,
           fullName: document.getElementById("fullName").value,
           email: document.getElementById("email").value,
         }),
       });

       const data = await res.json();

       // Example: redirect to Stripe Checkout or your own payment URL
       if (data.url) {
         window.location.href = data.url;
       } else {
         showToast("Payment endpoint responded without a redirect URL.");
       }
     } catch (err) {
       showToast("Something went wrong. Please try again.");
     } finally {
       payButton.disabled = false;
       payButton.innerHTML =
         '<span>Pay now</span><span class="kbd">Enter</span>';
     }
   });
   ```

3. **On the backend**, integrate with Stripe/Braintree/PayPal/etc.

4. **Use webhooks** from your provider to confirm successful payments and
   activate subscriptions, send emails, etc.

If you do not want to write the integration yourself, reach out to the
Mortal Plugins team (see Support section).

---

## 6. How to customise text, prices, and design

### 6.1 Change plan name and price

In `index.html`:

```html
<div class="plan-name" id="planName">Pro Workspace</div>
```

Change `"Pro Workspace"` to your own plan name.

In `assets/js/checkout.js`:

```js
const monthlyPrice = 29;
const yearlyPrice = 278;
```

Change these numbers to your own monthly and yearly prices.

---

### 6.2 Change colours and theme

In `assets/css/checkout.css`, edit the variables in `:root`:

```css
:root {
  --bg: #050816;
  --accent: #4f46e5;
  --text-main: #f9fafb;
  --text-muted: #9ca3af;
}
```

You can switch to your branding colours here.

---

### 6.3 Edit text/wording

All visible text (headings, descriptions, button labels, etc.) is inside
`index.html`. Search for the text you want to change and update it directly.

Examples:

- Main title: `<h1>Complete your secure payment</h1>`
- Guarantee line: `14-day refund guarantee` (adjust to your own policy).
- Developer notes copy if you want to adapt it to your workflows.

---

## 7. Support · Mortal Plugins

If you want help:

- Integrating this template into your own site or framework  
- Wiring it into Stripe, Braintree, PayPal, or a custom gateway  
- Extending it with more features (coupons, add-ons, usage-based billing, etc.)

Contact the **Mortal Plugins** team:

- Discord: <https://discord.gg/dKbvtafN5E>

Open a ticket there and include a short description of your stack and use case.

---

## 8. How to remove this checkout from a project

If a user or client wants this checkout removed, follow these steps.

### 8.1 If the checkout is used as a standalone page

1. Delete or archive the entire `payment-checkout` folder.
2. Remove any links or buttons in your main site that point to this page
   (for example `/checkout` or `/payment` routes).

This fully removes the checkout UI and code.

### 8.2 If you embedded the layout into an existing page

1. Open the page where you pasted the checkout HTML.
2. Remove the main wrapper and everything inside it:

   ```html
   <div class="checkout-shell" id="checkout-root">
     <!-- remove everything from here... -->
   </div>
   <!-- ...to here -->
   ```

3. Remove the stylesheet and script references for this checkout:

   ```html
   <!-- Remove these lines if they are only used for this checkout -->
   <link rel="stylesheet" href="assets/css/checkout.css" />
   <script src="assets/js/checkout.js" defer></script>
   ```

4. If `assets/css/checkout.css` and `assets/js/checkout.js` are not used
   anywhere else in your project, remove those files and their parent folders.

### 8.3 Cache / build considerations

- If you are using a bundler or build system (Webpack, Vite, Laravel Mix,
  etc.), make sure you re-run your build after removing the files so that
  old assets are dropped from the compiled output.
- If your site uses a CDN or aggressive caching, purge the cache so the
  old checkout is no longer served.

After these steps, the checkout and all its code will be completely removed
from your project.
