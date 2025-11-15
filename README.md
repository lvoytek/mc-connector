# Minecraft to Discord Connector
Keep an eye on your Minecraft server using a Discord bot

## Add to your Discord server
There is no public live version of this application. However, if you want to set it up with your Minecraft server, you can [create your own](#create-your-own-minecraft-server-and-discord-app) using the code from this repository.

## Create your own Minecraft server and Discord app
### Create the discord app
In a web browser log in to discord and access the [developer portal](https://discord.com/developers/applications).

Select `New Application` and give it a name.

In the `General Information` tab you can give your application a name, a description, and a profile picture.

In the `Bot` tab, select `Add bot`. You can then add a profile picture and name for the bot.

In the `token` section for the bot, select `Reset Token` then `Copy`. Paste the token in  a secure location and do not share it.

Now select `OAuth2 > OAuth2 URL Generator` to create the URL for your application.

In the `scopes` section select `bot` and `applications.commands`. Then in the following `Bot Permissions` section select `View Channels` and `Send Messages`.

Now copy the link at the bottom of the page. This can be used to add your bot to a Discord server.

### Minecraft Server Setup
To run Minecraft such that the bot can connect to it, you can use the [Minecraft Server Runner](https://github.com/lvoytek/minecraft-server-runner), which will provide server log output over a TCP socket. Download it with

```bash
git clone https://github.com/lvoytek/minecraft-server-runner
```

Download the latest Minecraft server jar file at [minecraft.net](https://www.minecraft.net/en-us/download/server).

After downloading both, start the server with

```bash
cd minecraft-server-runner
go build
./minecraft-server-runner <path to server.jar directory>
```

### Bot Backend Setup
To run mc-connector, you will need a system that will always be online when needed that can run NodeJS.

Install NodeJS with version >= 22.11.0. [nvm](https://github.com/nvm-sh/nvm) makes this easier to do.

Next, install git on your system and clone the repository with the following command:

```bash
git clone https://github.com/lvoytek/mc-connector.git
```

Enter the repository and install npm packages.

```bash
cd mc-connector
npm i
```

Now set up the .env file for the app. There is an example file to base it off of in the repository called [.env.example](.env.example). Make sure the log port and host match that of the Minecraft Server Runner.

In the token section, paste your token from the discord app page.

The client ID can be found in the `OAuth2 > Client information` section of the Discord developer portal.

With everything in place, start by initializing the client commands using the `deploy-commands` script:

```bash
npm run deploy
```

Then build and run the server with

```bash
npm run build
npm run start
```

You can now use the OAuth URL from earlier to add the bot to your server. Then run the `/setupminecraft` discord command to connect the Minecraft Server to one of your channels.