const express = require('express')
const scrapper = require('./scrapper')

const app = express()

app.get('/', async (req, res) => {
  const html = await scrapper.scrap()

  res.status(200).send(html)
})

app.listen(8001)