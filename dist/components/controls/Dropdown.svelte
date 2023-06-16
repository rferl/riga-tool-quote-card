<script>import { setID } from "../../utils/index.js";
export let label = "Dropdown";
export let list = [
  { value: "one", label: "one" },
  { value: "two", label: "two" }
];
export let settings;
export let setting;
const id = setID();
</script>

<label for={id} class="rt-label">{label}</label>
<select name={id} {id} class="rt-input" bind:value={$settings[setting]}>
	{#each list as item}
		<option value={item.value}>{item.label}</option>
	{/each}
</select>
