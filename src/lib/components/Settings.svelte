<script lang="ts">
	import ColorPicker from './controls/ColorPicker.svelte';
	import DropDown from './controls/Dropdown.svelte';
	import { tool } from '../stores/index.js'; // Required for unique element id's

	// Dropdown data.
	const quoteSymbolDropDown = [
		{ value: '&quot;', label: 'Standard double quotes ("")' },
		{ value: '&lsquo;&rsquo;', label: 'Single curly quotes (‘’)' },
		{ value: '&ldquo;&rdquo;', label: 'Double curly quotes (“”)' }
	];
</script>

<!-- Notes below -->
<form action="" class="rt-form">
	<fieldset class="rt-fieldset">
		<legend class="rt-legend">Card Settings</legend>
		<div class="rt-setting w-full">
			<label for="quote-text" class="rt-label">Quote blurb</label>
			<textarea name="quote-text" id="quote-text" cols="10" rows="3" class="rt-input max-w-none" />
		</div>
		<div class="rt-setting">
			<DropDown tool={$tool} label="Quote symbol" list={quoteSymbolDropDown} />
		</div>
		<div class="rt-setting">
			<label for="quote-text-size" class="rt-label">Text size</label>
			<input type="number" name="quote-text-size" id="quote-text-size" class="rt-input" />
		</div>
		<div class="rt-setting">
			<ColorPicker tool={$tool} label="Text color" />
		</div>
		<div class="rt-setting">
			<ColorPicker tool={$tool} label="Background color" />
		</div>
		<div class="rt-setting">
			<ColorPicker tool={$tool} label="Quote symbol color" />
		</div>
	</fieldset>
</form>

<!-- You can 
	 - use pre-built `default-settings` components
	 - build your own `custom-settings` components 
	 - or build settings directly in here (within an `.rt-setting` wrapper div) -->
