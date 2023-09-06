<!-- This is the Settings component written by the tool developer. -->

<script lang="ts">
	import { onMount } from 'svelte';
	import ColorPicker from './controls/ColorPicker.svelte';
	import DropDown from './controls/Dropdown.svelte';
	import config from './riga-tool.config.js';
	// TODO: load types from an external lib both the
	// editor and the riga settings component can access

	// Helper funcs
	function decodeHtml(html: string) {
		if (typeof document === 'undefined') return html;
		var txt = document.createElement('textarea');
		txt.innerHTML = html;
		return txt.value;
	}

	// `settings` store as only component prop.
	// export let settings: SettingsWritable;
	export let settings: any;

	// Define default settings in config yaml. Passed in settings
	// will overwrite these default settings.
	const defaultSettings = config.settings;

	// Use isLoaded in conjunction with the settings
	// merge to wait for the render.
	let isLoaded = false;
	onMount(async () => {
		$settings = { ...defaultSettings, ...$settings };
		isLoaded = true;
	});

	// Dropdown data.
	const quoteSymbolDropDown = [
		{ value: '&#10078;', label: decodeHtml('&#10078;') },
		{ value: '&#10077;', label: decodeHtml('&#10077;') },
		{ value: '&#10076;', label: decodeHtml('&#10076;') },
		{ value: '&#10075;', label: decodeHtml('&#10075;') }
	];
</script>

{#if isLoaded}
	<form class="rt-form">
		<fieldset class="rt-fieldset">
			<legend class="rt-legend">Card Settings</legend>
			<div class="rt-setting w-full">
				<label for="quote-text" class="rt-label">Quote text</label>
				<textarea
					name="quote-text"
					id="quote-text"
					cols="10"
					rows="3"
					class="rt-input font-skolar max-w-none text-gray-500"
					bind:value={$settings.quote_text}
				/>
			</div>
			<div class="rt-setting">
				<DropDown
					label="Quote symbol"
					list={quoteSymbolDropDown}
					{settings}
					setting={'quote_symbol'}
				/>
			</div>
			<div class="rt-setting">
				<label for="quote-text-size" class="rt-label">Text size</label>
				<input
					type="number"
					name="quote-text-size"
					id="quote-text-size"
					class="rt-input"
					bind:value={$settings.quote_text_size}
				/>
			</div>
			<div class="rt-setting">
				<ColorPicker label="Text color" {settings} setting="quote_text_color" />
			</div>
			<div class="rt-setting">
				<ColorPicker label="Background color" {settings} setting="quote_background_color" />
			</div>
			<div class="rt-setting">
				<ColorPicker label="Quote symbol color" {settings} setting="quote_symbol_color" />
			</div>
		</fieldset>
	</form>
{/if}
