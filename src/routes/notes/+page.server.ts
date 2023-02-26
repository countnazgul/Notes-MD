import { redirect } from "@sveltejs/kit";
import Database from "better-sqlite3";

export const load: any = async (event: any) => {
	const session = await event.locals.getSession();
	const db = new Database("./data/notes.db");

	if (!session) throw redirect(302, "/");

	const userId = session?.user?.image?.split("/u/")[1].split("?")[0];

	const select = db.prepare(`select id from notes where user = ? order by id`);
	const notes = await select.all(userId);

	return { notes };
};
