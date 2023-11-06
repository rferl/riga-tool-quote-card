<!-- This component
		 (1) emulates the behavior of the Editor by being the conduit for Settings props 
		 (2) prepares tool UI preview of tools build in `/index` route -->
<script lang="ts">
	import Settings from '$lib/components/Settings.svelte';
	import { settings, output } from '$lib/stores';

	// Emulate required but herein unused props
	const id = '';
</script>

<div class="h-full p-4">
	<div class="h-full overflow-y-auto">
		<div class="border border-gray-300 shadow-lg">
			<div class="font-skolar-sans my-3 px-4 font-extralight text-gray-400">Settings preview</div>
			<Settings {id} {settings} {output} />
		</div>
	</div>
</div>
