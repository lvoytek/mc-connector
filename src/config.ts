import * as dotenv from "dotenv";
dotenv.config();

export const config = {
  Token: process.env.TOKEN ?? "",
  ClientID: process.env.CLIENT_ID ?? "",
  LogHost: process.env.MINECRAFT_LOG_HOST ?? "127.0.0.1",
  LogPort: parseInt(process.env.MINECRAFT_LOG_PORT ?? "25566", 10),
  ServerPrefix: process.env.SERVER_PREFIX ?? "",
};
