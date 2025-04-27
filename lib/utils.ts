import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string) : string {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric"
  };
  return new Date(date).toLocaleDateString("en-US", options);
}

// This function extracts a description from a string and truncates it to a maximum length of 100 characters.
export function extractDescription(description: string): string {
  const maxLength = 100;
  if (description.length > maxLength) {
    return description.slice(0, maxLength) + "...";
  }
  return description;
}