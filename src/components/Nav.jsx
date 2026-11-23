import { useEffect, useState } from "react";
import { NAV } from "../data";

export default function Nav({ theme, onToggleTheme }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const bar = document.getElementById("bar");
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (bar) bar.style.width = (window.scrollY / max) * 100 + "%";
      let cur = "";
      NAV.forEach(([id]) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.45) cur = id;
      });
      setActive(cur);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={"nav" + (scrolled ? " scrolled" : "")}>
      <a href="#home" className="logo" aria-label="Home">IK<span>.</span></a>
      <div className={"links" + (open ? " open" : "")}>
        {NAV.map(([id, label]) => (
          <a key={id} href={"#" + id} className={active === id ? "on" : ""} onClick={() => setOpen(false)}>{label}</a>
        ))}
        <button className="ico" onClick={onToggleTheme} aria-label="Toggle theme">{theme === "dark" ? "☀️" : "🌙"}</button>
      </div>
      <button className="ico burger" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Toggle menu">
        {open ? "✕" : "☰"}
      </button>
    </header>
  );
}
