import "dotenv-safe/config";
import { Master } from "eris-sharder";

const token = process.argv[4] || (process.env.BOT_TOKEN as string);

const _ = new Master(token, "/dist/main.js", {
	stats: true,
	name: "Nebulae",
	clientOptions: {}
});
