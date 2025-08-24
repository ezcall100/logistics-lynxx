import { type ClassValue, clsx } from "clsx"

// Simple replacement for tailwind-merge
const twMerge = (...inputs: ClassValue[]) => {
  return clsx(inputs);
};

export { twMerge };
