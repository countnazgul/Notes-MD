/// <reference types="@auth/sveltekit" />
// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}
}

declare module "../types.js" {
	interface Profile extends GithubProfile {}
}

export {};
