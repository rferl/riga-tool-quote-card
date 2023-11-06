<script lang="ts">
	import { output } from '$lib/stores';
</script>

<div class="bg-gray-25 m-4 p-4 pb-2 shadow-lg outline outline-gray-100">
	<div class="font-bold text-gray-500">{$output.title}</div>
	<div class="my-1 text-sm text-gray-400">{$output.description}</div>
	<div class="my-2 rounded border border-gray-100 bg-white p-3 text-xs text-gray-500">
		{$output.code}
	</div>
	<div class="font-skolar-sans mt-4 text-right font-extralight text-gray-400">Output preview</div>
</div>
