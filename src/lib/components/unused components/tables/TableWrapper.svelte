<script>
	export let showAddButton = false;
</script>

<div class="mt-6 mx-3">
	<div class="flex justify-between mb-6">
		<h2 class="m-3 font-medium block text-green-900 dark:text-teal-100 text-xl">
			<slot name="h2-text" />
		</h2>
		{#if showAddButton}
			<slot name="add-button" />
		{/if}
	</div>
	<slot />
</div>
