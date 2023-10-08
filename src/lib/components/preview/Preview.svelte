<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { settings, settingsEncoded, previewWidth, previewHeight } from '$lib/stores';
	import config from '../riga-tool.config.js';

	// Get settings store and encode for iframe url params
	$: $settingsEncoded = encodeURIComponent(JSON.stringify($settings));

	// Manage preview sizing and resizing
	let w = 0;
	let h = 0;

	function adaptSize() {
		$previewWidth = w;
		$previewHeight = h;
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

{#if config.ui}
	<div class="m-4 h-full max-h-[500px] md:max-w-[750px]" bind:clientWidth={w} bind:clientHeight={h}>
		<div
			class="shadow-lg outline outline-gray-200"
			style="width: {$previewWidth}px; height: {$previewHeight}px"
		>
			<iframe
				src={`${$page.url.origin}/index?settings=${$settingsEncoded}`}
				width="100%"
				height="{$previewHeight}px"
				frameborder="0"
				title="tool-ui"
			/>
		</div>
	</div>
{:else}
	<div class="m-4 px-4 text-sm font-light text-gray-400">This tool does not provide a UI</div>
{/if}
