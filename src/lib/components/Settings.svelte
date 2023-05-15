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
<!-- <form action="" class="font-skolar-sans relative"> -->
<form action="" class="rt-form">
	<fieldset class="rt-fieldset">
		<legend class="rt-legend">Card Settings</legend>
		<div class="rt-control w-full">
			<label for="quote-text" class="rt-label">Quote text</label>
			<textarea name="quote-text" id="quote-text" cols="10" rows="3" class="rt-input max-w-none" />
		</div>
		<div class="rt-control">
			<DropDown tool={$tool} label="Quote symbol" list={quoteSymbolDropDown} />
		</div>
		<div class="rt-control">
			<label for="quote-text-size" class="rt-label">Text size</label>
			<input type="number" name="quote-text-size" id="quote-text-size" class="rt-input" />
		</div>
		<div class="rt-control">
			<ColorPicker tool={$tool} label="Text color" />
		</div>
		<div class="rt-control">
			<ColorPicker tool={$tool} label="Background color" />
		</div>
		<div class="rt-control">
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
