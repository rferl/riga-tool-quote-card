<!-- Typescript can be used here, but don't have to be as tool UI's are decoupled -->
<script>
	import { onMount } from 'svelte';

	let settings = {};
	let loading = true;

	// This is where the API call will happen. Currently data
	// hardcoded in the /static folder
	async function getSettings() {
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
			loading = false;
		})();
	});
</script>

<!-- Mimicking the iframe during dev - will go  -->
<div id="iframe-double">
	<!-- A wrapper div for the tool UI to adapt to the parent's dimensions -->
	<div id="wrap">
		<!-- The actual tool ui (only showing when data is loaded)-->
		{#if !loading}
			<div id="tool-ui" style="background-color: {settings.background_color}">
				<div id="quote-symbol" style="color: {settings.quote_symbol_color}">
					{@html settings.quote_symbol}
				</div>
				<div
					id="quote-text"
					style="font-size: {settings.text_size}rem; color: {settings.text_color}"
				>
					{settings.quote_text}
				</div>
			</div>
		{/if}
	</div>
</div>

<style>
	/* This would come from the iframe */
	#iframe-double {
		width: 70%;
		height: 400px;
		margin: 4rem auto;
		outline: 1px solid #ccc;
	}

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
