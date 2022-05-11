const express = require("express");
const cron = require("node-cron");
const axios = require("axios");

const uploadArticles = require("./models/articles.model");
const { connectMongo } = require("./services/mongo");

require("dotenv").config();

connectMongo();

const app = express();

app.use(express.json())

cron.schedule("*/15 * * * * *", () => {
  axios
    .get("http://127.0.0.1:5000/posts")
    .then((res) => {
        console.log(res.data)
        //uploadArticles(res.data);
    })
    .catch((error) => {
      console.log(error);
    });
});

PORT = process.env.PORT || 8000;

app.listen(PORT, console.log(`Server listening on port ${PORT}`));
