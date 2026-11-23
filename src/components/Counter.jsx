import { useEffect, useState } from "react";
import useReveal from "../hooks/useReveal";

export default function Counter({ to, suffix }) {
  const [ref, visible] = useReveal();
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!visible) return;
    let frame, start;
    const step = (t) => {
      start = start || t;
      const p = Math.min((t - start) / 1200, 1);
      setN(Math.round(to * p));
      if (p < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [visible, to]);
  return <b ref={ref} className="grad">{n + suffix}</b>;
}
