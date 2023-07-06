<!-- Typescript can be used here, but doesn't have to as 
		 tool UI's are decoupled from all else riga related -->
<script>
	// @ts-nocheck
	import { onMount } from 'svelte';
	import './tool-global.css';

	let settings = {};
	let loading = true;

	// function getId() {
	// 	// TODO: Get ID from URL to pass into fetch request
	// 	// window.location
	// }

	// This is where the API call will happen. Currently data
	// hardcoded in the /static folder
	async function getSettings(id) {
		const response = await fetch('/settings/quote-card.json');
		// Get the data with the passed in ID
		// const response = await fetch(
		// 	'https://func-inno-prod-riga-api.azurewebsites.net/api/tools/f58d04b8-ace2-492c-b1a9-01ae74c1b95b'
		// );
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
			loading = false;
		})();
	});
</script>

<!-- A wrapper div for the tool UI to adapt to the parent's dimensions -->
<div id="wrap">
	<!-- The actual tool ui (only showing when data is loaded)-->
	{#if !loading}
		<div id="tool-ui" style="background-color: {settings.quote_background_color}">
			<div id="quote-symbol" style="color: {settings.quote_symbol_color}">
				{@html settings.quote_symbol}
			</div>
			<div
				id="quote-text"
				style="font-size: {settings.quote_text_size}rem; color: {settings.quote_text_color}"
			>
				{settings.quote_text}
			</div>
		</div>
	{/if}
</div>

<style>
	/* Typical setting for the outer wrapper div to 
		 track the iframe's dimensions */
	#wrap {
		position: relative;
		width: 100%;
		height: 100%;
		overflow: auto;
	}

	/* Tool UI specific settings */
	#tool-ui {
		height: 100%;
		padding-left: 15%;
		padding-right: 5%;
	}

	#quote-symbol {
		height: 25%;
		font-size: 8rem;
		margin-left: -2rem;
	}
</style>
