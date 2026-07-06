"use client";

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="no-print inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white px-5 py-2.5 font-heading text-sm font-semibold text-ink shadow-[0_2px_6px_rgba(58,47,47,0.18)] transition-transform hover:-translate-y-0.5 hover:-rotate-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      🖨️ Print / Save as PDF
    </button>
  );
}
