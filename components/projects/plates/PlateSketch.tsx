import type { Project } from "@/lib/data";
import { HousePlate } from "./HousePlate";
import s from "./PlateSketch.module.css";

const NUMERALS = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];

/**
 * The project's engraved sketch (ported from the old portfolio's "Houses" plates), framed for
 * a sticky note. Motion runs while the nearest [data-plate] ancestor is hovered.
 */
export function PlateSketch({
  plate,
  index,
}: {
  plate: NonNullable<Project["plate"]>;
  index: number;
}) {
  return (
    <div className={`${s.theme} ${s.frame}`}>
      <HousePlate id={plate} className={s.art} />
      <span className={s.numeral} aria-hidden="true">
        {NUMERALS[index] ?? index + 1}
      </span>
    </div>
  );
}
