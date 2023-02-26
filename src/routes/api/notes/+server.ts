import { error, json } from "@sveltejs/kit";
import type { RequestEvent, RequestHandler } from "@sveltejs/kit";
import Database from "better-sqlite3";
import { readFileSync } from "fs";
import { verify, decode } from "jsonwebtoken";

export const POST: RequestHandler = async ({ params, request }: RequestEvent) => {
	const db = new Database("./data/notes.db");
	const privateKey = readFileSync("./data/private-key.pem");
	const apiKey = request.headers.get("authorization");

	if (!apiKey)
		throw error(400, {
			message: "API key is missing"
		});

	if (!request.body)
		throw error(400, {
			message: "Empty content"
		});

	let userEmail: string;
	try {
		const verifyAPIKey = verify(apiKey, privateKey) as { email: string };

		userEmail = verifyAPIKey.email;
	} catch (e) {
		throw error(400);
	}

	const selectUser = db.prepare(`select id from users where email = ?`);
	const user = selectUser.get(userEmail) as { id: string };

	if (!user)
		throw error(404, {
			message: "User not found"
		});

	const data: {
		id: string;
		content: string;
		path: {
			external: string;
		};
	} = await request.json();

	if (!data.id || !data.content) throw error(400);

	const select = db.prepare(`select * from notes where user = ? and id = ?`);
	const note = await select.get(user.id, data.id);

	// if exists - update. else insert
	if (!note) {
		const insert = db.prepare(`insert into notes (id, user, content, path) values (?, ?, ?, ?)`);
		await insert.run(data.id, user.id, data.content, data.path.external);
	} else {
		const update = db.prepare(`update notes set content = ? WHERE user = ? and id = ?`);
		await update.run(data.content, user.id, data.id);
	}

	return new Response();
};
