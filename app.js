const express = require("express");
const cron = require("node-cron");
const axios = require("axios");

const uploadArticles = require("./models/articles.model");
const { connectMongo } = require("./services/mongo");
const sendDiscordMessage = require("./services/discord");

require("dotenv").config();

connectMongo();

const app = express();

cron.schedule("*/30 * * * *", () => {
  axios
    .get("https://dennik-n-scraper.herokuapp.com/posts")
    .then(async (res) => {
      const newArticles = await uploadArticles(res.data);
      sendDiscordMessage(newArticles);
    })
    .catch((error) => {
      console.log(error);
    });
});

PORT = process.env.PORT || 8000;

app.listen(PORT, console.log(`Server listening on port ${PORT}`));
