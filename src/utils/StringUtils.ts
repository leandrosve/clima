import { twMerge } from "tailwind-merge";

// Metodos utilitarios para texto y manejo de clases
const printIf = (
  value: string | null | undefined,
  condition: unknown,
  def?: string | null | undefined
) => {
  if (condition) return value ?? "";
  return def ?? "";
};

const includesIgnoreCase = (text: string, term: string) => {
  return text.toLowerCase().includes(term.toLowerCase());
};

const joinClassNames = (...classNames: (string | null | undefined)[]) => {
  // twMerge lo utilizo para resolver conflictos cuando aparece mas de una vez la misma regla de tailwind
  // La ultima vez que aparece sera la que se tenga en cuenta
  return twMerge(classNames.filter((c) => !!c).join(" "));
};

export { printIf, includesIgnoreCase, joinClassNames };
