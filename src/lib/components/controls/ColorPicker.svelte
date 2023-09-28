<script lang="ts">
	import { onMount } from 'svelte';
	import { setID } from '../../utils/index.js';
	import type { SettingsWritable } from '$types/index.js';

	export let label: string = 'Label';
	export let settings: SettingsWritable;
	export let setting: string;

	// Required for unique element id's:
	const id = setID();

	// Init colors to base colour if no setting property defined.
	let color: string = $settings[setting] ? String($settings[setting]) : '#cccccc';
	let hexInput = '';

	// Helper function for hex validation.
	function isHexColor(hex: string): boolean {
		return /^#(?:[0-9a-fA-F]{3}){1,2}$/.test(hex);
	}

	function updateSetting() {
		$settings[setting] = color;
	}

	// Update the color when a valid hex value is entered.
	function updateColor() {
		if (!isHexColor(hexInput)) {
			hexInput = color;
			return;
		}
		color = hexInput;
		updateSetting();
	}

	onMount(() => {
		hexInput = color;
	});
</script>

<label for={`${id}-hex`} class="rt-label">{label}</label>
<div class="flex items-center">
	<input
		type="text"
		name={`${id}-hex`}
		id={`${id}-hex`}
		class="rt-input w-full"
		bind:value={hexInput}
		on:change={updateColor}
	/>
	<!-- Actual color picker input transparent in favour of a fully 
		   rounded div that is more styleable than the color input -->
	<div class="relative -m-6">
		<div
			class="absolute top-0 h-4 w-4 -translate-y-1/2 rounded-full border border-gray-200"
			style="background: {color}"
		/>
		<input
			type="color"
			name={`${id}-color`}
			id={`${id}-color`}
			class="absolute top-0 h-4 w-4 -translate-y-1/2 opacity-0"
			bind:value={color}
			on:change={() => {
				hexInput = color;
				updateSetting();
			}}
		/>
	</div>
</div>
