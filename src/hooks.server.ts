import { SvelteKitAuth } from "@auth/sveltekit";
import GitHub from "@auth/core/providers/github";
import { env } from "$env/dynamic/private";
import Database from "better-sqlite3";
export const handle = SvelteKitAuth({
	secret: env.AUTH_SECRET,
	trustHost: true,
	providers: [
		//@ts-expect-error issue https://github.com/nextauthjs/next-auth/issues/6174
		GitHub({
			clientId: env.GITHUB_ID,
			clientSecret: env.GITHUB_SECRET
		})
	],
	callbacks: {
		async signIn({ user }) {
			const db = new Database("./data/notes.db");

			const selectUser = db.prepare(`select id from users where id = ?`);
			const userDB = await selectUser.get(user.id);

			if (!userDB) {
				const insertNew = db.prepare(
					`insert into users (id, name, email, image) values (?, ?, ?, ?)`
				);
				await insertNew.run(user.id, user.name, user.email, user.image);
			}

			return true;
		}
	}
});
