<script>
    import {loggedIn, view} from "$lib/stores/stores.js";
    import {goto} from "$app/navigation";
    import {onMount} from "svelte";

    onMount(async () => {
        if ($view === '/' || !$loggedIn) {
            $view = '/auth/login';
        }
        await goto($view);
    })
</script>
