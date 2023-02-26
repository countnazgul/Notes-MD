<script lang="ts">
	import { page } from "$app/stores";

	$: apiKey = "";

	async function generateAPIKey() {
		const key = await fetch("/api/user", { method: "POST" }).then((r) => r.text());
		apiKey = key;
	}
</script>

<profile>
	<profile-attribute>
		<div>Name</div>
		<div>{$page.data.session?.user?.name}</div>
	</profile-attribute>
	<profile-attribute>
		<div>Email</div>
		<div>{$page.data.session?.user?.email}</div>
	</profile-attribute>

	<button class="generate" on:click={generateAPIKey}>(Re)Generate API Key</button>
	<api-key>
		{apiKey}
	</api-key>
</profile>

<style>
	profile {
		display: grid;
		grid-template-rows: max-content max-content max-content max-content;
		gap: 20px;
		padding-top: 10px;
		padding-left: 10px;
		padding-right: 10px;
	}

	profile-attribute {
		display: flex;
		flex-direction: row;
		gap: 10px;
	}

	.generate {
		width: fit-content;
	}

	api-key {
		margin-right: 20px;
		word-break: break-word;
		line-break: anywhere;
	}
</style>
