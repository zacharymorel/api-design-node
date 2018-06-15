// TODO: make this work.
// if yuo go to localhost:3000 the app
// there is expected crud to be working here
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const _ = require('lodash');

// express.static will serve everything
// with in client as a static resource
// also, it will server the index.html on the
// root of that directory on a GET to '/'
app.use(express.static('client'));

// body parser makes it possible to post JSON to the server
// we can accss data we post on as req.body
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


let lions = [];
let id = 0;

// TODO: make the REST routes to perform CRUD on lions

// Returns all lions
app.get('/lions', (req, res) => {
  res.status(200).send(lions)
})

// Returns one lion respresented by its id
app.get('/lions/:id', (req, res) => {
  const lion = lions.find(lion => lion.id === req.params.id)
  res.status(200).send(lion || {})
})

// Create and returns a new lion using the posted object as the lion
app.post('/lions', (req, res) => {
  const newLion = req.body
  id++
  newLion[id] = id.toString()

  lions.push(newLion)

  res.status(201).send(newLion)
}) 

// Updates and returns the matching lion with the posted update object
app.put('/lions/:id', (req, res) => {
  const update = req.body
  delete update[id]

  const oldLionIndex = lions.findIndex(lion => lion.id === req.params.id)

  if(!lions[oldLionIndex]) 
    res.send()
  else {
    const updatedLion = {...lions[oldLionIndex], ...update}
    res.status(200).send(updatedLion)
  }
})

// Deletes and returns the left over lion array
app.delete('lions/:id', (req, res) => {
  const oldLionIndex = lions.findIndex(lion => lion.id === req.params.id)
  
  if(!lions[oldLionIndex])
    res.send()
  else {
    let deletedLion = lions[oldLionIndex]
    lions.splice(deletedLion, 1)
    res.status(200).send(lions)
  }
})

app.listen(3000, console.log('listening on port 3000'));

