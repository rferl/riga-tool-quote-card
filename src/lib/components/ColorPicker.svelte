<script lang="ts">
	import { onMount } from 'svelte';
	import { getID } from '../utils/index.js';

	export let tool: string; // required for unique element id's
	export let label: string = 'Label';

	// Required for unique element id's:
	const id = getID(tool, label);

	let color: string = '#cccccc';
	let hexInput = '';

	// Helper function for hex validation.
	function isHexColor(hex: string): boolean {
		return /^#(?:[0-9a-fA-F]{3}){1,2}$/.test(hex);
	}

	// Update the color when a valid hex value is entered.
	function updateColor() {
		if (!isHexColor(hexInput)) {
			hexInput = color;
			return;
		}
		color = hexInput;
	}

	onMount(() => {
		hexInput = color;
	});
</script>

<label for={`${id}-hex`}>{label}</label>
<input
	type="text"
	name={`${id}-hex`}
	id={`${id}-hex`}
	bind:value={hexInput}
	on:change={updateColor}
/>
<input
	type="color"
	name={`${id}-color`}
	id={`${id}-color`}
	bind:value={color}
	on:change={() => (hexInput = color)}
/>
