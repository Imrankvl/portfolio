import { useEffect, useState } from "react";
import { JOBS, PROJECTS, STATS } from "./data";
import profile from "./assett/1780243951908.png";
import Nav from "./components/Nav";
import Section from "./components/Section";
import Counter from "./components/Counter";
import Typed from "./components/Typed";
import Skills from "./components/Skills";
import Contact from "./components/Contact";

export default function App() {
  const [theme, setTheme] = useState(() => {
    let saved = null;
    try { saved = localStorage.getItem("theme"); } catch {}
    return saved || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  });
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try { localStorage.setItem("theme", theme); } catch {}
  }, [theme]);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div id="bar" className="progress" />
      <Nav theme={theme} onToggleTheme={() => setTheme(theme === "dark" ? "light" : "dark")} />

      <main>
        <section id="home" className="hero">
          <div className="blob" />
          <div>
            <p className="status"><span className="dot" />Immediate joiner · Dubai, UAE</p>
            <h1>Hi, I’m <span className="grad">Imran Khan I</span></h1>
            <Typed />
            <p className="intro">I turn complex datasets into dashboards and reports that support business decisions, and build MERN applications, including an Android app published on the Google Play Store.</p>
            <div className="btns">
              <a className="btn primary" href="#projects">View My Work</a>
              <a className="btn" href="#contact">Contact Me</a>
            </div>
          </div>
          <div className="photo">
            <div>
              <img src={profile} alt="Imran Khan I" />
            </div>
          </div>
        </section>

        <div className="stats">
          {STATS.map(([n, suffix, label]) => (
            <div className="stat" key={label}><Counter to={n} suffix={suffix} /><span>{label}</span></div>
          ))}
        </div>

        <Section id="about" title="About me">
          <div className="about">
            <div>
              <p>Data Analyst with 3+ years of experience in SQL, Python, and Power BI, turning complex datasets into dashboards and reports that support business decisions. I automated reporting workflows that cut data processing time by 25%, and built real-time dashboards backed by optimized MongoDB aggregation pipelines that reduced API response times by 30%.</p>
              <p>I’m also experienced in full-stack development (MERN) and strong at gathering requirements from stakeholders and translating them into clear, actionable insights.</p>
            </div>
            <ul className="facts">
              <li>📍 Dubai, UAE</li>
              <li>🪪 Visit Visa / Transferable</li>
              <li>⚡ Immediate joiner</li>
              <li>🗣️ English, Tamil</li>
            </ul>
          </div>
        </Section>

        <Section id="skills" title="Technical skills"><Skills /></Section>

        <Section id="experience" title="Experience">
          <div className="timeline">
            {JOBS.map((j) => (
              <article className="job" key={j.t}>
                <p className="date">{j.d}</p>
                <h3>{j.t}</h3>
                <p className="co">{j.c}</p>
                <ul>{j.p.map((x) => <li key={x}>{x}</li>)}</ul>
              </article>
            ))}
          </div>
        </Section>

        <Section id="projects" title="Featured work">
          <p className="lead">Highlights from my professional roles. Add your real repo and demo links when ready.</p>
          <div className="grid">
            {PROJECTS.map((p) => (
              <article className="card" key={p.t}>
                <h3>{p.i} {p.t}</h3>
                <p>{p.d}</p>
                <div className="tags">{p.g.map((g) => <span key={g}>{g}</span>)}</div>
                {p.s && <p className="big" style={{ marginTop: ".8rem" }}>{p.s}</p>}
              </article>
            ))}
          </div>
        </Section>

        <Section id="education" title="Education & certifications">
          <div className="grid">
            <article className="card">
              <h3>🎓 Bachelor of Technology, Information Technology</h3>
              <p>Dr. Mahalingam College of Engineering and Technology, India</p>
              <p className="date">2018 – 2022</p>
            </article>
            <article className="card">
              <h3>📜 Certifications</h3>
              <p><strong>Besant Technology: </strong>Data Science Certificate (DSC)</p>
              <p><strong>Microsoft Office: </strong>Word, Excel, Outlook, PowerPoint</p>
            </article>
          </div>
        </Section>

        <Section id="contact" title="Contact"><Contact /></Section>
      </main>

      <footer><p>© {new Date().getFullYear()} Imran Khan I · Dubai, UAE</p></footer>
      {showTop && <button className="top" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>↑</button>}
    </>
  );
}
