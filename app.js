const express = require("express");
const cron = require("node-cron");
const axios = require("axios");
const morgan = require('morgan')

const uploadArticles = require("./models/articles.model");
const { connectMongo } = require("./services/mongo");
const sendDiscordMessage = require('./services/discord')

require("dotenv").config();

connectMongo();

const app = express();

app.use(express.json())
app.use(morgan('tiny'))

cron.schedule("*/30 * * * *", () => {
  axios
    .get("http://127.0.0.1:5000/posts")
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
