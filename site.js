const menuToggle = document.getElementById("menuToggle");
const mobileNav = document.getElementById("mobileNav");
const mobileClose = document.getElementById("mobileClose");

if (menuToggle && mobileNav && mobileClose) {
  menuToggle.addEventListener("click", () => mobileNav.classList.add("active"));
  mobileClose.addEventListener("click", () => mobileNav.classList.remove("active"));
  mobileNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => mobileNav.classList.remove("active"));
  });
}

const revealNodes = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealNodes.forEach((node) => revealObserver.observe(node));

const heroStage = document.getElementById("heroStage");
if (heroStage && window.matchMedia("(pointer:fine)").matches) {
  const handles = heroStage.querySelectorAll("[data-depth]");

  heroStage.addEventListener("mousemove", (event) => {
    const rect = heroStage.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    handles.forEach((handle) => {
      const depth = Number(handle.dataset.depth || 0);
      handle.style.transform = "translate3d(" + (x * depth) + "px," + (y * depth * -0.8) + "px,0)";
    });
  });

  heroStage.addEventListener("mouseleave", () => {
    handles.forEach((handle) => {
      handle.style.transform = "translate3d(0,0,0)";
    });
  });
}
