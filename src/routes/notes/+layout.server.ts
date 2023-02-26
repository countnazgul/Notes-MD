import { redirect } from "@sveltejs/kit";
import Database from "better-sqlite3";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ locals, fetch }) => {
	const session = await locals.getSession();
	const db = new Database("./data/notes.db");

	if (!session) throw redirect(302, "/");

	const userId = session?.user?.image?.split("/u/")[1].split("?")[0];

	const select = db.prepare(`select id from notes where user = ? order by id`);
	const notes = await select.all(userId);

	const csrfToken = await fetch("/auth/csrf")
		.then((r) => r.json())
		.then((b) => b.csrfToken);

	return {
		session: await locals.getSession(),
		notes,
		csrfToken
	};
};
