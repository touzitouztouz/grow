
/**
 * A simple utility for conditionally joining class names.
 * @param classes A list of strings, booleans, or other falsy values.
 * @returns A single string of space-separated class names.
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
    return classes.filter(Boolean).join(' ');
}
