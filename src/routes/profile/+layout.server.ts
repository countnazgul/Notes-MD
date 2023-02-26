import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ fetch }) => {
	const csrfToken = await fetch("/auth/csrf")
		.then((r: any) => r.json())
		.then((b: { csrfToken: string }) => b.csrfToken);

	return { csrfToken };
};
