<script>
    import {goto} from '$app/navigation'
    import {onMount} from 'svelte'
    import authService from "$lib/services/AuthService.js";
    import {browser} from "$app/environment";
    import {page} from "$app/stores";
    import {view} from "$lib/stores/stores.js";

    onMount(() => {
        let authServ = authService.getInstance();
        let routes = [];
        if (browser) {
            routes = authServ.getAuthorizedRoutes();
            if (!routes.includes($page.url.pathname)) {
                $view = routes[0];
                goto($view);
            }
        }
    });
</script>
