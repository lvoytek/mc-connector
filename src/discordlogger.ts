import { Client, TextChannel } from "discord.js";
import { Channels } from "./channels";

export const DiscordLogger = {
  async send(client: Client, data: string) {
    for (const channelID of Channels.get()) {
      const nextChannel: TextChannel =
        (client.channels.cache.get(channelID) as TextChannel) ??
        ((await client.channels.fetch(channelID)) as TextChannel);

      if (nextChannel) {
        await nextChannel.send(data);
      }
    }
  },
  async err(client: Client, data: string) {
    await this.send(client, `‼️ ${data}`);
  },
};
