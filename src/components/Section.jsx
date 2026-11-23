import useReveal from "../hooks/useReveal";

export default function Section({ id, title, children }) {
  const [ref, visible] = useReveal();
  return (
    <section id={id} ref={ref} className={"section reveal" + (visible ? " in" : "")}>
      <h2>{title}</h2>
      {children}
    </section>
  );
}
