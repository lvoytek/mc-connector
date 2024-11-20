import * as dotenv from "dotenv";
dotenv.config();

export const config = {
    Token: process.env.TOKEN ?? ''
}