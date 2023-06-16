<!-- This is the Settings component written by the tool developer. -->

<script>import ColorPicker from "./controls/ColorPicker.svelte";
import DropDown from "./controls/Dropdown.svelte";
export let settings;
$settings.quote_symbol_color = "#0000ff";
const quoteSymbolDropDown = [
  { value: "&quot;", label: 'Standard double quotes ("")' },
  { value: "&lsquo;&rsquo;", label: "Single curly quotes (\u2018\u2019)" },
  { value: "&ldquo;&rdquo;", label: "Double curly quotes (\u201C\u201D)" }
];
</script>

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
			<ColorPicker label="Text color" {settings} setting="text_color" />
		</div>
		<div class="rt-setting">
			<ColorPicker label="Background color" {settings} setting="background_color" />
		</div>
		<div class="rt-setting">
			<ColorPicker label="Quote symbol color" {settings} setting="quote_symbol_color" />
		</div>
	</fieldset>
</form>
