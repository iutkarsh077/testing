const express = require('express')
const app = express()
// const port = 3000
require('dotenv').config()
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/home', (req, res) => {
    res.send('This is a Home Page!')
  })

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${port}`)
})