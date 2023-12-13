<script>
    import {Input, Label, Select} from 'flowbite-svelte';
    import GenericForm from './GenericForm.svelte';
    import PasswordInput from './login/PasswordInput.svelte';
    import userService from "$lib/services/UserService.js";
    import {createEventDispatcher} from "svelte";

    export let action;
    export let item = null;
    let tableName = 'usuario',
        defaultClass = 'mt-2',
        user = {username: '', password: '', role: ''};
    let roles = [											//test
        {value: 'Administrador', name: 'Administrador'},
        {value: 'Estudiante', name: 'Estudiante'},
        {value: 'Profesor', name: 'Profesor'},
        {value: 'Secretario', name: 'Secretario'}
    ];
    let userServ = userService.getInstance();
    const dispatch = createEventDispatcher();

    async function createItem() {
        await userServ.createUser(
            user.username,
            user.password,
            1  //user.role
        );
        dispatch('created');
    }

    async function updateItem() {
        await userServ.updateUser(
            item.user_id,
            user.username,
            user.password,
            1  //user.role
        );
        dispatch('updated');
    }

    async function deleteItem() {
        await userServ.deleteUser(item.user_id);
        dispatch('deleted');
    }

    function resetForm() {
        user = {username: '', passsword: '', role: ''};
    }

    //TODO: Put the ''required'' in the inputs that need it too
</script>

<GenericForm {action} {createItem} {deleteItem} {resetForm} {tableName} {updateItem}>
    <div>
        <Label for="name"
        >Nombre de usuario
            <Input
                    bind:value={user.username}
                    class={defaultClass}
                    id="name"
                    placeholder="Nombre del usuario"
                    required
                    type="text"
            />
        </Label>
    </div>
    <div>
        <PasswordInput bind:password={user.password}/>
    </div>

    <div>
        <Label
        >Rol
            <Select bind:value={user.role} class="mt-2" items={roles}/>
        </Label>
    </div>
</GenericForm>
