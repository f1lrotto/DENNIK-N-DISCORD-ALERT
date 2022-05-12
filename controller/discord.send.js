const moment = require("moment");

function makeDiscordMessage(newArticles) {
  if (newArticles.length == 1) {
    message = `**There is ${newArticles.length} new article on Minuta po Minute.**\n\n`;
  } else {
    message = `**There are ${newArticles.length} new articles on Minuta po Minute.**\n\n`;
  }

  newArticles.forEach((article) => {
    const time = moment(article.postTime).format("HH:mm");
    message += `At ${time}, ${article.headline}\n<${article.postLink}>\n\n`;
  });

  return message;
}

module.exports = makeDiscordMessage;
