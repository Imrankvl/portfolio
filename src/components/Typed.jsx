import { useEffect, useState } from "react";
import { ROLES } from "../data";

export default function Typed() {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const full = ROLES[i];
    const t = setTimeout(() => {
      if (!deleting) {
        setText(full.slice(0, text.length + 1));
        if (text.length + 1 === full.length) setTimeout(() => setDeleting(true), 1200);
      } else {
        setText(full.slice(0, text.length - 1));
        if (text.length - 1 === 0) { setDeleting(false); setI((i + 1) % ROLES.length); }
      }
    }, deleting ? 35 : 70);
    return () => clearTimeout(t);
  }, [text, deleting, i]);

  return <p className="role grad">{text}<span className="caret" /></p>;
}
