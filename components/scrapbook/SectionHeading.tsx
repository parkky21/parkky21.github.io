import { ScribbleUnderline } from "@/components/Doodles";

/** Consistent section header: handwritten kicker + bold heading + scribble. */
export function SectionHeading({
  kicker,
  title,
  underline = "var(--color-accent)",
  align = "center",
  className = "",
}: {
  kicker?: string;
  title: string;
  underline?: string;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div
      className={`mb-14 ${align === "center" ? "text-center" : ""} ${className}`}
    >
      {kicker && (
        <p className="mb-1 font-hand text-xl text-ink-soft">{kicker}</p>
      )}
      <h2 className="relative inline-block font-heading text-3xl font-bold text-ink sm:text-4xl">
        {title}
        <ScribbleUnderline
          className="absolute -bottom-4 left-0 h-5 w-full"
          color={underline}
        />
      </h2>
    </div>
  );
}
