const header = document.querySelector(".header");
const hero = document.querySelector(".hero");
const specialOffer = document.querySelector(".special-offer");
const scrollScope = 50;
let ticking = false;

const slider = document.querySelector(".products-slider");
const prevBtn = document.querySelector("#products-prev");
const nextBtn = document.querySelector("#products-next");

const deadline = new Date("2026-11-31T23:59:59");
const offerCountdown = document.querySelector(".special-offer__countdown");
const dayEl = document.querySelector("#countdown-day h4");
const hourEl = document.querySelector("#countdown-hour h4");
const minuteEl = document.querySelector("#countdown-minute h4");
const secondEl = document.querySelector("#countdown-second h4");

const pad = (n) => String(n).padStart(2, "0");
/* Фиксированный хедер со специальным предложением */
function onScroll() {
  if (ticking) return;
  ticking = true;

  requestAnimationFrame(() => {
    header.classList.toggle("header--scrolled", window.scrollY > scrollScope);

    if (hero && specialOffer) {
      const heroBottom = hero.getBoundingClientRect().bottom;
      specialOffer.classList.toggle("special-offer--fixed", heroBottom <= 58);
    }

    ticking = false;
  });
}

window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

/* Слайдер */
function getStep() {
  const product = slider.querySelector(".product");
  const gap = parseFloat(getComputedStyle(slider).columnGap) || 0;
  return product.offsetWidth + gap;
}

prevBtn.addEventListener("click", () => {
  slider.scrollBy({ left: -getStep(), behavior: "smooth" });
});

nextBtn.addEventListener("click", () => {
  slider.scrollBy({ left: getStep(), behavior: "smooth" });
});




/* Таймер */
function getTimeLeft() {
  const diff = deadline - Date.now();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    done: false,
  };
}

function render() {
  const { days, hours, minutes, seconds, done } = getTimeLeft();

  if (offerCountdown) {
    offerCountdown.textContent =
      `${pad(days)} : ${pad(hours)} : ${pad(minutes)} : ${pad(seconds)}`;
  }

  if (dayEl) dayEl.textContent = pad(days);
  if (hourEl) hourEl.textContent = pad(hours);
  if (minuteEl) minuteEl.textContent = pad(minutes);
  if (secondEl) secondEl.textContent = pad(seconds);

  return done;
}

render();

const intervalId = setInterval(() => {
  const done = render();
  if (done) clearInterval(intervalId);
}, 1000);