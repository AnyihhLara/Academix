<script>
	import { Input, InputAddon, ButtonGroup, Label } from 'flowbite-svelte';
	import { UserCircleSolid } from 'flowbite-svelte-icons';
	export let username;
</script>

<Label for="user-input" class="space-y-2">
	Nombre de usuario
	<ButtonGroup class="w-full mt-2">
		<InputAddon>
			<UserCircleSolid class="w-4 h-4 text-gray-500 dark:text-gray-400" />
		</InputAddon>
		<Input id="user-input" placeholder="pgomezl" required bind:value={username}/>
	</ButtonGroup>
</Label>
