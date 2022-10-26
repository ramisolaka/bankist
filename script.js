// navbar toggler
document.querySelector(".navbar__toggler").addEventListener("click", function (evt) {
    document.querySelector(".navbar__content").classList.toggle("navbar__content--active");
});

// smooth scrolling
document.querySelectorAll(".navbar__link").forEach((link) =>
    link.addEventListener("click", function (evt) {
        evt.preventDefault();

        const ID = evt.target.getAttribute("href");
        document.querySelector(ID).scrollIntoView({ behavior: "smooth" });
    })
);

// sticky navbar
const navbarObserver = new IntersectionObserver(stikyNavbar, { root: null, rootMargin: "900px", threshold: 1 });
navbarObserver.observe(document.querySelector(".header"));

function stikyNavbar([thresholds], observe) {
    if (thresholds.isIntersecting) document.querySelector(".navbar").classList.remove("navbar__stikcy");
    else document.querySelector(".navbar").classList.add("navbar__stikcy");
}

// sections animations
const observer = new IntersectionObserver(sectionObserver);

document.querySelectorAll(".section").forEach((section) => observer.observe(section));

function sectionObserver([thresholds], observer) {
    if (thresholds.isIntersecting === false) return;
    // remove the class from the section.
    thresholds.target.classList.remove("section__hidden");
    // stop the observer from the images, to prevent it from running in the background.
    observer.unobserve(thresholds.target);
}

// image animations
const imageObserver = new IntersectionObserver(lazyImages, { root: null, threshold: "10px", threshold: 1 });
document.querySelectorAll(".features__image").forEach((image) => imageObserver.observe(image));

function lazyImages([thresholds], observer) {
    if (thresholds.isIntersecting === false) return;

    // replace the image lazy url with dataset url
    thresholds.target.src = thresholds.target.dataset.src;
    // when images are fully loaded remove the class from the image
    thresholds.target.addEventListener("load", () => thresholds.target.classList.remove("lazy_image"));
    // stop the observer from the images, prevent from running in the background
    observer.unobserve(thresholds.target);
}

// tap operations
document.querySelector(".operations__tab-container").addEventListener("click", function (evt) {
    // select the button from the parent element.
    const button = evt.target.closest("button");
    // return nothing when user clicks on the buttons parent elements.
    if (!button) return;
    // loop over all the tapped buttons and remove ACTIVE class from all.
    document.querySelectorAll(".operations__tab").forEach((tap) => tap.classList.remove("operations__tab--active"));
    // add ACTIVE class to the clicked button.
    evt.target.classList.add("operations__tab--active");

    const id = +button.dataset.tab;
    // loop over operations content and remove ACTIVE class from all.
    document.querySelectorAll(".operations__content").forEach((content) => content.classList.remove("operations__content--active"));
    // add ACTIVE class to the clicked contetn.
    document.querySelector(`.operations__content--${id}`).classList.add("operations__content--active");
});

// slider animations
let SLIDER_LENGTH = document.querySelectorAll(".slide").length - 2;

document.querySelector(".slider").addEventListener("click", function (evt) {
    if (evt.target.classList[1] !== "slider__btn--right" && evt.target.classList[1] !== "slider__btn--left" && evt.target.classList[0] !== "dots__dot") return;

    if (evt.target.classList[1] === "slider__btn--right") SLIDER_LENGTH >= 3 ? (SLIDER_LENGTH = 1) : SLIDER_LENGTH++;

    if (evt.target.classList[1] === "slider__btn--left") SLIDER_LENGTH <= 1 ? (SLIDER_LENGTH = 3) : SLIDER_LENGTH--;

    if (evt.target.classList[0] === "dots__dot") SLIDER_LENGTH = evt.target.dataset.slide;

    document.querySelectorAll(".slide").forEach((slide) => slide.classList.remove("slide__active"));

    document.querySelectorAll(".slide")[SLIDER_LENGTH - 1].classList.add("slide__active");

    document.querySelectorAll(".dots__dot").forEach((dot) => dot.classList.remove("dots__dot--active"));

    document.querySelectorAll(".dots__dot")[SLIDER_LENGTH - 1].classList.add("dots__dot--active");
});
