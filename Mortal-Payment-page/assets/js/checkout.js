const segmentButtons = document.querySelectorAll(".segment-btn");
const priceDisplay = document.getElementById("priceDisplay");
const metaLine = document.getElementById("metaLine");
const basePrice = document.getElementById("basePrice");
const totalDisplay = document.getElementById("totalDisplay");
const payButton = document.getElementById("payButton");
const errorsEl = document.getElementById("errors");
const toast = document.getElementById("toast");
const toastMessage = document.getElementById("toastMessage");
const toastDismiss = document.querySelector(".toast-dismiss");

let cadence = "monthly";

function formatCurrency(amount) {
  return "$" + amount.toFixed(2);
}

function updatePricing() {
  const monthlyPrice = 29;
  const yearlyPrice = 278; // 20% discount vs 12 * 29 = 348
  const price = cadence === "monthly" ? monthlyPrice : yearlyPrice;
  const periodLabel = cadence === "monthly" ? "/month" : "/year";
  const meta =
    cadence === "monthly"
      ? "Billed monthly · cancel anytime"
      : "One charge per year · save ~20%";

  priceDisplay.innerHTML = `${formatCurrency(
    price
  )}<span class="period">${periodLabel}</span>`;
  basePrice.textContent = formatCurrency(price);
  totalDisplay.textContent = formatCurrency(price);
  metaLine.textContent = meta;
}

segmentButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    segmentButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    cadence = btn.dataset.cadence;
    updatePricing();
  });
});

// Initialise with default cadence
updatePricing();

// Input focus styling
const focusableShells = document.querySelectorAll(
  ".input-shell input, .input-shell select"
);
focusableShells.forEach((field) => {
  const shell = field.closest(".input-shell");
  field.addEventListener("focus", () => shell.classList.add("focused"));
  field.addEventListener("blur", () => shell.classList.remove("focused"));
});

function validateForm() {
  const requiredIds = [
    "fullName",
    "email",
    "cardNumber",
    "exp",
    "cvc",
    "nameOnCard",
  ];
  const missing = [];

  requiredIds.forEach((id) => {
    const el = document.getElementById(id);
    if (!el || !el.value.trim()) {
      missing.push(id);
    }
  });

  if (missing.length) {
    errorsEl.textContent =
      "Fill in all required fields before you continue with payment.";
    errorsEl.classList.add("visible");
    return false;
  }

  const email = document.getElementById("email").value.trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errorsEl.textContent =
      "Enter a valid email address so the system can send the receipt.";
    errorsEl.classList.add("visible");
    return false;
  }

  errorsEl.classList.remove("visible");
  return true;
}

function showToast(message) {
  toastMessage.textContent = message;
  toast.classList.add("visible");
  clearTimeout(showToast._timeout);
  showToast._timeout = setTimeout(() => {
    toast.classList.remove("visible");
  }, 4200);
}

toastDismiss.addEventListener("click", () => {
  toast.classList.remove("visible");
});

payButton.addEventListener("click", (e) => {
  e.preventDefault();
  if (!validateForm()) return;

  payButton.disabled = true;
  payButton.innerHTML = "<span>Processing…</span>";

  // Demo behaviour only: replace this with a call to your gateway
  setTimeout(() => {
    payButton.disabled = false;
    payButton.innerHTML = '<span>Pay now</span><span class="kbd">Enter</span>';
    showToast(
      "Demo payment processed. Connect this button to your live gateway in code."
    );
  }, 1400);
});

// Pressing Enter on a form field should trigger the payment
document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const activeElement = document.activeElement;
    if (activeElement && ["INPUT", "SELECT"].includes(activeElement.tagName)) {
      event.preventDefault();
      payButton.click();
    }
  }
});
