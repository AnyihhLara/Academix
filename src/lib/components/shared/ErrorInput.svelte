<script>
	import { Helper, Input } from "flowbite-svelte";
	import InputWrapper from '$lib/components/shared/InputWrapper.svelte';
  export let placeholderInput;
</script>

<InputWrapper forLabel="error" classLabel="block mb-2" colorLabel="red">
  <Input id='error' color='red' placeholder={placeholderInput} />
    <slot name="label-input"/>
    <Helper class='mt-2' color='red'><span class="font-medium">Error!</span> <slot name="error-message"/></Helper>
</InputWrapper>
