<script>
	import { Button, Modal, Input, NumberInput } from 'flowbite-svelte';
	import InputWrapper from "$lib/components/InputWrapper.svelte";

	export let showModifyModal;
	export let date;
	export let participants;
	export let activityToModify;

	function nonnegativeparticipants() {
		if (participants < 0) {
			participants = 0;
		}
	}
</script>

<Modal bind:open={showModifyModal} size="xs" autoclose={false} class="w-full" on:close>
	<form class="flex flex-col space-y-6" action="" on:submit|preventDefault>
		<h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">
			Modificar actividad deportiva "{activityToModify.name}"
		</h3>

		<InputWrapper>
			<span slot="label-text">Fecha</span>
			<Input type="date" color="green" required bind:value={date} />
		</InputWrapper>

		<InputWrapper>
			<span slot="label-text">Cantidad de participantes</span>
			<NumberInput
				color="green"
				required
				bind:value={participants}
				on:change={nonnegativeparticipants}
			/>
		</InputWrapper>

		<Button type="submit" class="w-full1" color="primary">Modificar</Button>
	</form>
</Modal>
