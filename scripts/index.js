const header = document.querySelector(".header");
const hero = document.querySelector(".hero");
const specialOffer = document.querySelector(".special-offer");

const slider = document.querySelector(".products-slider");
const prevBtn = document.querySelector("#products-prev");
const nextBtn = document.querySelector("#products-next");

const scrollScope = 50;

let ticking = false;
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

slider.addEventListener("scroll", updateArrows, { passive: true });
window.addEventListener("resize", updateArrows);
