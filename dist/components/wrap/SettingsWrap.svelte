<!-- This component
		 (1) emulates the behavior of the Editor by being the conduit for Settings props 
		 (2) prepares tool UI preview of tools build in `/index` route -->
<script>import Settings from "../Settings.svelte";
import { writable } from "svelte/store";
import { settings } from "../../stores";
const id = "";
const output = writable({ code: "" });
</script>

<div class=" font-skolar-sans m-4 flex items-center justify-between">
	<div class="text-gray-400">Settings preview</div>
</div>
<Settings {id} {settings} {output} />
