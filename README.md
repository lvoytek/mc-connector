# Minecraft to Discord Connector
Run your Minecraft server and keep an eye on it with a Discord bot

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

### Backend Setup
To run mc-connector, you will need a system that will always be online when needed that can run NodeJS.

Install NodeJS with version >= 22.11.0. [nvm](https://github.com/nvm-sh/nvm) makes this easier to do.

Next, install git on your system and clone the repository with the following command:

    git clone https://github.com/lvoytek/mc-connector.git

Enter the repository and install npm packages.

    cd mc-connector
    npm i

Now set up the .env file for the app. There is an example file to base it off of in the repository called [.env.example](.env.example).

In the token section, paste your token from the discord app page.

The client ID can be found in the `OAuth2 > Client information` section of the Discord developer portal.

Set the server jar file option to the location of your Minecraft server jar file. To get the file, go to [minecraft.net](https://www.minecraft.net/en-us/download/server).

With everything in place, start by initializing the client commands using the `deploy-commands` script:

    npm run deploy

Then build and run the server with

    npm run build
    npm run start

You can now use the OAuth URL from earlier to add the bot to your server. Then run the `/setupminecraft` discord command to connect the Minecraft Server to one of your channels.