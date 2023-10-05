<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { settings } from '$lib/stores';
	import fullscreen_icon from '$lib/assets/fullscreen.svg';
	import SettingsWrap from '$lib/components/wrap/SettingsWrap.svelte';

	// Get settings store and encode for iframe url params
	$: encodedSettings = encodeURIComponent(JSON.stringify($settings));

	// fullscreen handler
	function fullscreen() {
		goto(`/index?settings=${encodedSettings}`);
	}

	// Set up simple viewing pane UI
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
	<div class="mb-8 flex items-center">
		<input
			type="number"
			name="w-ctrl"
			id="w-ctrl"
			bind:value={w_editor}
			class="mr-2 max-w-[100px] rounded p-2 text-xs"
		/>
		<input
			type="number"
			name="h-ctrl"
			id="h-ctrl"
			bind:value={h_editor}
			class="mr-2 max-w-[100px] rounded p-2 text-xs"
		/>
		<button on:click={fullscreen} class="flex items-center justify-center rounded p-2 text-xs"
			><img class="" src={fullscreen_icon} alt="full screen" /></button
		>
	</div>
	<div class="flex flex-col md:flex-row">
		<div class="w-5/6 md:mr-4 md:w-3/5" bind:clientWidth={w} bind:clientHeight={h}>
			<div class="outline outline-gray-200" style="width: {w_editor}px; height: {h_editor}px">
				<iframe
					src={`${$page.url.origin}/index?settings=${encodedSettings}`}
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
