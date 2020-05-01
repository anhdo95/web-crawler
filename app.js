const express = require('express')
const scrapper = require('./scrapper')

const app = express()

app.get('/', async (req, res) => {
  try {
    const html = await scrapper.scrap()

    res.status(200).send(html)
  } catch (error) {
    res.send(error)
  }
  
})

app.listen(8001)