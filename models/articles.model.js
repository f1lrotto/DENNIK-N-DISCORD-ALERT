const articlesDatabase = require("./articles.mongo");

async function uploadArticles(data) {
  lastArticle = await getArticle();
  if (lastArticle != null) {
    data = filter(data, lastArticle[0].postID);
    if (data.length == 35) {
      data = filter(data, lastArticle[1].postID);
    }
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
  return await articlesDatabase.find().sort({ postTime: -1 }).limit(2);
}

function filter(data, lastPostID) {
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
  } catch {
    console.error(`Couldn't save article`);
  }
}

module.exports = uploadArticles;
