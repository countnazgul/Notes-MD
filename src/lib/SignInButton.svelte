<script>
	import GitHub from "$lib/icons/GitHub.svelte";
</script>

<button class="btn-auth btn-github large" type="submit" title="Sign in with GitHub">
	<div class="btn">
		<div class="btn-icon"><GitHub /></div>
		<div>Sign in with <b>GitHub</b></div>
	</div>
</button>

<style>
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

	.btn {
		display: flex;
		flex-direction: row;
		gap: 5px;
	}

	.btn-icon {
		width: 32px;
	}

	.btn-github:before {
		margin: 0 0.6em 0 -0.6em;
		background-position: -44px 0;
	}

	.btn-auth,
	.btn-auth:visited {
		position: relative;
		display: inline-block;
		height: 22px;
		/* padding: 0 1em; */
		border: 1px solid #999;
		border-radius: 2px;
		margin: 0;
		text-align: center;
		text-decoration: none;
		font-size: 14px;
		line-height: 22px;
		white-space: nowrap;
		cursor: pointer;
		color: #222;
		background: #fcfcfc;
		-webkit-box-sizing: content-box;
		-moz-box-sizing: content-box;
		box-sizing: content-box;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}

	.btn-auth:hover,
	.btn-auth:focus,
	.btn-auth:active {
		color: #222;
		text-decoration: none;
	}

	/* .btn-auth:before {
		width: 22px;
		height: 22px;
		content: url(github.svg);
		display: inline-block;
	} */

	.btn-auth.large {
		height: 36px;
		line-height: 36px;
		font-size: 20px;
	}

	.btn-auth.large:before {
		width: 36px;
		height: 36px;
	}

	.btn-auth::-moz-focus-inner {
		border: 0;
		padding: 0;
	}

	b {
		font-weight: bold;
		color: black !important;
	}
</style>
