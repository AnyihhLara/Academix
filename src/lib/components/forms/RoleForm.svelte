<script>
    import { Input, Label } from 'flowbite-svelte';
    import GenericForm from './GenericForm.svelte';
    import roleService from '$lib/services/RoleService.js';
    import { createEventDispatcher } from 'svelte';

    export let action;
	export let item = null;
	let tableName = 'rol',
		defaultClass = 'mt-2',
		role = { name: '' };
	let roleServ = roleService.getInstance();
	const dispatch = createEventDispatcher();


	async function createItem() {
		await roleServ.createRole(role.name);
		dispatch('created');
	}

	async function updateItem() {
		await roleServ.updateRole(
			item.role_id,
			role.name
		);
		dispatch('updated');
	}

	async function deleteItem() {
		await roleServ.deleteRole(item.role_id);
		dispatch('deleted');
	}

	function resetForm() {
		role = { name: '' };
	}
</script>

<GenericForm {action} {createItem} {deleteItem} {resetForm} {tableName} {updateItem}>
	<div>
		<Label for='name'
		>Nombre
			<Input
				bind:value={role.name}
				class={defaultClass}
				id='name'
				placeholder='Nombre del rol'
				required
				type='text'
			/>
		</Label>
	</div>
</GenericForm>
