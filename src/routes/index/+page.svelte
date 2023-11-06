<!-- Typescript can be used here, but doesn't have to as 
		 tool UI's are decoupled from all else riga related -->
<script>
	// @ts-nocheck
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import './tool-global.css';

	// Production
	let id = '';
	let settings = null;
	let loading = true;
	let token = null;

	async function getAccessToken() {
		const response = await fetch('/api/getAccessToken');
		if (response.ok) {
			const data = await response.json();
			token = data.access_token;
		} else {
			console.error('Error fetching the access token');
		}
	}

	// Production
	function getId() {
		// The tool instance id will be passed through as URL param
		// of the iframe source which we fetch here.
		const urlParams = new URLSearchParams(window.location.search);
		const toolInstanceId = urlParams.get('tiid');
		return toolInstanceId || '';
	}

	async function getSettings(id) {
		if (!token) {
			await getAccessToken(); // Get the access token before proceeding
		}

		// Add the Authorization header with the token
		const headers = {
			Authorization: `Bearer ${token}`
		};

		//Get the data with a simple fetch (not working with strict CORS)
		const response = await fetch(`${import.meta.env.VITE_RIGA_API_ENDPOINT}/api/tools/${id}`, {
			headers
		});

		if (!response.ok) {
			console.error("Error fetching the tool's config json:", response.status, response.statusText);
			return null;
		}

		const responseData = await response.json();

		return responseData?.tool?.settings ?? null;
	}

	onMount(async () => {
		if (import.meta.env.DEV) {
			// Development (grab settings from preview iframe)
			id = true;
			settings = JSON.parse($page.url.searchParams.get('settings'));
		} else {
			// Production (grab settings from API)
			id = getId();
			settings = await getSettings(id);
		}

		loading = false;
	});
</script>

<!-- A wrapper div for the tool UI to adapt to the parent's dimensions -->
<div id="wrap">
	<!-- The actual tool ui (only showing when data is loaded)-->
	{#if !loading}
		{#if !id}
			<div class="note">Can't find a valid toolInstanceId in the pathname</div>
		{:else if !settings}
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
