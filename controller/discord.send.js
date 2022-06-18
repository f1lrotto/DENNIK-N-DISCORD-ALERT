const moment = require("moment");

function makeDiscordMessage(newArticles) {
  newArticleArray = []
  
  if (newArticles.length == 1) {
    message = `**There is ${newArticles.length} new article on Minuta po Minute.**\n\n`;
  } else {
    message = `**There are ${newArticles.length} new articles on Minuta po Minute.**\n\n`;
  }
  newArticleArray.push(message)
  
  newArticles.forEach((article) => {
    const time = moment(article.postTime).add(2, 'hours').format("Do MMM HH:mm");
    message = `At ${time}, ${article.headline}\n<${article.postLink}>\n\n`;
    newArticleArray.push([message])
  });
  return newArticleArray;
}

module.exports = makeDiscordMessage;
