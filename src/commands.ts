import { SetupMinecraft } from "./commands/setupminecraft";
import { Command } from "./command";

export const Commands: Command[] = [SetupMinecraft];

export const CommandDescriptions: Map<string, string> = new Map([
  ["setupminecraft", "Connect to a Minecraft server output"],
]);
