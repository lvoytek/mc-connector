import { Client } from "discord.js";
import ready from "./listeners/ready";
import interactionCreate from "./listeners/interactionCreate";
import { config } from "./config";
import { DiscordLogger } from "./discordlogger";
import { MessageResolver, MessageType } from "./mcmessageresolver";
import * as net from "net";

const client = new Client({
  intents: ["GuildMessages", "Guilds"],
});

function handleLine(line: string): void {
  const message = MessageResolver.extract(line);

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
}

function startLogServer(): void {
    const socket = net.createConnection({ host: config.LogHost, port: config.LogPort }, () => {
      console.log(`Connected to ${config.LogHost}:${config.LogPort}`);
    });

    let buffer = '';

    socket.on('data', (chunk: Buffer) => {
      buffer += chunk.toString();

      let lines = buffer.split('\n');
      buffer = lines.pop() as string;

      lines.forEach((line) => {
        handleLine(line);
      });
    });

    socket.on("error", (err: Error) => {
      DiscordLogger.err(client, `Socket error: ${err.message}`);
    });

    socket.on("close", () => {
      DiscordLogger.send(client, `Log connection closed`);
    });
}

ready(client);
interactionCreate(client);

client.login(config.Token);

startLogServer();
