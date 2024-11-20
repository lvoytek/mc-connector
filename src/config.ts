import * as dotenv from "dotenv";
dotenv.config();

export const config = {
    Token: process.env.TOKEN ?? '',
    ServerJarFile: process.env.SERVER_JAR_FILE ?? 'server.jar'
}