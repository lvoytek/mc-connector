import { Client } from "discord.js";
import * as readline from "readline";
import * as path from "path";
import ready from "./listeners/ready";
import interactionCreate from "./listeners/interactionCreate";
import { config } from "./config";
import { DiscordLogger } from "./discordlogger";
import { MessageResolver, MessageType } from "./mcmessageresolver";
import { spawn, ChildProcess } from "child_process";

const client = new Client({
  intents: ["GuildMessages", "Guilds"],
});

var mcDaemon: ChildProcess;

function startMinecraft(): void {
  const command = "java";
  const args = [
    "-Xmx8192M",
    "-Xms128M",
    "-jar",
    path.basename(config.ServerJarFile),
    "nogui",
  ];

  mcDaemon = spawn(command, args, {
    cwd: path.dirname(config.ServerJarFile),
    detached: true,
    stdio: ["ignore", "pipe", "pipe"],
  });

  if (mcDaemon.stdout) {
    const stdoutLines = readline.createInterface({ input: mcDaemon.stdout });
    stdoutLines.on("line", (input) => {
      const message = MessageResolver.extract(input);

      if (
        [
          MessageType.JOIN,
          MessageType.QUIT,
          MessageType.DEATH,
          MessageType.ACHIEVEMENT,
        ].includes(message.messageType)
      ) {
        DiscordLogger.send(
          client,
          `${message.messageType} ${message.contents}`
        );
      } else if (message.messageType == MessageType.SERVER_ONLINE) {
        DiscordLogger.send(client, `${message.messageType} Server online`);
      } else if (message.messageType == MessageType.USER_MESSAGE) {
        const userDiscordMessageRE = /^<([^>]+)> (dis:|discord:|!)\s*/;
        if (message.contents.match(userDiscordMessageRE)) {
          const userMessage = message.contents.replace(
            /(dis:|discord:|!)\s*/,
            ""
          );
          DiscordLogger.send(client, `${message.messageType} ${userMessage}`);
        }
      }
    });
  }

  if (mcDaemon.stderr) {
    const stderrLines = readline.createInterface({ input: mcDaemon.stderr });
    stderrLines.on("line", (input) => {
      DiscordLogger.err(client, input);
    });
  }

  mcDaemon.on("exit", (code: number | null) => {
    DiscordLogger.send(client, `💥 Server crash! exit code: ${code}`);
    setTimeout(startMinecraft, 10000);
  });
}

ready(client);
interactionCreate(client);

client.login(config.Token);

startMinecraft();
