<script lang="ts">
	import { onMount } from 'svelte';

	// Fetch tool settings.
	let settings = {};

	async function getSettings() {
		// This is where the API call will happen. Currently data hardcoded in the /static folder
		const response = await fetch('/settings/quote-card.json');
		// const response = await fetch(
		// 	'https://func-inno-prod-riga-api.azurewebsites.net/api/tools/f58d04b8-ace2-492c-b1a9-01ae74c1b95b'
		// );
		if (!response.ok) {
			console.error('Error fetching quote-card.json:', response.status, response.statusText);
			return {};
		}
		return await response.json();
	}

	// function getId() {
	// 	// TODO: Get ID from URL to pass into fetch request
	// 	// window.location
	// }

	onMount(() => {
		(async () => {
			settings = await getSettings();
			console.log(settings);
		})();
	});
</script>

<div>Hello from the quote-card tool with the settings:</div>
{#each Object.entries(settings) as setting}
	<div>{setting[0]}: {setting[1]}</div>
{/each}
