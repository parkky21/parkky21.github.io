/**
 * Invisible <svg> that holds reusable filter defs referenced across the page
 * via `filter: url(#sketchy)` (see the `.sketch` class in globals.css).
 * The turbulence + displacement combo gives clean SVG strokes a hand-drawn
 * wobble; `#torn-edge` roughs up card backgrounds into torn paper.
 */
export function SketchDefs() {
  return (
    <svg
      aria-hidden
      width="0"
      height="0"
      style={{ position: "absolute" }}
    >
      <defs>
        <filter id="sketchy">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.018"
            numOctaves="2"
            seed="7"
            result="noise"
          />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="3.2" />
        </filter>

        <filter id="sketchy-strong">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.012"
            numOctaves="3"
            seed="3"
            result="noise"
          />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" />
        </filter>

        {/* Torn-paper edge — applied to card background layers only,
            never to text (see TornCard). */}
        <filter id="torn-edge">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.04"
            numOctaves="3"
            seed="11"
            result="noise"
          />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="10" />
        </filter>
      </defs>
    </svg>
  );
}
