import * as dotenv from "dotenv";
dotenv.config();

export const config = {
  Token: process.env.TOKEN ?? "",
  ClientID: process.env.CLIENT_ID ?? "",
  LogPort: parseInt(process.env.MINECRAFT_LOG_PORT ?? "25566", 10),
};
