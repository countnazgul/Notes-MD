<script lang="ts">
	import { page } from "$app/stores";

	import SignInButton from "./SignInButton.svelte";
	import GitHub from "$lib/icons/GitHub.svelte";
	import { goto } from "$app/navigation";

	export let csrfToken: string;
</script>

<header>
	<div class="signedInStatus">
		<p class="nojs-show loaded">
			{#if $page.data.session}
				<div class="signed">
					{#if $page.data.session.user?.image}
						<div on:click={() => goto("/profile")} on:keydown={() => goto("/profile")}>
							<span
								style="background-image: url('{$page.data.session.user.image}')"
								class="avatar"
							/>
						</div>
					{/if}
					<span class="signedInText">
						<small>Signed in as</small><br />
						<strong>{$page.data.session.user?.email ?? $page.data.session.user?.name}</strong>
					</span>
					<form action="/auth/signout" method="POST">
						<input name="csrfToken" type="hidden" value={csrfToken} />
						<button type="submit">Sign out</button>
					</form>
				</div>
			{:else}
				<not-signed>
					<a
						href="https://github.com"
						class="source-code"
						title="Source code"
						target="_blank"
						rel="noreferrer"><GitHub fill="white" /></a
					>
					<form action="/auth/signin/github" method="POST">
						<input name="csrfToken" type="hidden" value={csrfToken} />
						<input type="hidden" name="callbackUrl" value={$page.url.origin} />
						<SignInButton />
					</form>
				</not-signed>
			{/if}
		</p>
	</div>
	{#if $page.data.session}
		<nav>
			{#if $page.url.pathname === "/"}
				<a href="/notes">Notes</a>
			{/if}

			{#if $page.url.pathname.split("/")[1] === "notes"}
				<a href="/">Home</a>
			{/if}

			{#if $page.url.pathname === "/profile"}
				<a href="/">Home</a>
				<a href="/notes">Notes</a>
			{/if}
		</nav>
	{/if}
</header>

<style>
	not-signed {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.signed {
		display: grid;
		grid-template-columns: max-content max-content max-content;
		gap: 15px;
	}

	.source-code {
		width: 40px;
		opacity: 1;
	}

	not-signed > form {
		flex: 1;
	}

	.nojs-show {
		opacity: 1;
		top: 0;
	}
	.signedInStatus {
		display: flex;
		align-items: center;
		min-height: 4rem;
		width: 100%;
		background-color: var(--color-border);
	}
	.loaded {
		position: relative;
		top: 0;
		opacity: 1;
		overflow: hidden;
		border-radius: 0 0 0.6rem 0.6rem;
		padding: 0.6rem 0.5rem;
		margin: 0;
		background-color: rgba(0, 0, 0, 0.05);
		transition: all 0.2s ease-in;
		width: 100%;
	}
	.signedInText {
		padding-top: 0rem;
		left: 4.6rem;
	}
	.avatar {
		border-radius: 2rem;
		float: left;
		height: 2.8rem;
		width: 2.8rem;
		background-color: white;
		background-size: cover;
		background-repeat: no-repeat;
	}

	button {
		float: right;
		margin-right: -0.4rem;
		font-weight: 500;
		border-radius: 0.3rem;
		cursor: pointer;
		font-size: 1rem;
		line-height: 1.4rem;
		padding: 0.7rem 0.8rem;
		position: relative;
		z-index: 10;
		background-color: transparent;
		color: white;
		opacity: 1;
	}

	nav {
		display: flex;
		flex-direction: row;
		gap: 20px;
		padding-left: 20px;
		border-bottom: 1px solid gray;
		/* border-top: 1px solid gray; */
		padding-top: 10px;
		padding-bottom: 10px;
	}

	.signed > form {
		right: 10px;
		position: fixed;
	}
</style>
