<script lang="ts">
	// Loading the tool's config to control the hosted origin
	import config from '../riga-tool.config.js';
	import SettingsWrap from '$lib/components/wrap/SettingsWrap.svelte';
	import { onMount } from 'svelte';

	// This is a temporary editor markup. Ultimately we want to have the
	// same markup as on the Editor's /editor page. For that we need to
	// get a library set up to use in the Editor and the base tool repo.
	let w: number;
	let h: number;

	let w_editor: number;
	let h_editor: number;

	function adaptSize() {
		w_editor = w;
		h_editor = h;
	}
	function resize() {
		// Ensure that the layout is updated before calling `adaptSize`
		requestAnimationFrame(adaptSize);
	}

	onMount(() => {
		resize();
		window.addEventListener('resize', resize);
		return () => {
			window.removeEventListener('resize', resize);
		};
	});
</script>

<div class="m-8">
	<div class="mb-8">
		<input
			type="number"
			name="w-ctrl"
			id="w-ctrl"
			bind:value={w_editor}
			class="max-w-[100px] rounded p-2 text-xs"
		/>
		<input
			type="number"
			name="h-ctrl"
			id="h-ctrl"
			bind:value={h_editor}
			class="max-w-[100px] rounded p-2 text-xs"
		/>
	</div>
	<div class="flex flex-col md:flex-row">
		<div class="w-5/6 md:mr-4 md:w-3/5" bind:clientWidth={w} bind:clientHeight={h}>
			<div class="outline outline-gray-200" style="width: {w_editor}px; height: {h_editor}px">
				<iframe
					src={config.url}
					width="100%"
					height="{h_editor}px"
					frameborder="0"
					title="tool-ui"
				/>
			</div>
		</div>
		<div class="w-5/6 border border-gray-100 shadow-xl md:w-2/5">
			<SettingsWrap />
		</div>
	</div>
</div>
