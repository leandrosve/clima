import { twMerge } from "tailwind-merge";

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
  return twMerge(classNames.filter((c) => !!c).join(" "));
};

export { printIf, includesIgnoreCase, joinClassNames };
