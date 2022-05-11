const { MessageEmbed, WebhookClient } = require("discord.js");

const makeDiscordMessage = require("./../controller/discord.send");

require("dotenv").config();

const DISCORD_URL = process.env.DISCORD_URL;
const DISCORD_USERNAME = process.env.DISCORD_USERNAME;
const DISCORD_AVATAR_URL = process.env.DISCORD_AVATAR_URL;

const webhookClient = new WebhookClient({ url: DISCORD_URL });

function sendDiscordMessage(newArticles) {
  if (newArticles.length !== 0) {
    const message = makeDiscordMessage(newArticles);
    webhookClient.send({
      content: message,
      username: DISCORD_USERNAME,
      avatarURL: DISCORD_AVATAR_URL,
    });
  }
}

module.exports = sendDiscordMessage;
