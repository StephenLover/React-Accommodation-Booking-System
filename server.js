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
const watchingModel = require('./Datamodel/models/watchingList');

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
    .find({status: 'open'})
    .populate({
      path: 'property',
      match: {postcode: postcode,}
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

// search based on suburb
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
    .find({status: 'open'})
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
    // accommodationModel
    // .find({'_id': req.params.id})
    // .exec( function(err, accs){ 
    //   (err) => { console.log(err)},
    //   acc = accs[0];
    //   propertyModel
    //   .find({'_id': acc.property})
    //   .exec( function(err, props){
    //     (err) => {console.log(err)}
    //     acc.property = props[0]
    //     resolve(acc)
    //     mongoose.disconnect();
    //   })
      
    // })

    transactionModel
    .find({}, 'review star reviewDate traveler')
    .populate({
      path: 'accommodationId traveler',
      populate: {path: 'property', match: {'_id': req.params.id}}
    })
    .exec(function(err, docs){
      if(err){
        console.log(err);
      }
      docs = docs.filter( doc => {
        return doc.accommodationId.property !== null;
      })
      if(docs.length === 0){
        accommodationModel
        .find({})
        .populate({
          path: 'property', match: {'_id': req.params.id}
        })
        .exec(function(err, accs){
          if(err){
            console.log(err);
          }
          accs = accs.filter(acc => {
            return acc.property !== null;
          })
          console.log(accs)
          accs[0] = {
            'review': null,
            'accommodationId': accs[0]
          }
          resolve(accs)
        })
      } else {
      resolve(docs);
      }
    })
  });
  accInfo.then((result) => {
    console.log(result)
    res.status(200).json(result)    //// TEMP: need use "then" to load user's trasction, until both info loaded,then return to front-end.
  })
});

// add accommodation to watching list
app.post('/api/add2watching', (req, res) => {
  mongoose.connect(url)
    .then(
      () => {
        console.log('/api/add2watching/ connects successfully')
      },
      err => console.log(err)
    )
  let user = req.body._id; //user email
  let accId = parseInt(req.body.accId) //accid
  watchingModel
  .findOneAndUpdate({'user': user},
  {'$push': {'watching_list': accId}},
  { "new": true, "upsert": true })
  .exec(function(err, docs){
    if (err){
      console.log(err)
      res.sendStatus(500)
    }
    console.log(docs)
    return res.status(200).json({status:"ok"})
  })
})

// get watching list
app.get('/api/watching/:id', (req, res) => {
  mongoose.connect(url)
    .then(
      () => {
        console.log('/api/watching/ connects successfully')
      },
      err => console.log(err)
    )
  watchingModel
  .find({'user': req.params.id})
  .populate({
    path: 'watching_list',
    populate: {path: 'property'}
  })
  .exec(function(err, docs){
    if (err){
      console.log(err)
      res.status(500)
    }
    if(docs.length === 0){
      return res.status(404)
    }
    res.json(docs[0])
  })
})

// remove accommodation from watching list
app.delete('/api/delwatching', (req,res) => {
  mongoose.connect(url)
    .then(
      () => {
        console.log('/api/delwatching/ connects successfully')
      },
      err => console.log(err)
    )
  let user = req.body._id; //user email
  let accId = parseInt(req.body.accId) //accid
  watchingModel
  .findOneAndUpdate({'user': user},
  {'$pull': {'watching_list': accId}},
  { "new": true, "upsert": true })
  .exec(function(err, docs){
    if (err){
      console.log(err)
      res.sendStatus(500)
    }
    console.log(docs)
    return res.status(200).json({status:"ok"})
  })
})

// add accommodation from watching list to transaction(pending)
app.post('/api/add2pending/', (req, res) => {
  mongoose.connect(url)
    .then(
      () => {
        console.log('/api/delwatching/ connects successfully')
      },
      err => console.log(err)
    )
  let user = req.body._id; //user email
  let accId = parseInt(req.body.accId) //accid
  let trans = new transactionModel({
    traveler: user,
    accommodationId: accId,
    status: 'pending'
  })
  trans.save()
  .then(docs => {
    console.log(docs)
    watchingModel
      .findOneAndUpdate({'user': user},
      {'$pull': {'watching_list': accId}},
      { "new": true, "upsert": true })
      .exec(function(err, docs){
        if (err){
          console.log(err)
          res.sendStatus(500)
        }
        // change status of accommodation open to close
        return res.status(200).json({status:"ok"})
      })
  })
  .catch(err => {
    console.log(err);
    res.sendStatus(500)
  })
})

// get pending list from traveler email
app.get('/api/pending/:id', (req, res) => {
  mongoose.connect(url)
    .then(
      () => {
        console.log('/api/history/traveler connects successfully')
      },
      err => { console.log(err) }
    )
  transactionModel
  .find({'traveler': req.params.id, 'status': 'pending'})
  .populate({
    path: 'accommodationId',
    populate: {path: 'property'}
  })
  .exec(function(err, docs){
    if(err){
      console.log(err)
    }
    if(docs.length === 0){
      res.status(404).send('No such accId')
    }
    res.json(docs[0])
  })
})

// get all history(accommodation info) of specific person
app.get('/api/history/traveler/:id', (req, res) => {
    mongoose.connect(url)
    .then(
      () => {
        console.log('/api/history/traveler connects successfully')
      },
      err => { console.log(err) }
    )
    transactionModel
    .find({'traveler': req.params.id}, 'review star')
    .populate({
      path: 'accommodationId', select: 'startDate endDate price',
      populate: {path: 'property', select: 'address suburb'}
    })
    .sort('modifiedTime')
    .exec( function(err, docs){ 
      if (err){
          console.log(err)
          res.sendStatus(500)
      }
      docs = docs.filter(function(doc){
        return doc.accommodationId != null;
      })
      console.log('docs',docs)
      res.json(docs)
    })
});

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);