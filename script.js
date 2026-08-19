const GOOGLE_FORM_ACTION = "https://docs.google.com/forms/d/e/1FAIpQLSeGb542cQbc69Os1tCDwvO400-iaq2u5dWi4uhiuwf_9Msr4g/formResponse";
const SKOOL_URL = "https://www.skool.com/the-footballers-blueprint-8160/about";

const signupForm = document.getElementById("signup-form");

if (signupForm) {
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const status = document.getElementById("signup-status");
    const submitBtn = signupForm.querySelector(".signup-submit");
    const formData = new FormData(signupForm);

    submitBtn.disabled = true;
    submitBtn.textContent = "Submitting…";

    try {
      await fetch(GOOGLE_FORM_ACTION, {
        method: "POST",
        mode: "no-cors",
        body: formData,
      });
      status.textContent = "Thanks — redirecting you to Skool to start your free 7-day trial…";
      status.classList.add("success");
      signupForm.reset();
      setTimeout(() => {
        window.location.href = SKOOL_URL;
      }, 1500);
    } catch (err) {
      status.textContent = "Something went wrong. Please try again.";
      status.classList.add("error");
      submitBtn.disabled = false;
      submitBtn.textContent = "Submit";
    }
  });
}

const carouselTrack = document.getElementById("carousel-track");

if (carouselTrack) {
  const slides = Array.from(carouselTrack.children);
  const prevBtn = document.getElementById("carousel-prev");
  const nextBtn = document.getElementById("carousel-next");
  const dotsWrap = document.getElementById("carousel-dots");
  let current = 0;

  slides.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "carousel-dot";
    dot.setAttribute("aria-label", `Go to story ${i + 1}`);
    dot.addEventListener("click", () => goTo(i));
    dotsWrap.appendChild(dot);
  });
  const dots = Array.from(dotsWrap.children);

  function render() {
    carouselTrack.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((dot, i) => dot.classList.toggle("active", i === current));
    prevBtn.disabled = slides.length <= 1;
    nextBtn.disabled = slides.length <= 1;
  }

  function goTo(index) {
    current = (index + slides.length) % slides.length;
    render();
  }

  prevBtn.addEventListener("click", () => goTo(current - 1));
  nextBtn.addEventListener("click", () => goTo(current + 1));

  render();
}

const navToggle = document.getElementById("nav-toggle");
const siteNav = document.getElementById("site-nav");

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const revealEls = document.querySelectorAll(".reveal");

if (revealEls.length && "IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealEls.forEach((el) => revealObserver.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("is-visible"));
}
