import type { Project } from "./data";

// Single source of truth for project card tints — maps a project's `color`
// key to the warm paper tokens defined in globals.css. Used via inline
// `style` so Tailwind never has to see a dynamic class name.
export const noteTint: Record<Project["color"], string> = {
  yellow: "var(--color-note-yellow)",
  pink: "var(--color-note-pink)",
  blue: "var(--color-note-blue)",
  green: "var(--color-note-green)",
  orange: "var(--color-note-orange)",
  purple: "var(--color-note-purple)",
};

// Has a real repository link (the data file uses "#" as a placeholder).
export function hasRepo(p: Project): p is Project & { repo: string } {
  return Boolean(p.repo && p.repo !== "#");
}
