<script>
	import { goto } from '$app/navigation';
	import { settingsEncoded, previewWidth, previewHeight } from '$lib/stores';
	import fullscreen_icon from '$lib/assets/fullscreen.svg';

	// fullscreen handler
	function fullscreen() {
		goto(`/index?settings=${$settingsEncoded}`);
	}
</script>

<div class="m-4 flex items-center border-b p-4">
	<div class="mr-4 text-sm font-light text-gray-400">
		<span class="font-bold">Size</span> (px)
	</div>
	<input
		type="number"
		name="w-ctrl"
		id="w-ctrl"
		bind:value={$previewWidth}
		class="mr-2 max-h-8 max-w-[100px] rounded border-gray-300 p-2 text-xs"
	/>
	<input
		type="number"
		name="h-ctrl"
		id="h-ctrl"
		bind:value={$previewHeight}
		class="mr-2 max-h-8 max-w-[100px] rounded border-gray-300 p-2 text-xs"
	/>
	<button on:click={fullscreen} class="flex items-center justify-center rounded p-2 text-xs"
		><img class="" src={fullscreen_icon} alt="full screen" /></button
	>
</div>
