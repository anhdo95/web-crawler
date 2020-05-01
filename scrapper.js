const requestPromise = require('request-promise');
const $ = require('cheerio');

const DOMAIN = 'https://en.wikipedia.org'

async function getPresidentUrls() {
  const url = `${DOMAIN}/wiki/List_of_Presidents_of_the_United_States`
  const html = await requestPromise(url)

  const urlElements = $('.wikitable > tbody > tr > td:nth-child(4) > b > a', html)

  return urlElements.toArray().reduce((urls, element) => {
    return urls.concat(element.attribs.href)
  }, [])
}

async function getSinglePresident(path) {
  const url = `${DOMAIN}${path}`
  const html = await requestPromise(url)

  const presidentName = $('#firstHeading', html).first().text()
  const presidentBirthDay = $('.bday', html).first().text()

  return {
    presidentName,
    presidentBirthDay
  }
}

module.exports.scrap = async function() {
  return new Promise(async (resolve, reject) => {
    const paths = await getPresidentUrls()

    const presidents = await Promise.all(
      paths.map(path => getSinglePresident(path))
    )

    resolve(presidents)
  })
}