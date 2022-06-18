const articlesDatabase = require("./articles.mongo");

async function uploadArticles(data) {
  lastArticle = await getArticle();
  if (lastArticle != null) {
    data = filter(data, lastArticle.postID);
    data.forEach((entry) => {
      saveArticle(entry);
    });
  } else {
    data.forEach((entry) => {
      saveArticle(entry);
    });
  }
  return data;
}

async function getArticle() {
  return await articlesDatabase.findOne().sort({ postTime: -1 });
}

function filter(data, lastPostID) {
  console.log("filter", lastPostID);
  count = 0;
  lastPosition = -1;

  data.forEach((entry) => {
    count += 1;
    if (entry.postID == lastPostID) {
      lastPosition = count - 1;
    }
  });

  if (lastPosition != -1) {
    data = data.slice(0, lastPosition);
  }

  return data;
}

async function saveArticle(newEntry) {
  try {
    await articlesDatabase.create(newEntry);
    console.log("save", newEntry.postID);
  } catch {
    console.error(`Couldn't save article`);
  }
}

module.exports = uploadArticles;
