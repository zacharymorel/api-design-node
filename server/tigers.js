// TODO: make a new router for the tigers resource
// and make some REST routes for it, exactly like for tiger
// make a middleware that just logs the word 'tiger' to the console
// when a request comes in to the server

var tigerRouter = require('express').Router();
var _ = require('lodash');

var tigers = [];
var id = 0;

var updateId = function(req, res, next) {
  if (!req.body.id) {
    id++;
    req.body.id = id + '';
  }
  next();
};


tigerRouter.param('id', function(req, res, next, id) {
  var tiger = _.find(tigers, {id: id});

  if (tiger) {
    req.tiger = tiger;
    next();
  } else {
    res.send();
  }
});

/*
* SubRouter.route 
* Returns an instance of a single route which you can then use to handle HTTP verbs with optional middleware
*/
tigerRouter.route('/')
  .get((req, res) => {
    res.json(tigers)
  })
  .post(updateId, (req, res) => {
    var tiger = req.body;
  
    tigers.push(tiger);
  
    res.json(tiger)
  })

tigerRouter.route('/:id')
  .get((req, res) => {
    var tiger = req.todo;
    res.json(tiger || {})
  })
  .put((req, res) => {
    var update = req.body;
    if (update.id) {
      delete update.id
    }
  
    var tiger = _.findIndex(tigers, {id: req.params.id});
    if (!tigers[tiger]) {
      res.send();
    } else {
      var updatedTiger = _.assign(tigers[tiger], update);
      res.json(updatedTiger);
    }
  })
  .delete((req, res) => {
    const oldLionIndex = tigers.findIndex(tiger => tiger.id === req.params.id)
    
    if(!tigers[oldLionIndex])
      res.send()
    else {
      let deletedTiger = tigers[oldLionIndex]
      tigers.splice(deletedTiger, 1)
      res.status(200).send(tigers)
    }
  })

module.exports = tigerRouter;