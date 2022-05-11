const mongoose = require("mongoose");

const articlesSchema = new mongoose.Schema(
  {
    postID: {
      type: Number,
      required: true,
    },
    postTime: {
      type: Date,
      required: true,
    },
    postLink: {
      type: String,
      required: true,
    },
    headline: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("Post", articlesSchema);
