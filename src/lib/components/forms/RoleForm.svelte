<script>
	import { Input, Label } from 'flowbite-svelte';
	import GenericForm from './GenericForm.svelte';
	import roleService from '$lib/services/RoleService.js';
	import { createEventDispatcher, onMount } from 'svelte';
	import { t } from '$lib/stores/stores.js';

	onMount(async () => await resetForm());

	export let action;
	export let item = null;
	let tableName = 'Rol',
		defaultClass = 'mt-2',
		role = { name: '' };
	let roleServ = roleService.getInstance();
	const dispatch = createEventDispatcher();

	async function createItem() {
		await roleServ.createRole(role.name);
		dispatch('created');
	}

	async function updateItem() {
		await roleServ.updateRole(item.role_id, role.name);
		dispatch('updated');
	}

	async function deleteItem() {
		await roleServ.deleteRole(item.role_id);
		dispatch('deleted');
	}

	async function resetForm() {
		console.log('reset');
		if (item) {
			let { role_id, role_name } = await roleServ.getRole(item.role_id);
			item.role_id = role_id;
			item.role_name = role_name;
			console.log(item);
			role.name = item.role_name;
		} else {
			role = { name: '' };
		}
	}
</script>

<GenericForm {action} {createItem} {deleteItem} {resetForm} {tableName} {updateItem}>
	<div>
		<Label for="name"
			>{$t('Nombre')}
			<Input
				bind:value={role.name}
				class={defaultClass}
				id="name"
				placeholder={$t('Nombre del rol')}
				required
				type="text"
			/>
		</Label>
	</div>
</GenericForm>
