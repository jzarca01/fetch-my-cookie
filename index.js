const express = require('express')
const app = express()

const bodyParser = require('body-parser');
const fetchCookie = require('./subway')

const PORT = process.env.PORT || 4000

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json())

app.post('/cookie', async (req, res) => {
    const cookie = await fetchCookie(req.body.storeNumber, req.body.date, req.body.time)
    res.status(200).send(cookie)
})

app.listen(PORT, () => {
    console.log('You can now fetch your free cookie')
})