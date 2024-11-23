import { Client } from "discord.js";
import * as path from "path";
import ready from "./listeners/ready";
import interactionCreate from "./listeners/interactionCreate";
import { config } from "./config";

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
    mcDaemon.stdout.on("data", (data: Buffer) => {
      console.log(`STDOUT: ${data}`);
    });
  }

  if (mcDaemon.stderr) {
    mcDaemon.stderr.on("data", (data: Buffer) => {
      console.error(`STDERR: ${data}`);
    });
  }

  mcDaemon.on("exit", (code: number | null) => {
    console.error(`Minecraft exited with code: ${code}`);
    setTimeout(startMinecraft, 10000);
  });
}

ready(client);
interactionCreate(client);

client.login(config.Token);

startMinecraft();
