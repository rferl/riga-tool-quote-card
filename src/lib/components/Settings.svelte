<script lang="ts">
	import ColorPicker from './ColorPicker.svelte';
	import DropDown from './Dropdown.svelte';
	import { tool } from '../stores/index.js'; // Required for unique element id's

	const quoteSymbolDropDown = [
		{ value: '&quot;', label: 'Standard double quotes ("")' },
		{ value: '&lsquo;&rsquo;', label: 'Single curly quotes (‘’)' },
		{ value: '&ldquo;&rdquo;', label: 'Double curly quotes (“”)' }
	];
</script>

<!-- Notes below -->
<form action="">
	<fieldset>
		<legend>Card Settings</legend>
		<div>
			<label for="quote-text">Quote text</label>
			<textarea name="quote-text" id="quote-text" cols="30" rows="2" />
		</div>
		<div>
			<DropDown tool={$tool} label="Quote symbol" list={quoteSymbolDropDown} />
		</div>
		<div>
			<label for="quote-text-size">Text size</label>
			<input type="number" name="quote-text-size" id="quote-text-size" />
		</div>
		<div>
			<ColorPicker tool={$tool} label="Text color" />
		</div>
		<div>
			<ColorPicker tool={$tool} label="Background color" />
		</div>
		<div>
			<ColorPicker tool={$tool} label="Quote symbol color" />
		</div>
	</fieldset>
</form>

<!-- 
	You can build out inputs directly in the settings component 
	or you can use pre-defined input components.
	For uniqe element attributes (id, name, for) use the utility 
	`getID($tool, label)`. In order for this to work, set the `tool` 
	readable in src/lib/stores/index.ts
-->
