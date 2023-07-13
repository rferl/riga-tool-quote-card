<!-- This component is just emulating the behavior of the Editor:
	   (1) passing a settings object into the Settings component and 
		 (2) stringifying the object before persisting it in storage -->

<script>import Settings from "../Settings.svelte";
import { writable } from "svelte/store";
const settings = writable({
  quote_text: "I am a quote",
  quote_text_size: 5
});
function save() {
  const settings_json = {};
  for (const [key, value] of Object.entries($settings)) {
    console.log(key, value);
    settings_json[key] = value;
  }
  console.log(JSON.stringify(settings_json));
}
</script>

<div class=" font-skolar-sans m-4 flex items-center justify-between">
	<div class="text-gray-400">Settings</div>
	<button class="btn-base" on:click={save}>Save</button>
</div>
<Settings {settings} />
