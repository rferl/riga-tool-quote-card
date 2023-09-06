<!-- Typescript can be used here, but doesn't have to as 
		 tool UI's are decoupled from all else riga related -->
<script>
	// @ts-nocheck
	import { onMount } from 'svelte';
	import './tool-global.css';

	let id = '';
	let settings = null;
	let loading = true;

	function getId() {
		// The tool instance id will be passed through as URL param
		// of the iframe source which we fetch here.
		const urlParams = new URLSearchParams(window.location.search);
		const toolInstanceId = urlParams.get('tiid');
		return toolInstanceId || '';
	}

	async function getSettings(id) {
		// Couple of options to get the data:
		// (1) Get the data from the hardcoded test data
		// const response = await fetch('/settings/quote-card.json');
		// (2) Get the data with a simple fetch (not working with strict CORS)
		const response = await fetch(
			`https://func-inno-prod-riga-api.azurewebsites.net/api/tools/${id}`
		);

		// Results for (1) and (2)
		if (!response.ok) {
			console.error("Error fetching the tool's config json:", response.status, response.statusText);
			return null;
		}
		const responseData = await response.json();

		// return responseData ?? null; // (1)
		return responseData?.tool?.settings ?? null; // (2)
	}

	onMount(() => {
		(async () => {
			id = getId();
			// id = '64b75565-f0b1-49c4-a77a-44f22040e42d'; // test ID
			settings = await getSettings(id);
			loading = false;
		})();
	});
</script>

<!-- A wrapper div for the tool UI to adapt to the parent's dimensions -->
<div id="wrap">
	<!-- The actual tool ui (only showing when data is loaded)-->
	{#if !loading}
		{#if !id}
			<!-- {#if false} -->
			<div class="note">Can't find a valid toolInstanceId in the pathname</div>
		{:else if !settings}
			<!-- {:else if false} -->
			<div class="note">Sorry, can't find any settings for toolInstanceId "{id}""</div>
		{:else}
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
	.note {
		margin: 1rem;
		color: #aaa;
	}

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
