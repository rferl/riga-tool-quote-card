# RIGA Quote Card

Base repo for building a RIGA tool **Settings component** as well as - optionally - a **tool frontend**.

## Background

The RIGA editor provides a list of base tools that can be configured to work in a specific way. For example, a quote card tool can be configured with three settings to show specific quote text, in a specific font-size of a specific color. Tool instance creators can configure settings in the RIGA editor's Settings UI (**TODO link**). This UI or rather UI component can be built with the help of this repo. To do so you would typically:

1. Define the settings your RIGA tool needs
2. Build these settings out as controls in a Svelte component
3. Expose your Svelte component in a component library (with just that single Settings component)

As the RIGA editor is also a Svelte app your Settings component can now be installed easily in the [RIGA editor repo](https://github.com/rferl/riga-editor) via npm and consumed by the editor.

## Remit

In technical terms, this repo is a pre-configured [SvelteKit library app](https://kit.svelte.dev/docs/packaging) (using Typescript) with all the pieces required to build and expose a Settings component:

- a base `Settings.svelte` component
- helper libraries
- Settings styles and classes
- other assets like fonts etc.
- a script to build the (single) component library

As an additional benefit, this repo provides a development environment to not only build but also view and test your Settings component during development.

Additionally, in case your tool comes with a frontend (like in the quote-card example), you can also use this repo to build and expose the tool frontend. Both uses are described below.

## Settings component

### Quickstart

1. Clone the repo

2. In `package.json` set the `name` to your tool's name prefixed with `riga-` (eg. `riga-quote-card`)

3. Run `npm run dev` for development

4. Build out the settings component `src/lib/components/Settings.svelte` (see below for more info)

5. Once you're happy with your component run `npm run package`. This will produce a `./dist` folder crucially including an `index.js` file exporting your `Settings` component for consumption in the RIGA Editor once npm installed.

### Writing Settings component

Some general and hopefully helpful notes and pointers when writing your Settings component (step 4 above):

#### Layout

Each Settings component is a `form` element with one or more `fieldset` elements representing different setting blocks containing individual settings. Here's the Settings "anatomy" showing all 6 core elements, their HTML tags and pre-defined CSS classes:

<img src='https://i.ibb.co/cwcK0nG/Settings-anatomy.jpg' width='100%'>

See `src/lib/components/Settings.svelte` for a base implementation in code.

#### How to write a setting?

You can write vanilla HTML if you for example want to add a simple input with a label.

Alternatively, you can use a set of predefined components for common controls like dropdowns or color picker living in `src/lib/components/controls`.

Lastly, you can write your own components.

**TODO Note, for now helper components are stored in the repo, but will ultimately move into their own library, the tool repo will load.**

#### CSS

In order to maintain consistent styling across all the different Tool's Settings UI components in the RIGA editor, please use only predefined CSS classes.

We're using [Tailwind](https://tailwindcss.com/docs) for all settings CSS and all pre-defined classes can be found in `/src/app.css`. Please don't change these classes as they are in sync with the editor where they will be applied once installed.

#### How to control the setting's layout?

You can control the layout and dimensions of your individual settings or setting blocks:

- You can control the **position** of the setting wrapper `.rt-setting` by simply choosing which comes first, second, third, etc.

- You can also control the **width** of the setting **wrapper** (`.rt-setting`). The default width is `w-1/2` (50% of the available space) but you can override this with any [tailwind width class](https://tailwindcss.com/docs/width) on the wrapper div, e.g.:

  ```html
  <div class="rt-setting w-full"></div>
  ```

- You can control the **width** of each input **element** (`.rt-input`). The default is `max-w-[8rem]` but you can override this with any [tailwind width class](https://tailwindcss.com/docs/width) on the wrapper div, e.g.:
  ```html
  <textarea class="rt-input max-w-none" />
  ```

#### How to view your settings component?

Run `npm run dev` to view your changes on the dev server.

#### How to update the settings data?

The Settings's core task is to capture settings a user will set or change via the component's inputs.

The capturing mechanic is straight forward. The Settings component receives a [Svelte writable store](https://svelte.dev/docs#run-time-svelte-store-writable) which can be updated on input change. For example:

```html
<script>
	// The settings store passed in by the Editor:
	export let settings;
</script>

<!-- Update the values for the settings' `font_size` property -->
<input name="font-size" bind:value="{$settings.font_size}" />
```

When using predefined components, pass the `settings` store and the property name to update:

```html
<DropDown settings={settings} setting={'font_size'} //... />
```

_See the [Settings component implementation](./src/lib/components/Settings.svelte) for a complete implementation across multiple inputs._

#### Utilities

For unique element attributes (`id`, `name`, `for`, ...) you can use the utility function `setID()`. This is entirely up to you but might be helpful. Example usage in the `Dropdown` component:

```html
<script lang="ts">
	import { setID } from '../../utils/index.js';

	// Set the id to be used in the HTML below.
	const id = setID; // `id` might be e.g. `rt-7Hji97tX`
</script>

<!-- Use the unique id for the label's `for` attribute -->
<label for="{id}" class="rt-label">{label}</label>

<!-- ...other elements... -->
```

## Tool Frontend

All RIGA tools are assumed to have settings. Some tools might be backend only services, some might come with a rendered UI. Both, the tool's potential backend and frontend, are consciously decoupled from the Settings component, so the UI for example doesn't have to be a Svelte component to allow maximum flexibility and integration of separately built tools.

However, if you're building a UI based tool you can use this repo as a development environment - it might even make sense :))

### Quickstart

1. Create a new route in `src/routes` by adding a new directory (using SvelteKit's [file-system based routing](https://kit.svelte.dev/docs/routing))

2. Name it accordingly e.g. `src/routes/my-tool-name`

3. In the directory add two files:

   - a `+page.svelte` file (this will have your tool's frontend code)

   - a `+layout.ts` file just including the line:

     ```js
     export const prerender = true;
     ```

     ...so the build script knows to build this route as a static site bundle.

4. Build your tool in `+page.svelte`

5. Once you're happy with your tool, you can compile it to the `./build` folder with `npm run build`

**TODO this folder might get the name of the tool and we might want to call the file `index.html`**

### Writing your tool's frontend

Some notes for writing your tool's UI as part of the base tool repo (step 4 above):

#### How can I view my tool?

Running `npm run dev` enables you to view your tool UI in two different locations.

You can see your changes _live_ and in a _full screen_ preview at the tool's route. For instance, if your tool is located at `src/routes/my-tool-name`, you can monitor your progress at `http://localhost:5173/my-tool-name` (note that port `5173` may vary).

Alternatively, you can view it at the home route, such as `http://localhost:5173`. This option lets you see your UI within the _preview pane_, adjacent to the settings panel. The preview pane is an iframe that points to the `url` value specified in the `riga-tool.config.yml` file. During development, you can set your `url` to your tool's localhost URL, for example, `http://localhost:5173/my-tool-name`.

**TODO: check if there are advantages of using the local vs. the final URL. For now it seems the local URL seems the best as it updates immediately and without deploy. But there might be further considerations?**

#### What happens when I build my tool?

When you build your tool's frontend with `npm run build` SvelteKit will compile your svelte site at `+page.svelte` to a static site into the `./build` directory.

The entry HTML file of the created static site will be named after the given route name, so the route name `src/routes/my-tool-name` will translate to `my-tool-name.html`.

**TODO consider and explain what happens next and how it gets pulled into the editor and revise above accordingly**

#### Can I use Svelte when writing my tool?

Yes. You can write vanilla HTML but it seems prudent to use Svelte if you choose to build your tool in this SvelteKit repo. Ideally you keep within the route directory for all components, stores and utilities you might be using to keep these separate from the Settings component using the home route and the `src/lib` structure.

**TODO all static files are being copied over to each static build folder. Consider ramifications and solutions (there's also a chat transcript in `RFE | chats.md` on this)**

**TODO add big note that settings fetch is required**

## Dependencies and assets

This is a collection of libs and assets used in this repo.

**TODO revise this**

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
