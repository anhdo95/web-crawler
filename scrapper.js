const requestPromise = require('request-promise');

module.exports.scrap = async function() {
  const url = 'https://en.wikipedia.org/wiki/List_of_Presidents_of_the_United_States';

  return new Promise(async (resolve, reject) => {
    const html = await requestPromise(url)

    resolve(html)
  })
}