import { Client } from "discord.js";
import ready from "./listeners/ready";
import { config } from "./config";

const client = new Client({
    intents: []
});

ready(client);
client.login(config.Token);