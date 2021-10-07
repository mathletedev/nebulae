import { Client } from "eris";
import { Base } from "eris-sharder";

class Bot extends Base {
	public constructor(client: { bot: Client; clusterID: number }) {
		super(client);
	}

	public async launch() {
		this.bot.editStatus("dnd", {
			type: 1,
			name: "your demise"
		});

		const target = process.argv[2];
		const amount = process.argv[3];

		if (!target || !amount) {
			console.error("DM or amount parameters not found");
			return;
		}

		const dm = await this.bot
			.getDMChannel(target)
			.catch(() => console.error("Invalid DM ID"));
		if (!dm) return;

		console.log(
			`Sending ghost pings to ${dm.recipient.username}\#${dm.recipient.discriminator}...`
		);

		for (let i = 1; i < parseInt(amount) + 1; ++i) {
			const msg = await dm
				.createMessage(`<@${target}> Sub to MathleteDev`)
				.catch(() => console.error("Unable to send DM messages to this user"));
			if (!msg) return;

			console.log(`${i} ping${i === 1 ? "" : "s"} sent`);
			msg.delete();
		}

		console.log("Ghost pings executed successfully!");
	}
}

export = Bot;
