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
const propertyModel = require('./Datamodel/models/property');

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

// get specific User Information
app.get('/api/user/:id', (req, res) => {
  const userInfo = new Promise((resolve, reject) => {
    mongoose.connect(url)
    .then(
      () => {
        console.log('/api/user/ connects successfully')
      },
      err => { console.log(err) }
    )
    console.log(req.params.id)
    userModel
    .find({'_id': req.params.id})
    .exec( function(err, docs){ 
      (err) => { console.log(err)},
      resolve(docs[0])
      mongoose.disconnect();
    })
  });
  userInfo.then((result) => {
    console.log(result)
    if (result === undefined){
      res.status(404).send('No such email!')
      return
    }
    res.status(200).json(result)    //// TEMP: need use "then" to load user's trasction, until both info loaded,then return to front-end.
  })
});

// Sign up
app.post('/api/signup', function(req, res){
  let _id = req.body._id
  let password = req.body.password
  let firstName = req.body.firstName
  let lastName = req.body.lastName
  let phone = req.body.phone
  let gender = ""
  mongoose.connect(url)
    .then(
      () => {
        console.log('Database connect')
      },
      err => { console.log(err) }
    )
  
  let User = new userModel({
    _id: _id,
    password: password,
    firstName: firstName,
    lastName: lastName,
    phone: phone,
    gender: gender
  })
  User
  .save(function(err, docs){
    if (err) {
      console.log(err);
      res.sendStatus(500).send(err);
    }
    console.log(docs)
    return res.status(200).json(docs);
    mongoose.disconnect();
  })

})

// search based on postcode
app.get('/api/search/postcode/:id', (req, res) => {
  const searchInfo = new Promise((resolve, reject) => {
    mongoose.connect(url)
    .then(
      () => {
        console.log('Search postcode connect')
      },
      err => { console.log(err) }
    )

    let postcode = parseInt(req.params.id)
    accommodationModel
    .find({})
    .populate({
      path: 'property',
      match: {postcode: postcode}
    })
    .exec(function(err, docs){
      if (err) {
        console.log(err);
      }
      docs = docs.filter( doc =>{
        return doc.property !== null
      })
      mongoose.disconnect();
      resolve(docs)
    })
    }) // promise end
  searchInfo.then(result => {
    return res.json(result);
  })
})

// search based on 
app.get('/api/search/suburb/:id', (req, res) => {
  const searchInfo = new Promise((resolve, reject) => {
    mongoose.connect(url)
    .then(
      () => {
        console.log('Search suburb connect')
      },
      err => { console.log(err) }
    )

    accommodationModel
    .find({})
    .populate({
      path: 'property',
      match: {suburb: new RegExp(req.params.id, 'i')}
    })
    .exec(function(err, docs){
      if (err) {
        console.log(err);
      }
      docs = docs.filter( doc =>{
        return doc.property !== null
      })
      mongoose.disconnect();
      resolve(docs)
    })
    }) // promise end
  searchInfo.then(result => {
    return res.json(result);
  })
})

// get accommodation details based on accId
app.get('/api/accommodation/:id', (req, res) => {
  const accInfo = new Promise((resolve, reject) => {
    mongoose.connect(url)
    .then(
      () => {
        console.log('/api/accommodation/ connects successfully')
      },
      err => { console.log(err) }
    )
    accommodationModel
    .find({'_id': req.params.id})
    .exec( function(err, accs){ 
      (err) => { console.log(err)},
      acc = accs[0];
      propertyModel
      .find({'_id': acc.property})
      .exec( function(err, props){
        (err) => {console.log(err)}
        acc.property = props[0]
        resolve(acc)
        mongoose.disconnect();
      })
      
    })
  });
  accInfo.then((result) => {
    console.log(result)
    if (result === undefined){
      res.status(404).send('No such accId!')
      return
    }
    res.status(200).json(result)    //// TEMP: need use "then" to load user's trasction, until both info loaded,then return to front-end.
  })
});

// get all history(accommodation info) of specific person
app.get('/api/history/:id', (req, res) => {
  const historyInfo = new Promise((resolve, reject) => {
    mongoose.connect(url)
    .then(
      () => {
        console.log('/api/history/ connects successfully')
      },
      err => { console.log(err) }
    )
    transactionModel
    .find({})
    .populate({
      path: 'accommodationId', match: {'owner': req.params.id}
    })
    .sort('modifiedTime')
    .exec( function(err, docs){ 
      (err) => { console.log(err)}
      docs = docs.filter(function(doc){
        return doc.accommodationId != null;
      })
      console.log('docs',docs)
      resolve(docs);
    })
  });
  historyInfo.then((result) => {
    //console.log(res);
    res.json(result)    //// TEMP: need use "then" to load user's trasction, until both info loaded,then return to front-end.
  })
});

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);