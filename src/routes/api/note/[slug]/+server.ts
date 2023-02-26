import { error, type RequestEvent } from "@sveltejs/kit";

import Database from "better-sqlite3";

export const GET = async ({ params, request, locals }: RequestEvent) => {
	const db = new Database("./data/notes.db");
	const session = await locals.getSession();

	if (!session?.user) throw error(401);

	const userId = session?.user?.image?.split("/u/")[1].split("?")[0];

	const select = db.prepare(`select * from notes where user = ? and id = ?`);
	const note = await select.get(userId, params.slug);
	return new Response(JSON.stringify(note));
};

export const DELETE = async ({ params, request, locals }: RequestEvent) => {
	const db = new Database("./data/notes.db");
	const session = await locals.getSession();

	if (!session?.user) throw error(401);

	const userId = session?.user?.image?.split("/u/")[1].split("?")[0];

	const select = db.prepare(`delete from notes where user = ? and id = ?`);
	await select.run(userId, params.slug);
	return new Response("OK");
};
