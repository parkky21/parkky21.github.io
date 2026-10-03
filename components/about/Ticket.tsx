import type { CSSProperties, ReactNode } from "react";
import s from "./Ticket.module.css";

/** Two card stocks: a cool green school pass and a warm amber work pass. */
const STOCK = {
  teal: {
    backgroundColor: "#e2efe9",
    backgroundImage:
      "var(--paper-grain), repeating-linear-gradient(135deg, rgba(31,122,112,0.06) 0 1px, transparent 1px 7px)",
  },
  amber: {
    backgroundColor: "#fbe7cd",
    backgroundImage:
      "var(--paper-grain), repeating-linear-gradient(135deg, rgba(201,114,42,0.07) 0 1px, transparent 1px 7px)",
  },
} satisfies Record<string, CSSProperties>;

export type TicketStock = keyof typeof STOCK;

/**
 * A ticket with a perforated tear-off stub. Render order is stub → main so
 * screen readers hear the date before the details; CSS moves the stub to the
 * right on wider screens. The drop-shadow lives on this wrapper because the
 * notch mask on the ticket itself would clip a box-shadow.
 */
export function Ticket({
  stock,
  stub,
  children,
  className = "",
}: {
  stock: TicketStock;
  stub: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative [filter:drop-shadow(0_1px_1px_rgba(58,47,47,0.18))_drop-shadow(0_12px_14px_rgba(40,25,10,0.16))] ${className}`}
    >
      <div className={s.ticket} style={STOCK[stock]}>
        <div className={s.stub}>{stub}</div>
        <div className={s.main}>{children}</div>
      </div>
    </div>
  );
}
