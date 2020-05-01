const express = require('express')
const scrapper = require('./scrapper')

const app = express()

app.get('/us-presidents', async (req, res) => {
  try {
    const presidents = await scrapper.scrapUSPresidents()

    res.status(200).send(presidents)
  } catch (error) {
    console.log('error', error)
    res.end(error)
  }
})

app.get('/reddit-posts', async (req, res) => {
  try {
    const posts = await scrapper.scrapRedditPosts()

    res.status(200).send(posts)
  } catch (error) {
    console.log('error', error)
    res.end(error)
  }
})

app.listen(8001)