const express = require('express');

const app = express();
const mongoose = require('mongoose');
const server = '127.0.0.1:27017'; // REPLACE WITH YOUR DB SERVER
const database = 'test';      // REPLACE WITH YOUR DB NAME
const url = `mongodb://${server}/${database}`;
const bodyParser = require('body-parser');

const userModel = require('./Datamodel/models/user');
const accommodationModel = require('./Datamodel/models/accommodation');
const transactionModel = require('./Datamodel/models/transaction');
const reviewModel = require('./Datamodel/models/review');

// CSRF pre-fighting
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  next();
});

// for bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true}));

// get UserInformation
app.get('/api/user/:id', (req, res) => {
  const userInfo = new Promise((resolve, reject) => {
    mongoose.connect(url)
    .then(
      () => {
        console.log('Database connect')
      },
      err => { console.log(err) }
    )
    console.log(req.params.id)
    userModel
    .find({'email': req.params.id})
    .exec( function(err, docs){ 
      (err) => { console.log(err)},
      resolve(docs)
      mongoose.disconnect();
    })
  });
  userInfo.then((result) => {
    //console.log(res);
    res.json({username : result})    //// TEMP: need use "then" to load user's trasction, until both info loaded,then return to front-end.
  })
});

// get PostInformation
app.get('/api/accommodation/:id', (req, res) => {
  const userInfo = new Promise((resolve, reject) => {
    mongoose.connect(url)
    .then(
      () => {
        console.log('Database connect')
      },
      err => { console.log(err) }
    )
    console.log(req.params.id)
    userModel
    .find({'_id': req.params.id})
    .exec( function(err, docs){ 
      (err) => { console.log(err)},
      console.log('docs',docs[0]._id)
      accommodationModel
      .find({'owner': docs[0]._id})
      .exec(function(err, results){
        console.log(results)
      })
    })
  });
  // userInfo.then((result) => {
  //   //console.log(res);
  //   res.json({username : result})    //// TEMP: need use "then" to load user's trasction, until both info loaded,then return to front-end.
  // })
});

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);