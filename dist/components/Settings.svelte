<!-- This is the Settings component written by the tool developer. -->

<script>import { onMount } from "svelte";
import ColorPicker from "./controls/ColorPicker.svelte";
import DropDown from "./controls/Dropdown.svelte";
function decodeHtml(html) {
  if (typeof document === "undefined")
    return html;
  var txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}
export let settings;
const defaultSettings = {
  quote_text: "Hello",
  quote_symbol: "&#10078;",
  quote_text_size: 3,
  quote_text_color: "#666666",
  quote_symbol_color: "#f0f0f0",
  quote_background_color: "#fcfcfc"
};
let isLoaded = false;
onMount(async () => {
  $settings = { ...defaultSettings, ...$settings };
  isLoaded = true;
});
const quoteSymbolDropDown = [
  { value: "&#10078;", label: decodeHtml("&#10078;") },
  { value: "&#10077;", label: decodeHtml("&#10077;") },
  { value: "&#10076;", label: decodeHtml("&#10076;") },
  { value: "&#10075;", label: decodeHtml("&#10075;") }
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
