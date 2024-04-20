<script>
	export let divClass = 'ml-6 pt-4';
</script>

<div class={divClass}>
	<h1 class="xs:text-xl lg:text-2xl font-semibold text-primary-950 dark:text-primary-100">
		<slot />
	</h1>
</div>
