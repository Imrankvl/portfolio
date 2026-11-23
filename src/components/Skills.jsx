import { useState } from "react";
import { SKILLS } from "../data";

export default function Skills() {
  const keys = Object.keys(SKILLS);
  const [current, setCurrent] = useState(keys[0]);
  return (
    <div>
      <div className="tabs" role="tablist">
        {keys.map((k) => (
          <button key={k} role="tab" aria-selected={k === current}
            className={"tab" + (k === current ? " on" : "")} onClick={() => setCurrent(k)}>{k}</button>
        ))}
      </div>
      <div className="tags" key={current}>
        {SKILLS[current].map((s, i) => <span key={s} style={{ animationDelay: i * 50 + "ms" }}>{s}</span>)}
      </div>
    </div>
  );
}
