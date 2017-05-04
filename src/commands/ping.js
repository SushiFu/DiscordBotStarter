import discord from "../server/discord";
import logger from "../server/logger";

discord.onMessageEverywhere(message => {
    logger.debug("Receive:", message.content);
    if (message.content === "!ping") {
        logger.info("Send pong!");
        discord.sendOn(message.channel, "pong!");
    }
});