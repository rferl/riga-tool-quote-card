<script lang="ts">
	import { getID } from '../utils/index.js';

	type DropdownOption = {
		value: string;
		label: string;
	};

	export let tool: string; // required for unique element id's
	export let label: string = 'Dropdown';
	export let list: DropdownOption[] = [
		{ value: 'one', label: 'one' },
		{ value: 'two', label: 'two' }
	];

	// Required for unique element id's:
	const id = getID(tool, label);
</script>

<label for={id} class="my-1 text-sm font-semibold text-gray-500">{label}</label>
<select name={id} {id} class="bg-gray-5 max-w-[8rem] rounded border-gray-200 py-[0.25rem] text-sm">
	{#each list as item}
		<option value={item.value}>{item.label}</option>
	{/each}
</select>
