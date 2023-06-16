export function slugify(string) {
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
export function setID() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let prefix = 'rt-';
    for (let i = 0; i < 8; i++) {
        prefix += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return prefix;
}
