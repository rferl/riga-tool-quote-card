/**
 * Converts a string into a URL-friendly slug.
 *
 * @param {string} string - The string to be converted.
 * @returns {string} The converted string.
 */
export function slugify(string: string): string {
  const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;';
  const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------';
  const p = new RegExp(a.split('').join('|'), 'g');

  return string
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '_') // Replace spaces with -
    .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w-]+/g, '') // Remove all non-word characters
    .replace(/--+/g, '_') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+\$/, ''); // Trim - from end of text
}

/**
 * Generates a random ID with a prefix of 'rt-'.
 *
 * @returns {string} The generated ID.
 */
export function setID(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let prefix = 'rt-';

  for (let i = 0; i < 8; i++) {
    prefix += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return prefix;
}

/**
 * Decodes HTML entities in a string.
 *
 * @param {string} html - The string containing HTML entities.
 * @returns {string} The string with HTML entities decoded.
 */
export function decodeHtml(html: string) {
  if (typeof document === 'undefined') return html;
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
}
