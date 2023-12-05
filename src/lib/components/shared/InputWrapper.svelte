<script>
	import { Label } from 'flowbite-svelte';
	export let forLabel, classLabel, colorLabel;
</script>

<div>
	<Label for={forLabel} class={classLabel} color={colorLabel}>
		<span><slot name="label-text" /></span>
		<slot />
	</Label>
</div>
