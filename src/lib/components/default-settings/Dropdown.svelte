<script lang="ts">
	import { getID } from '../../utils/index.js';

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

<label for={id} class="rt-label">{label}</label>
<select name={id} {id} class="rt-input">
	{#each list as item}
		<option value={item.value}>{item.label}</option>
	{/each}
</select>
