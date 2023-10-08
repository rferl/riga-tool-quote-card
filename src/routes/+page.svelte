<script lang="ts">
	import config from '../lib/components/riga-tool.config';
	import Title from '$lib/components/preview/Title.svelte';
	import Controls from '$lib/components/preview/Controls.svelte';
	import SettingsWrap from '$lib/components/preview/SettingsWrap.svelte';
	import Preview from '$lib/components/preview/Preview.svelte';
</script>

<div class={`base-grid ${config.ui ? 'ui-true' : 'ui-false'}`}>
	<div class="base-titles"><Title /></div>
	<div class="base-controls"><Controls /></div>
	<div class="base-settings"><SettingsWrap /></div>
	<div class="base-preview"><Preview /></div>
</div>

<style>
	/* Tailwind doesn't implement grid-areas, hence using base css here */
	.base-grid {
		display: grid;
		height: 100vh;
		overflow-y: auto;
		gap: 0 2rem;
		margin: 0 1rem;
		grid-template-columns: 100%;
	}
	.ui-true {
		grid-template-areas:
			'titles'
			'controls'
			'preview'
			'settings';
	}
	.ui-false {
		grid-template-areas:
			'titles'
			'settings';
	}

	.base-titles {
		grid-area: titles;
	}
	.base-controls {
		grid-area: controls;
	}
	.base-settings {
		grid-area: settings;
	}
	.base-preview {
		grid-area: preview;
	}

	/* 768px == tailwind md */
	@media (min-width: 768px) {
		.base-grid {
			margin: 0 4rem;
			grid-template-columns: minmax(0, 400px) minmax(0, 1fr); /* set Settings col width */
			grid-template-rows: 10% 90%; /* need height for Settings overflow to work */
			grid-template-areas:
				'titles controls'
				'settings preview';
		}
	}
</style>
