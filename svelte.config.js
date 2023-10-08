import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		// The static adapter builds static site bundles. By default it builds each route
		// as a static site - we, however, only want the page in the `/index` route to build 
		// not the home route. For this to work we set the `prerender` variable accordingly 
		// and set `strict` (== prerender all pages) to `false` here.
		adapter: adapter({
			strict: false
		}),
	}
};

export default config;
