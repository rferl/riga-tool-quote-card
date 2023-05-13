# RIGA Quote Card

Simple RIGA tool repo.

- SvelteKit based
- Typescipt
- Library option (see [here](https://kit.svelte.dev/docs/packaging))

## Dependencies and assets

### Tailwind [&#9781;](https://tailwindcss.com/) [&#9782;](https://tailwindcss.com/docs/guides/sveltekit)

- Required dev-deps are`tailwindcss`, `postcss` and `autoprefixer`
- `prettier-plugin-tailwindcss` sorts the classes in recommended order with prettiers help
- [`@tailwindcss/forms`](https://github.com/tailwindlabs/tailwindcss-forms) allows form element reset/styling
- When working with VSCode also install the [PostCSS Language Support](https://github.com/csstools/postcss-language) plugin to get rid of `@` rule warnings ([more](https://developer.mozilla.org/en-US/docs/Web/CSS/At-rule))

### Fonts

Fonts from RIGA editor are required in `/static` for development

### CSS

- `tailwind.config.cjs` from RIGA editor. Parts required:
  - fontFamily
  - colors
  - maybe more...
- `app.css` from RIGA editor. Parts required for development:
  - layer imports
  - classes used for settings component (only those)
  - font imports
