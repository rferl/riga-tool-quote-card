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
<form action="" class="font-skolar-sans relative">
	<fieldset class="my-4 flex flex-wrap">
		<legend class="bg-gray-25 w-full border-y border-gray-300 px-4 py-2 font-semibold"
			>Card Settings</legend
		>
		<div class="my-2 flex w-[100%] flex-col px-4">
			<label for="quote-text" class="my-1 text-sm font-semibold text-gray-500">Quote text</label>
			<textarea
				name="quote-text"
				id="quote-text"
				cols="10"
				rows="3"
				class="bg-gray-5 rounded border-gray-200 py-[0.25rem] text-sm"
			/>
		</div>
		<div class="my-2 flex w-[50%] flex-col px-4">
			<DropDown tool={$tool} label="Quote symbol" list={quoteSymbolDropDown} />
		</div>
		<div class="my-2 flex w-[50%] flex-col px-4">
			<label for="quote-text-size" class="my-1 text-sm font-semibold text-gray-500">Text size</label
			>
			<input
				type="number"
				name="quote-text-size"
				id="quote-text-size"
				class="bg-gray-5 max-w-[8rem] rounded border-gray-200 py-[0.25rem] text-sm"
			/>
		</div>
		<div class="my-2 flex w-[50%] flex-col px-4">
			<ColorPicker tool={$tool} label="Text color" />
		</div>
		<div class="my-2 flex w-[50%] flex-col px-4">
			<ColorPicker tool={$tool} label="Background color" />
		</div>
		<div class="my-2 flex w-[50%] flex-col px-4">
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
