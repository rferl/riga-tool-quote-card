# RIGA Quote Card

This is a pre-configured [**SvelteKit library project**](https://kit.svelte.dev/docs/packaging) for a RIGA tool developer to build a Svelte `Settings` component and configure its use for further integration within the [RIGA Editor](https://github.com/rferl/riga-editor).

It also offers a **development environment** that allows you to construct, preview, and test your `Settings` component during development.

Additionally, this repository can be used to build, develop, and expose a **tool frontend** in case your tool template provides a frontend.

The repository exposes:

1. a `riga-tool.config.yml` configuration file
2. a `Settings.svelte` component
3. an optional tool frontend (if applicable)

Once built, the library can be installed using `npm install` and used within the [RIGA Editor](https://github.com/rferl/riga-editor).

## Quickstart

1. Clone the repo

2. In `package.json`, set the `name` to your tool's name prefixed with `riga-` (e.g., `riga-quote-card`)

3. Populate the `riga-tool.config.yml` (see below for details)

4. Run `npm run dev` for development and preview your `Settings` component on the given localhost

5. Build out the settings component `src/lib/components/Settings.svelte` (see below for more info)

6. Once you're happy with your component, run `npm run package`. This will produce a `./dist` folder crucially including an `index.js` file exporting your `Settings` component for consumption in the RIGA Editor once npm installed.

## The `riga-tool.config.yml` configuration file

To enable the RIGA Editor to catalog available tool templates, it constructs a registry derived from each installed tool template's `riga-tool.config.yml` configuration file. It accepts the following properties:

| Property       | type                                | Required | Description                                                                         | Example                                                             |
| -------------- | ----------------------------------- | :------: | ----------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| `name`         | string                              |    ✓     | The human-readable name of the tool                                                 | `'Quote Card'`                                                      |
| `slug`         | string                              |    ✓     | Lower case machine-readable slug `[a-z0-9]` with `_` for spaces                     | `'quote_card'`                                                      |
| `category`     | string                              |    ✓     | Human-readable tool category (like _Editorial_, _Data viz_, ...)                    | `'Data viz'`                                                        |
| `package_name` | string                              |    ✓     | The name of your repository as per `package.json` starting with `riga-editor-tool-` | `'riga-editor-tool-quote-card'`                                     |
| `image`        | string                              |    ✓     | Image URL of the image to be displayed on the tool's card in the editor             | `'https://i.ibb.co/my-image.jpg'`                                   |
| `ui`           | boolean                             |    ✓     | Indication if tool template comes with a tool frontend                              | `true`                                                              |
| `settings`     | list of records (string or numbers) |    ✓     | Default settings using either strings or number values                              | <pre>settings:<br> quote_text: 'Hello'<br> quote_text_size: 3</pre> |

## `Settings.svelte` component

The `Settings` component lives in `/src/lib/components` and must be called **`Settings.svelte`**. You can preview your work on the component on the given localhost URL after running `npm run dev`.

### Properties

The component receives the following props passed in by its parent component in the RIGA Editor:

| Property   | Type   | Description                                                                                                                | Example                                                                                                                                                                                  |
| ---------- | ------ | -------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `settings` | object | An object that contains the current settings of the tool. This object is writable and can be updated by the form controls. | <pre>{<br>&nbsp;&nbsp;"quote_text": "Hello",<br>&nbsp;&nbsp;"quote_text_size": 3,<br>}</pre>                                                                                             |
| `id`       | string | A unique identifier for the tool instance that maps each tool instance to its DB stored settings.                          | `'123e4567-e89b-12d3-a456-426614174000'`                                                                                                                                                 |
| `output`   | object | An object that contains the output of the tool. This object is writable and can be updated by the form controls.           | <pre>{<br>&nbsp;&nbsp;"code": "\<iframe>...",<br>&nbsp;&nbsp;"title" (optional): "Copy your embed code here",<br>&nbsp;&nbsp;"description" (optional): "This is your embed code" }</pre> |

### Layout

Each Settings component is a `form` element with one or more `fieldset` elements representing different setting blocks containing individual settings. Here's the `Settings` "anatomy" showing all 6 core elements, their HTML tags, and pre-defined CSS classes:

<img src='https://i.ibb.co/cwcK0nG/Settings-anatomy.jpg' width='100%'>

See [`src/lib/components/Settings.svelte`](src/lib/components/Settings.svelte) for a base implementation in code.

### How to write a single setting?

It's up to you how to implement a setting - you can write vanilla HTML or you can write your own sub-components. Alternatively, you can use a set of predefined components for common controls like dropdowns or color picker living in `src/lib/components/controls`.

_Note, helper components will likely move into a shared library in the future._

### CSS

[Tailwind](https://tailwindcss.com/docs) is being used for all `Settings` CSS.

In order to maintain consistent styling, the following style assets are being shared between the RIGA Editor and the tool template repositories. Please make sure the following assets and configurations are being copied over from the respective directories and files:

- Fonts from RIGA Editor are required in `/static/fonts` for development
- Configuration required from the RIGA Editor's [`tailwind.config.cjs`](https://github.com/rferl/riga-editor/blob/main/tailwind.config.cjs):
  - `fontFamily`
  - `colors`
- Configuration required from the RIGA Editor's [`app.css`](https://github.com/rferl/riga-editor/blob/main/src/app.css):

  - `@layer components` classes under `/* Settings component classes */` header
  - `@layer base` font imports

_Note, these will likely move into a shared library in the future._

### How to control the setting's layout?

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

### How to update the settings data?

The `Settings`'s core task is to capture settings a template author will set or change via the component's inputs.

The update mechanic is straightforward: the `Settings` component receives a [Svelte writable store](https://svelte.dev/docs#run-time-svelte-store-writable) from the RIGA Editor it gets loaded into. This settings store can be updated on input change. For example:

```html
<script>
	// The settings store passed in by the Editor:
	export let settings;
	// ...
</script>

<!-- Update the values for the settings' `font_size` property -->
<input name="font-size" bind:value="{$settings.font_size}" />
```

When using predefined components, pass the `settings` store and the property name to update:

```html
<DropDown settings={settings} setting={'font_size'} //... />
```

_See the [Settings component implementation](./src/lib/components/Settings.svelte) for a complete implementation across multiple inputs._

### How to update the output data?

Your `Settings` component can update an `output` object you can use to produce any type of output string. Whatever you compose will be shown in the Editor's output panel:

<img src="https://i.ibb.co/p1jWhfn/output-code.jpg" alt="output panel" width="50%"/>

The `output` object has one required and two optional properties:

```
{
  "code" (required): "<iframe>..." code shown in the output textarea above,
  "title" (optional): "Copy embed code" above,
  "description" (optional): "Please copy embed code below" in above example,
}
```

While this output might typically be an embed code pointing to the hosted tool frontend, it is up to you what to pass on to the tool template author.

To compose your output, use the `updateOutput` function in the [`src/lib/output/index.ts`](src/lib/output/index.ts) module. Note, that the output composition is flexible as you can use any of the available settings as well as the tool instance ID passed in from the Editor's parent component.

### Utilities

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

All RIGA tool templates are assumed to have settings. Some tools might be backend-only services, some might come with a rendered UI. Both, the tool's potential backend and frontend, are consciously decoupled from the Settings component, so any tool frontend the tool developer conceives doesn't have to be a Svelte component for example, to allow maximum flexibility and integration of separately built tools.

However, if you're building a UI-based tool you can use this repo as a development environment. This might even make sense as your `Settings` component and tool frontend are in the same place and can be developed and previewed in the same environment.

### Quickstart

1. Create a new route in `src/routes` by adding a new directory (using SvelteKit's [file-system based routing](https://kit.svelte.dev/docs/routing))

2. Name it `src/routes/index`

3. In the directory add two files:

   - a `+page.svelte` file (this will have your tool's frontend code)

   - a `+layout.ts` file just including the line:

     ```js
     export const prerender = true;
     ```

     ...so the build script knows to build this route as a **static site bundle**.

4. Build your tool in `+page.svelte`

5. Once you're happy with your tool, you can compile it to the `./build` folder with `npm run build`

### Developing your tool's frontend

#### Required steps

Regardless of where you build your tool frontend - in a separate repo or within this tool template repo - you will likely be interested in:

1. retrieving the tool instance ID
2. retrieving the tool instance setting object with the ID via the [RIGA API](https://github.com/rferl/riga-api)
3. using the settings in your tool frontend

You can retrieve the tool instance ID in various ways depending on the embedding format and it is up to you how you do it in detail. Using for example an iframe embed, the tool frontend could get the id as a URL parameter via the iframe's `src` URL. See other options listed in [this issue](https://github.com/rferl/riga-editor/issues/52#issuecomment-1721561651).

_Note, that this is only tested with iframes so far._

Once the ID is retrieved you can use a GET request to retrieve the settings from the RGA API:

```
const response = await fetch(`${riga_endpoint_url}/api/tools/${id}`);
const responseData = await response.json();
const settings = responseData?.tool?.settings;
```

Now your tool frontend can use the `settings` object for any logic or to produce, style, configure its elements.

#### How can I view my tool during development?

When running `npm run dev` and navigating to the given localhost, you can view your tool frontend full screen at the `/index` route.

Alternatively, you can view it on the home `/` route within a preview pane next to the settings panel. The preview pane is an iframe that points to the `/index` route and also passes through the `settings` store as a `settings` URL parameter via the iframe's `src` attribute. This way, you can see live changes as the settings from the `Settings` component will be passed through to your tool UI immediately.

To make this work, you will need to add some logic to your tool frontend code to distinguish between development and production. In development mode, no tool instance ID will be available for you to use in order to fetch the settings from the API as [described above](#required-steps). Instead, the settings are being passed through directly.

The following is a Svelte example in code, which you can adapt to fit your use case:

```js
onMount(async () => {
	if (import.meta.env.DEV) {
		// Development (grab settings from preview iframe)
		id = true;
		settings = JSON.parse($page.url.searchParams.get('settings'));
	} else {
		// Production (grab settings from API)
		id = getId();
		settings = await getSettings(id);
	}
});
```

#### What happens when I build my tool?

When you build your tool's frontend with `npm run build`, SvelteKit will compile your Svelte site at `+page.svelte` into a static site in the `./build` directory.

The entry HTML file will be `index.html` as the route name `src/routes/index` will translate to `index.html`.

You can now host the `build` folder and use the hosting URL in your output embed code, for example.

#### Can I use Svelte when writing my tool?

Yes. You can write vanilla HTML, but it seems prudent to use Svelte if you choose to build your tool in this SvelteKit repo. Ideally, you should keep within the route directory for all components, stores, and utilities you might be using to keep these separate from the Settings component using the home route and the `src/lib` structure.

## Dependency notes

### Tailwind [&#9781;](https://tailwindcss.com/) [&#9782;](https://tailwindcss.com/docs/guides/sveltekit)

- Required dev-deps are `tailwindcss`, `postcss`, and `autoprefixer`.
- `prettier-plugin-tailwindcss` sorts the classes in recommended order with Prettier's help.
- [`@tailwindcss/forms`](https://github.com/tailwindlabs/tailwindcss-forms) allows form element reset/styling.
- When working with VSCode, also install the [PostCSS Language Support](https://github.com/csstools/postcss-language) plugin to get rid of `@` rule warnings ([more](https://developer.mozilla.org/en-US/docs/Web/CSS/At-rule)).

---

## Next steps

- **Shared library**: Both the RIGA Editor repo and the tool repos share `Settings.svelte`, Tailwind classes, types, and fonts. Components for the tool edit page can also be abstracted and shared. A library to be installed by both repositories seems obvious, but it would ideally wait for a better understanding of how the repos relate to each other (npm installs, submodules, mono repo, etc.).

  In addition, the library should hold components used across all tool templates.
