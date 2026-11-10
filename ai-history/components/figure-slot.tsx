import { figures, type FigureId } from "@/lib/figures";

export function FigureSlot({ id, primary = false }: { id: FigureId; primary?: boolean }) {
  const figure = figures[id];
  return <figure className="fig" id={`figure-${id}`} data-figure-slot={id} aria-labelledby={`figure-title-${id}`}>
    <div className="fig-head"><span className="fig-number">Fig. {figure.number}</span><span id={`figure-title-${id}`}>{figure.title}</span></div>
    <div className="fig-stage"><div className="fig-placeholder"><span aria-hidden="true">+</span><p>{figure.question}</p><small>Visual space reserved · image, diagram, or interactive figure</small></div></div>
    <figcaption><span>{figure.caption}</span>{primary && <a href="#worked-example">Continue with the worked example ↓</a>}</figcaption>
  </figure>;
}
