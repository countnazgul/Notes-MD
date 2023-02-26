<script lang="ts">
	import Header from "$lib/Header.svelte";
	import About from "$lib/About.svelte";

	export let data: { csrfToken: string };
</script>

<main>
	<div>
		<Header csrfToken={data.csrfToken} />

		<slot />
	</div>

	<content>
		<About />
	</content>
</main>

<style>
	content {
		padding: 1rem 1rem 1rem 1rem;
		display: block;
	}

	/* main {
		height: 100%;
	} */
</style>
