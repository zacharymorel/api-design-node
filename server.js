// TODO: create a basic server with express
// that will send back the index.html file on a GET request to '/'
// it should then send back jsonData on a GET to /data

const express = require('express')
const app = express()

let jsonData = {count: 12, message: 'hey'};

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html', function(err) {
    if(err)
      res.status(500).send(`Err on get '/': ${err}`)
  })
})

app.get('/data', function(req, res) {
  res.json(jsonData)
})

let port = 3000
app.listen(port, console.log(`Listening on http://localhost:${port}.`))
 