import { Client } from "discord.js";
import ready from "./listeners/ready";
import { config } from "./config";
import {spawn, ChildProcess} from "child_process";

const client = new Client({
    intents: []
});

var mcDaemon: ChildProcess;

function startMinecraft(): void {
    const command = 'java'
    const args = ['-Xmx8192M', '-Xms128M', '-jar', config.ServerJarFile, 'nogui']

    mcDaemon = spawn(command, args, {
        detached: true,
        stdio: ['ignore', 'pipe', 'pipe']
    });

    if(mcDaemon.stdout) {
        mcDaemon.stdout.on('data', (data: Buffer) => {
            console.log(`STDOUT: ${data}`);
        });
    }

    if(mcDaemon.stderr) {
        mcDaemon.stderr.on('data', (data: Buffer) => {
            console.error(`STDERR: ${data}`);
        });
    }

    mcDaemon.on('exit', (code: number | null) => {
        console.error(`Minecraft exited with code: ${code}`);
        startMinecraft();
    });
}

ready(client);
client.login(config.Token);
startMinecraft();