<!-- This component is just emulating the behavior of the Editor:
	   (1) passing a settings object into the Settings component and 
		 (2) stringifying the object before persisting it in storage -->

<script lang="ts">
	import Settings from '$lib/components/Settings.svelte';
	import { writable } from 'svelte/store';
	import type { SettingsWritable } from '$types/index.js';

	// `settings` can but don't have to be value initialised.
	const settings: SettingsWritable = writable({
		quote_text: 'I am a quote'
	});

	function save() {
		// Build JSON settings object to send on.
		const settings_json: { [key: string]: any } = {};
		for (const [key, value] of Object.entries($settings)) {
			console.log(key, value);
			settings_json[key] = value;
		}
		console.log(JSON.stringify(settings_json));
		// TODO send settings to wherever
	}
</script>

<div class=" font-skolar-sans m-4 flex items-center justify-between">
	<div class="text-gray-400">Settings</div>
	<button class="btn-base" on:click={save}>Save</button>
</div>
<Settings {settings} />
