import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [sveltekit()],
	// TODO for dev only - remove for production
	build: {
		minify: false
	},
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
