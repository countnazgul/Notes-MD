<about>
	<about-content>
		<h1>Notes.md</h1>

		<h2>View all projects notes in one place.</h2>

		<div>
			<code>Notes.md</code> have two components:
			<ul>
				<li>VSCode extension</li>
				<li>
					<a href="https://kit.svelte.dev/">SvelteKit</a> web app (you are looking into it at the moment)
				</li>
			</ul>
		</div>
		<div>
			<h3>VSCode extension</h3>
			<div>
				The extension have a single function - whenever <code>Notes.md</code> file is saved then the
				extension will send its content to the web app. <br />

				Get the extension from
				<a
					href="https://marketplace.visualstudio.com/items?itemName=countnazgul.note-md"
					rel="noreferrer"
					target="_blank">VSCode extensions marketplace</a
				>
			</div>
			<h3>Web app</h3>
			<dev>
				The app allows to browse all notes from a single location. All notes are read-only and can
				only be edited from within VSCode.<br />
				At the moment only <code>GitHub</code> authentication is supported.
			</dev>
		</div>
	</about-content>
	<about-footer />
</about>

<style>
	about {
		display: grid;
		grid-template-rows: auto 20px;
		height: 100%;
	}
</style>
