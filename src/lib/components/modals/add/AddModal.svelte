<script>
	import { Button, Modal, Input, NumberInput } from 'flowbite-svelte';
	import InputWrapper from "$lib/components/InputWrapper.svelte";

	export let showAddModal;
	export let name;
	export let date;
	export let participants;

	function nonnegativeparticipants() {
		if (participants < 0) {
			participants = 0;
		}
	}
</script>

<Modal bind:open={showAddModal} size="xs" autoclose={false} class="w-full" on:close>
	<form class="flex flex-col space-y-6" action="" on:submit|preventDefault>
		<h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">
			Agregar actividad deportiva
		</h3>

		<InputWrapper>
			<span slot="label-text">Nombre</span>
			<Input color="green" required bind:value={name} />
		</InputWrapper>

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

		<Button type="submit" class="w-full" color="primary">Agregar</Button>
	</form>
</Modal>
