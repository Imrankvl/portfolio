import { useState } from "react";
import { EMAIL, FORM_ENDPOINT } from "../data";

const rules = {
  name: (v) => v.trim().length >= 2 || "Enter your name.",
  email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || "Enter a valid email address.",
  subject: (v) => v.trim().length >= 3 || "Enter a subject (3+ characters).",
  message: (v) => v.trim().length >= 10 || "Write a message (10+ characters).",
};
const empty = { name: "", email: "", subject: "", message: "" };

export default function Contact() {
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState({});
  const [msg, setMsg] = useState("");
  const [failed, setFailed] = useState(false);

  const check = (f) => {
    const r = rules[f](values[f]);
    setErrors((p) => ({ ...p, [f]: r === true ? "" : r }));
    return r === true;
  };

  const submit = async (e) => {
    e.preventDefault();
    setMsg(""); setFailed(false);
    if (!Object.keys(rules).map(check).every(Boolean)) return;
    if (!FORM_ENDPOINT) { setMsg("Form is valid. Connect a form service to send real messages."); return; }
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error();
      setMsg("Message sent. Thank you!");
      setValues(empty);
    } catch {
      setFailed(true);
      setMsg("Couldn’t send. Email me directly at " + EMAIL + ".");
    }
  };

  const field = (f, label, area) => {
    const Tag = area ? "textarea" : "input";
    return (
      <>
        <label htmlFor={f}>{label}</label>
        <Tag id={f} type={f === "email" ? "email" : "text"} rows={area ? 5 : undefined}
          value={values[f]} className={errors[f] ? "bad" : ""} aria-invalid={!!errors[f]}
          onChange={(e) => setValues({ ...values, [f]: e.target.value })} onBlur={() => check(f)} />
        <span className="err" role="alert">{errors[f]}</span>
      </>
    );
  };

  return (
    <div className="contact">
      <div>
        <p className="lead">Open to data analyst and full-stack developer roles. I can join immediately.</p>
        <ul className="facts">
          <li>✉️ <a href={"mailto:" + EMAIL}>{EMAIL}</a></li>
          <li>📞 <a href="tel:+971558367475">+971 55 836 7475</a></li>
          <li>📍 Dubai, UAE</li>
        </ul>
      </div>
      <form onSubmit={submit} noValidate>
        {field("name", "Name")}
        {field("email", "Email")}
        {field("subject", "Subject")}
        {field("message", "Message", true)}
        <button className="btn primary" type="submit">Send message</button>
        <p className="res" role="status" style={failed ? { color: "#e5484d" } : undefined}>{msg}</p>
      
      </form>
    </div>
  );
}
