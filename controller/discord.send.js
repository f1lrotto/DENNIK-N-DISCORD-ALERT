function makeDiscordMessage(newArticles) {
  message = `There are ${newArticles.length} new articles on Minuta po Minute.\n\n`

  newArticles.forEach(article => {
      message += `${article.headline}\n<${article.postLink}>\n`
  });

  return message
}

module.exports = makeDiscordMessage;
