const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {logData} = require('./models/logData');

var app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());

app.post('/logData', (req, res) => {
    var logdata = new logData({
      area: req.body.area,
      lat: req.body.lat,
      long: req.body.long,
      contestID: req.body.contestID
    });
  
    logdata.save().then((doc) => {
      res.send(doc);
    }, (e) => {
      res.status(400).send(e);
    });
  });



app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos/:id', (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findById(id).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }

    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  });
});

app.delete('/todos/:id', (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findByIdAndRemove(id).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }

    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  });
});
//**   */
app.patch('/todos/:id', (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }

    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  })
});
// POST USER

app.post('/users',(req,res)=>{
  debugger
  console.log(`Into User`);
 var body = _.pick(req.body,['email','passcode'])
 var user = User(body)
console.log(`usersthing:- ${user}`)
user.save().then(() => {
  return user.generateAuthToken();
}).then((token) => {
  var userObject = user.toObject();

  var result = _.pick(userObject, ['_id', 'email']);
  res.header('x-auth', token).send(result);
}).catch((e) => {
  res.status(400).send(e);
})
})



app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});

module.exports = {app};
