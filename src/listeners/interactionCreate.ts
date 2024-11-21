import { Events, Client, CommandInteraction, Interaction } from "discord.js";
import { Commands } from "../commands";

export default (client: Client): void => {
    client.on(Events.InteractionCreate, async (interaction: Interaction) => {
        if (interaction.isCommand()) {
            await handleSlashCommand(interaction);
        }
    });
};

const handleSlashCommand = async (interaction: CommandInteraction): Promise<void> => {
    const slashCommand = Commands.find((c) => c.data.name === interaction.commandName);
    if (slashCommand) {
        slashCommand.execute(interaction);
    } else {
        interaction.followUp({ content: "Error: slash command not found" });
    }
};