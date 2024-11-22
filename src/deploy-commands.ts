import { REST, Routes } from "discord.js";
import { config } from "./config";
import { Commands } from "./commands";

const commandJSONSet = [];

for (const command of Commands) {
  commandJSONSet.push(command.data.toJSON());
}

const rest: REST = new REST().setToken(config.Token);

(async () => {
  try {
    console.log(
      `Started refreshing ${commandJSONSet.length} application (/) commands.`
    );

    await rest.put(Routes.applicationCommands(config.ClientID), {
      body: commandJSONSet,
    });

    console.log(`Successfully reloaded application (/) commands.`);
  } catch (error) {
    // And of course, make sure you catch and log any errors!
    console.error(error);
  }
})();
