// ===== Settings =====
// Paste a Formspree/Netlify endpoint here to send real emails, e.g. "https://formspree.io/f/xxxx"
const FORM_ENDPOINT = "";

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

// Footer year
$("#year").textContent = new Date().getFullYear();

// ===== Mobile menu =====
const burger = $("#burger"), menu = $("#menu");
burger.addEventListener("click", () => {
  const open = menu.classList.toggle("open");
  burger.setAttribute("aria-expanded", open);
}); 
$$("#menu a").forEach(a => a.addEventListener("click", () => {
  menu.classList.remove("open");
  burger.setAttribute("aria-expanded", "false");
}));
document.addEventListener("keydown", e => {
  if (e.key === "Escape") { menu.classList.remove("open"); burger.setAttribute("aria-expanded", "false"); }
});

// ===== Nav background + back-to-top =====
const nav = $("#nav"), topBtn = $("#top");
function onScroll() {
  nav.classList.toggle("scrolled", scrollY > 20);
  topBtn.classList.toggle("show", scrollY > 500);
}
addEventListener("scroll", onScroll, { passive: true });
onScroll();
topBtn.addEventListener("click", () => scrollTo({ top: 0, behavior: "smooth" }));

// ===== Scroll reveal =====
const revealObs = new IntersectionObserver((entries, obs) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); } });
}, { threshold: 0.1 });
$$(".reveal").forEach(el => revealObs.observe(el));

// ===== Active nav link =====
const links = $$("#menu a");
const sections = links.map(a => $(a.getAttribute("href")));
const spy = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) links.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + e.target.id));
  });
}, { rootMargin: "-45% 0px -50% 0px" });
sections.forEach(s => s && spy.observe(s));

// Placeholder links (# only) shouldn't jump the page
$$('a[href="#"]').forEach(a => a.addEventListener("click", e => e.preventDefault()));

// ===== Contact form validation =====
const form = $("#form"), result = $("#result");
const rules = {
  name: v => v.trim().length >= 2 || "Enter your name.",
  email: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || "Enter a valid email address.",
  subject: v => v.trim().length >= 3 || "Enter a subject (3+ characters).",
  message: v => v.trim().length >= 10 || "Write a message (10+ characters)."
};
function check(field) {
  const input = form.elements[field], res = rules[field](input.value);
  const ok = res === true;
  input.classList.toggle("invalid", !ok);
  input.setAttribute("aria-invalid", !ok);
  $("#e-" + field).textContent = ok ? "" : res;
  return ok;
}
Object.keys(rules).forEach(f => form.elements[f].addEventListener("blur", () => check(f)));

form.addEventListener("submit", async e => {
  e.preventDefault();
  result.textContent = "";
  result.style.color = "";
  const valid = Object.keys(rules).map(check).every(Boolean);
  if (!valid) return;

  if (!FORM_ENDPOINT) {
    // No backend connected: confirm validation only
    result.textContent = "Form is valid. Connect a form service to send real messages.";
    return;
  }
  try {
    const res = await fetch(FORM_ENDPOINT, {
      method: "POST",
      headers: { Accept: "application/json" },
      body: new FormData(form)
    });
    if (!res.ok) throw new Error();
    result.textContent = "Message sent. Thank you!";
    form.reset();
  } catch {
    result.style.color = "#ff8fa0";
    result.textContent = "Couldn't send. Email me directly at imran.kvl22@gmail.com.";
  }
});
