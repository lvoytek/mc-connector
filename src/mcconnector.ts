import { Client } from "discord.js";
import * as readline from "readline";
import * as path from "path";
import ready from "./listeners/ready";
import interactionCreate from "./listeners/interactionCreate";
import { config } from "./config";
import { DiscordLogger } from "./discordlogger";
import { MessageResolver, MessageType } from "./mcmessageresolver";
import * as net from "net";

const client = new Client({
  intents: ["GuildMessages", "Guilds"],
});

function startLogServer(): void {
  const server = net.createServer((socket: net.Socket) => {
    const remote = `${socket.remoteAddress ?? "unknown"}:${socket.remotePort ?? 0}`;
    DiscordLogger.send(client, `Log connection from ${remote}`);

  const socketLines = readline.createInterface({ input: socket });
  socketLines.on("line", (input: string) => {
      const message = MessageResolver.extract(input);

      if (
        [
          MessageType.JOIN,
          MessageType.QUIT,
          MessageType.DEATH,
          MessageType.ACHIEVEMENT,
          MessageType.CHALLENGE,
        ].includes(message.messageType)
      ) {
        DiscordLogger.send(client, `${message.messageType} ${message.contents}`);
      } else if (message.messageType == MessageType.SERVER_ONLINE) {
        DiscordLogger.send(client, `${message.messageType} Server online`);
      } else if (message.messageType == MessageType.USER_MESSAGE) {
        const userDiscordMessageRE = /^<([^>]+)> (dis:|discord:|!)\s*/;
        if (message.contents.match(userDiscordMessageRE)) {
          const userMessage = message.contents.replace(/(dis:|discord:|!)\s*/, "");
          DiscordLogger.send(client, `${message.messageType} ${userMessage}`);
        }
      }
    });

    socket.on("error", (err: Error) => {
      DiscordLogger.err(client, `Socket error (${remote}): ${err.message}`);
    });

    socket.on("close", () => {
      DiscordLogger.send(client, `Log connection closed ${remote}`);
    });
  });

  server.on("error", (err: Error) => {
    DiscordLogger.err(client, `Log server error: ${err.message}`);
  });

  server.listen(config.LogPort, () => {
    DiscordLogger.send(client, `Listening for Minecraft logs on port ${config.LogPort}`);
  });
}

ready(client);
interactionCreate(client);

client.login(config.Token);

startLogServer();
