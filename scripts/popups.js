const names = [
  "Анна",
  "Мария",
  "Екатерина",
  "Алина",
  "Ольга",
  "Дарья",
  "София",
  "Полина",
  "Виктория",
  "Наталья",
];

const purchase = [
  "Hydra Cream",
  "Glow Serum",
  "Pure Mask",
  "Soft Touch",
  "Daily Care",
  "Glow Ritual",
  "Luna Premium",
];

const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];

const purchasePopup = document.querySelector("#popup-purchase");
const registrPopup = document.querySelector("#popup-registr");

const participantsCountEl = document.querySelector(
  ".giveaway-countdown__text span",
);
const participantsProgressEl = document.querySelector(
  ".giveaway-participants__progress",
);

let participants = Number(participantsCountEl.textContent);
const participantsMax = Number(participantsProgressEl.max);

function incrementParticipants() {
  if (participants >= participantsMax) return;

  participants += 1;
  participantsCountEl.textContent = participants;
  participantsProgressEl.value = participants;
}

function fillPurchasePopup() {
  const nameEl = purchasePopup.querySelector(".popup__user-name");
  const productEl = purchasePopup.querySelector(".popup__user-purchase span");
  nameEl.textContent = rand(names);
  productEl.textContent = rand(purchase);
}

function fillRegistrPopup() {
  const nameEl = registrPopup.querySelector(".popup__user-name");
  nameEl.textContent = rand(names);
}

function showPopup(popup) {
  popup.classList.add("popup--visible");
  hideAfter(popup, 5000);
}

function hidePopup(popup) {
  popup.classList.remove("popup--visible");
}

let hideTimer;
function hideAfter(popup, ms) {
  clearTimeout(hideTimer);
  hideTimer = setTimeout(() => hidePopup(popup), ms);
}

document.querySelectorAll(".popup-close").forEach((btn) => {
  btn.addEventListener("click", () => {
    const popup = btn.closest(".popup");
    hidePopup(popup);
    clearTimeout(hideTimer);
  });
});

function showRegistrPopup() {
  fillRegistrPopup();
  showPopup(registrPopup);
  incrementParticipants();
}

const minInterval = 15000;
const maxInterval = 30000;

function scheduleNextPopup() {
  const delay = minInterval + Math.random() * (maxInterval - minInterval);

  setTimeout(() => {
    const isPurchase = Math.random() < 0.5;

    if (isPurchase) {
      fillPurchasePopup();
      showPopup(purchasePopup);
    } else {
      showRegistrPopup();
    }

    scheduleNextPopup();
  }, delay);
}

setTimeout(() => {
  fillPurchasePopup();
  showPopup(purchasePopup);
  scheduleNextPopup();
}, 5000);