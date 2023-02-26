<script lang="ts">
	import { goto } from "$app/navigation";
	import fuzzysort from "fuzzysort";
	// import Note from "../api/note/[slug]/Note.svelte";

	export let data: { notes: { id: string }[] } = { notes: [] };

	let filter = "";
	let selected: string;

	$: noteData = undefined;
	$: selected;
	$: notesSearch = fuzzysort.go(
		filter,
		data.notes.map((d) => d.id),
		{
			all: true
		}
	);

	$: notes = notesSearch.map((n) => ({ el: fuzzysort.highlight(n), target: n.target }));

	async function getNoteContent(noteId: string | null) {
		// noteData = await fetch(`/api/note/${noteId}`)
		// 	.then((r) => r.text())
		// 	.then((t) => JSON.parse(t));
		goto(`/notes/${noteId}`);
		selected = `${noteId}`;
	}
</script>

<content>
	<sidebar>
		{#if data?.notes}
			<div class="note-id">
				<div class="group">
					<input type="text" placeholder="Filter" bind:value={filter} /><span
						class="highlight"
					/><span class="bar" />
				</div>
			</div>
			{#each notes as note}
				<div
					class="note-id"
					on:click={() => getNoteContent(note.target)}
					on:keydown={() => getNoteContent(note.target)}
					class:selected={selected == note.target}
				>
					{@html note.el}
				</div>
			{/each}
		{/if}
	</sidebar>
	<note>
		{#if noteData}
			<slot name="note" />
			<!-- <Note {noteData} /> -->
		{/if}
	</note>
</content>

<style>
	note {
		overflow: auto;
	}

	content {
		/* padding: 0rem 1rem 0rem 0rem; */
		display: grid;
		grid-template-columns: 300px auto;
		/* height: 100%; */
		overflow: hidden;
	}

	sidebar {
		overflow: auto;
		/* width: max-content; */
		padding-inline: 2px;
		/* border-style: dashed; */
	}

	.note-id {
		cursor: pointer;
		padding-left: 1rem;
	}

	.selected {
		color: var(--color-green);
	}

	.group {
		margin: 15px 0;
	}

	input {
		background: none;
		font-size: 14px;
		border: none;
		border-radius: 0;
		border-bottom: 1px solid #c6c6c6;
	}
	input:focus {
		outline: none;
	}

	input:focus ~ .bar:before {
		width: 320px;
	}
</style>
