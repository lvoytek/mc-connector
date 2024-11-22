import { SlashCommandBuilder, CommandInteraction } from "discord.js";
import { Command } from "../command";

export const SetupMinecraft: Command = {
  data: new SlashCommandBuilder()
    .setName("setupminecraft")
    .setDescription("Connect to a Minecraft server output")
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("Channel to send Minecraft messages to")
    ),
  async execute(interaction: CommandInteraction) {
    const channel =
      interaction.options.get("channel")?.channel ?? interaction.channel;

    if (channel && "id" in channel) {
      await interaction.reply(channel.id);
    } else {
      interaction.reply("No channel id :(");
    }
  },
};
