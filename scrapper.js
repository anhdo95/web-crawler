const requestPromise = require('request-promise');
const $ = require('cheerio');
const puppeteer = require('puppeteer');

// A static content website
const WIKI_DOMAIN = 'https://en.wikipedia.org'
// A dynamic content website
const REDDIT_DOMAIN = 'https://www.reddit.com'

async function getPresidentUrls() {
  const url = `${WIKI_DOMAIN}/wiki/List_of_Presidents_of_the_United_States`
  const html = await requestPromise(url)

  const urlElements = $('.wikitable > tbody > tr > td:nth-child(4) > b > a', html)

  return urlElements.toArray().reduce((urls, element) => {
    return urls.concat(element.attribs.href)
  }, [])
}

async function getSinglePresident(path) {
  const url = `${WIKI_DOMAIN}${path}`
  const html = await requestPromise(url)

  const presidentName = $('#firstHeading', html).first().text()
  const presidentBirthDay = $('.bday', html).first().text()

  return {
    presidentName,
    presidentBirthDay
  }
}

module.exports.scrapUSPresidents = async function() {
  const paths = await getPresidentUrls()

  const presidents = await Promise.all(
    paths.map(path => getSinglePresident(path))
  )

  return presidents
}

module.exports.scrapRedditPosts = async function() {
  const url = `${REDDIT_DOMAIN}`
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  page.setViewport({ width: 1280, height:720 });

  await page.goto(url, { waitUntil: 'networkidle2' })
  const html = await page.content()

  const titles = await page.evaluate(() => {
    const els = document.querySelectorAll('h3')

    return [...els].map(el => {
      return {
        title: el.textContent
      }
    })
  })

  browser.close()

  return titles
}