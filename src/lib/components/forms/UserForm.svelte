<script>
	import { Input, Label, NumberInput, Select } from 'flowbite-svelte';
	import GenericForm from './GenericForm.svelte';
	import PasswordInput from './login/PasswordInput.svelte';

	export let action;
	let tableName = 'usuario',
		defaultClass = 'mt-2',
		user = { username: '', passsword: '', role: '' };
	let roles = [											//test
		{ value: 'Administrador', name: 'Administrador' },
		{ value: 'Estudiante', name: 'Estudiante' },
		{ value: 'Profesor', name: 'Profesor' },
		{ value: 'Secretaria', name: 'Secretaria' }
	];
	function createItem() {}
	function updateItem() {}
	function deleteItem() {}
	function resetForm() {
		user = { username: '', passsword: '', role: '' };
	}
</script>

<GenericForm {action} {tableName} {createItem} {updateItem} {deleteItem} {resetForm}>
	<div>
		<Label for="name"
			>Nombre de usuario
			<Input
				type="text"
				id="name"
				placeholder="Nombre del usuario"
				class={defaultClass}
				bind:value={user.username}
				required
			/>
		</Label>
	</div>
	<div>
		<PasswordInput password={user.passsword} />
	</div>

	<div>
		<Label
			>Rol
			<Select class="mt-2" items={roles} bind:value={user.role} required />
		</Label>
	</div>
</GenericForm>
