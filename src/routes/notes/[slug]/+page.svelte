<script lang="ts">
	import hljs from "highlight.js";
	import "highlight.js/styles/github-dark.css";
	import showdown from "showdown";
	import Delete from "$lib/icons/Delete.svelte";
	import { goto } from "$app/navigation";

	export let data: { note: { id: string; content: string; path: string; user: number } };

	async function deleteNote() {
		await fetch(`/api/note/${data.note.id}`, { method: "DELETE" });
		goto("/notes", { invalidateAll: true });
	}

	showdown.extension("highlight", function () {
		return [
			{
				type: "output",
				filter: function (text, converter, options) {
					const left = "<pre><code\\b[^>]*>";
					const right = "</code></pre>";
					const flags = "g";
					const replacement = function (
						wholeMatch: boolean,
						match: string,
						left: string,
						right: string
					) {
						const lang = (left.match(/class=\"([^ \"]+)/) || [])[1];
						left = left.slice(0, 18) + "hljs " + left.slice(18);
						if (lang && hljs.getLanguage(lang)) {
							return (
								left +
								hljs.highlight(match, {
									language: lang
								}).value +
								right
							);
						} else {
							return left + hljs.highlightAuto(match).value + right;
						}
					};
					return showdown.helper.replaceRecursiveRegExp(text, replacement, left, right, flags);
				}
			}
		];
	});

	const converter = new showdown.Converter({
		extensions: ["highlight"],
		strikethrough: true,
		tables: true,
		emoji: true,
		encodeEmails: true
	});

	$: html = converter.makeHtml(data.note.content);
</script>

<note>
	<actions>
		{#if data.note.path}
			<div class="button-container">
				<a
					class="monaco-button"
					tabindex="0"
					role="button"
					href="vscode://{data.note.path.replace('%3A', ':').replace(':///', '/')}"
					><span>Open in VSCode</span></a
				>
			</div>
		{/if}
		<div class="button-delete" title="Delete" on:click={deleteNote} on:keydown={deleteNote}>
			<Delete />
		</div>
	</actions>
	{@html html}
</note>

<style>
	note {
		overflow: auto;
		padding-left: 2rem;
		display: flex;
		flex-direction: column;
	}

	.monaco-button {
		color: #ffffff;
		background-color: #0e639c;
		box-sizing: border-box;
		display: flex;
		width: 200px;
		padding: 4px;
		cursor: pointer;
		justify-content: center;
		align-items: center;
		opacity: 1;
		border-radius: 5px 0px 0px 5px;
	}

	.button-container {
		width: 200px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.button-delete {
		opacity: 1;
		width: 25px;
		border-radius: 0px 5px 5px 0px;
		display: flex;
		padding-inline: 5px;
		background-color: #852525;
		cursor: pointer;
		z-index: 999;
	}

	actions {
		position: absolute;
		padding-top: 0.7rem;
		right: 1.7rem;
		display: flex;
		flex-direction: row;
		height: fit-content;
		/* gap: 0.5rem; */
	}
</style>
