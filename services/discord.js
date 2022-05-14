const { WebhookClient } = require("discord.js");

const makeDiscordMessage = require("./../controller/discord.send");

require("dotenv").config();

const DISCORD_URL = process.env.DISCORD_URL;
const DISCORD_USERNAME = process.env.DISCORD_USERNAME;
const DISCORD_AVATAR_URL = process.env.DISCORD_AVATAR_URL;

const webhookClient = new WebhookClient({ url: DISCORD_URL });

function sendDiscordMessage(newArticles) {
  if (newArticles.length != 0) {
    const newArticleArray = makeDiscordMessage(newArticles);
    const numMessages = Math.ceil(newArticleArray.length / 10);
    var countStart = 0;
    var countEnd = 9;
    for (let i = 0; i < numMessages; i++) {
      if (countEnd > newArticleArray) {
        countEnd = newArticleArray.length;
      }

      message = newArticleArray.slice(countStart, countEnd).join(' ')
      webhookClient.send({
        content: message,
        username: DISCORD_USERNAME,
        avatarURL: DISCORD_AVATAR_URL,
      });
      countStart += 10;
      countEnd += 10;
    }
  }
}

module.exports = sendDiscordMessage;
