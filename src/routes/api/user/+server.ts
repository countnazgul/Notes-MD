import { error, json } from "@sveltejs/kit";
import type { RequestEvent, RequestHandler } from "@sveltejs/kit";
import { readFileSync } from "fs";
import jsonwebtoken from "jsonwebtoken";
const { sign } = jsonwebtoken;

export const POST: RequestHandler = async ({ params, request, locals }: RequestEvent) => {
	const session = await locals.getSession();
	if (!session) throw error(401);

	const privateKey = readFileSync("./data/private-key.pem");

	const token = sign(
		{
			email: session.user?.email
		},
		privateKey,
		{
			algorithm: "RS256"
		}
	);

	return new Response(token);
};
