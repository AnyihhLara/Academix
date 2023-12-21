<script>
	import { createEventDispatcher } from 'svelte';
	import { Button, Checkbox, Dropdown, DropdownItem } from 'flowbite-svelte';
	import { FilterSolid, ChevronLeftSolid } from 'flowbite-svelte-icons';

	export let filters = [{ name: '', key: '', options: [], selectedOptions: [] }];

	let dropdownOpen = false;
	const dispatch = createEventDispatcher();

	function handleCheckboxChange(filterIndex, option) {
		const filter = filters[filterIndex];
		const isSelected = filter.selectedOptions.includes(option);

		if (!isSelected) {
			filter.selectedOptions = [...filter.selectedOptions, option];
		} else {
			filter.selectedOptions = filter.selectedOptions.filter(
				(selectedOption) => selectedOption !== option
			);
		}

		filters = [...filters];
	}
</script>

<Button size="sm">Filtros<FilterSolid class="w-3 h-3 ms-2 text-white dark:text-white" /></Button>
<Dropdown bind:open={dropdownOpen}>
	{#if filters}
		{#each filters as filter, filterIndex}
			<DropdownItem class="flex items-center justify-between">
				<ChevronLeftSolid class="w-3 h-3 me-2 text-primary-700 dark:text-white" />{filter.name}
			</DropdownItem>
			<Dropdown placement="left-start" class="w-44 p-3 space-y-3 text-sm overflow-y-auto max-h-64 " if={dropdownOpen}>
				{#each filter.options as option}
					<li class="rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
						<Checkbox
							checked={filter.selectedOptions.includes(option)}
							on:change={() => {
								handleCheckboxChange(filterIndex, option);
								dispatch('change');
							}}
						>
							{option}
						</Checkbox>
					</li>
				{/each}
			</Dropdown>
		{/each}
	{/if}
</Dropdown>
