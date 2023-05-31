<script lang="ts">
	import { onMount } from 'svelte';

	// Fetch tool settings.
	let settings = {};

	async function getSettings() {
		const response = await fetch('/settings/quote-card.json');
		if (!response.ok) {
			console.error('Error fetching quote-card.json:', response.status, response.statusText);
			return {};
		}
		return await response.json();
	}

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
