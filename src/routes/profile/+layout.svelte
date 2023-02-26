<script lang="ts">
	import Header from "$lib/Header.svelte";

	export let data: { csrfToken: string };
</script>

<Header csrfToken={data.csrfToken} />
<slot />
