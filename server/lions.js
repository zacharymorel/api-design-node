var lionRouter = require('express').Router();
var _ = require('lodash');

var lions = [];
var id = 0;

var updateId = function(req, res, next) {
  if (!req.body.id) {
    id++;
    req.body.id = id + '';
  }
  next();
};

lionRouter.param('id', function(req, res, next, id) {
  var todo = _.find(todos, {id: id});

  if (todo) {
    req.todo = todo;
    next();
  } else {
    res.send();
  }
});

lionRouter.get('/', function(req, res){
  res.json(lions);
});

lionRouter.get('/:id', function(req, res){
  var lion = req.todo;
  res.json(lion || {});
});

lionRouter.post('/', updateId, function(req, res) {
  var lion = req.body;

  lions.push(lion);

  res.json(lion);
});


lionRouter.put('/:id', function(req, res) {
  var update = req.body;
  if (update.id) {
    delete update.id
  }

  var lion = _.findIndex(lions, {id: req.params.id});
  if (!lions[lion]) {
    res.send();
  } else {
    var updatedLion = _.assign(lions[lion], update);
    res.json(updatedLion);
  }
});

lionRouter.delete('/:id', (req, res) => {
  const oldLionIndex = lions.findIndex(lion => lion.id === req.params.id)
  
  if(!lions[oldLionIndex])
    res.send()
  else {
    let deletedLion = lions[oldLionIndex]
    lions.splice(deletedLion, 1)
    res.status(200).send(lions)
  }
})

module.exports = lionRouter;
