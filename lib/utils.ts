// A utility function for conditionally joining class names.
// This is a simplified version; a more robust implementation might use clsx and tailwind-merge.
export function cn(...inputs) {
  return inputs.filter(Boolean).join(' ');
}
