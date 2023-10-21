/**
 * Converts a string into a URL-friendly slug.
 *
 * @param {string} string - The string to be converted.
 * @returns {string} The converted string.
 */
export declare function slugify(string: string): string;
/**
 * Generates a random ID with a prefix of 'rt-'.
 *
 * @returns {string} The generated ID.
 */
export declare function setID(): string;
/**
 * Decodes HTML entities in a string.
 *
 * @param {string} html - The string containing HTML entities.
 * @returns {string} The string with HTML entities decoded.
 */
export declare function decodeHtml(html: string): string;
