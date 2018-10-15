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
const travelerReqModel = require('./Datamodel/models/travelerReq');
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
      res.send([])
      return
    }
    res.status(200).json(result)    //// TEMP: need use "then" to load user's trasction, until both info loaded,then return to front-end.
  })
});

// update user profile with PK email
app.post('/api/user/update', (req, res) => {
  mongoose.connect(url)
    .then(
      () => {
        console.log('/api/user/ connects successfully')
      },
      err => { console.log(err) }
    )
  let _id = req.body._id;// user email
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let phone = req.body.phone;
  userModel
  .findOneAndUpdate({'_id': _id},
  {'$set': {'firstName': firstName, 'lastName': lastName, 'phone': phone}},
  {"new": true })
  .exec(function(err, docs){
    if (err){
      console.log(err)
      res.sendStatus(500)
    }
    console.log(docs)
    return res.status(200).json({status:"ok"})
  })
})

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
    .sort('-ad')
    .exec(function(err, docs){
      if (err) {
        console.log(err);
      }
      docs = docs.filter( doc =>{
        return doc.property !== null
      })
      mongoose.disconnect();
      console.log(docs)
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
    .sort('-ad')
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

// search traveler requirements based on postcode
app.get('/api/search/travelerReq/postcode/:id', (req, res) => {
  mongoose.connect(url)
    .then(
      () => {
        console.log('Search travelerReq suburb connect')
      },
      err => { console.log(err) }
    )

    travelerReqModel
    .find({'postcode': parseInt(req.params._id)})
    .exec(function(err, docs){
      if (err) {
        console.log(err);
      }
      if(docs.length === 0){
        return res.json([{'_id': null}])
      }
      res.json(docs)
      mongoose.disconnect();
    })
})

// search traveler requirements based on suburb
app.get('/api/search/travelerReq/suburb/:id', (req, res) => {
  mongoose.connect(url)
    .then(
      () => {
        console.log('Search travelerReq suburb connect')
      },
      err => { console.log(err) }
    )

    travelerReqModel
    .find({'suburb': req.params.suburb})
    .exec(function(err, docs){
      if (err) {
        console.log(err);
      }
      if(docs.length === 0){
        return res.json([{'_id': null}])
      }
      res.json(docs)
      mongoose.disconnect();
    })
})

// get ad for homepage
app.get('/api/search/ad', (req, res) => {
  mongoose.connect(url)
    .then(
      () => {
        console.log('/api/search/ad connects successfully')
      },
      err => console.log(err)
    )
  accommodationModel
  .find({status: 'open'})
  .populate({
    path: 'property',
  })
  .sort('-ad')
  .limit(3)
  .exec(function(err, docs){
    if(err){
      console.log(err);
    }
    console.log(docs)
    res.json(docs)
  })
})

// get top-rated accommodation on homepage
app.get('/api/toprated', (req, res) => {
  mongoose.connect(url)
    .then(
      () => {
        console.log('/api/toprated connects successfully')
      },
      err => console.log(err)
    )
  accommodationModel
  .find({status: 'open'})
  .populate({
    path: 'property',
  })
  .sort('-avgStar')
  .exec(function(err, docs){
    if(err){
      console.log(err);
    }
    console.log(docs)
    res.json(docs)
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
          //console.log(accs)
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
    //console.log(docs)
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
      return res.json({'watching_list': [], '_id': null, 'user': req.params.id, '__v': null})
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
    //console.log(docs)
    return res.status(200).json({status:"ok"})
  })
})

// add accommodation from watching list to transaction(pending)
app.post('/api/add2pending/', (req, res) => {
  mongoose.connect(url)
    .then(
      () => {
        console.log('/api/add2pending/ connects successfully')
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
        console.log('/api/pending connects successfully')
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
    console.log(docs[0])
    if(docs.length === 0){
      res.send('false') // check if there is a pending list
      return
    }
    res.json(docs[0])
  })
})

// change status from pending to cancel in pending list
app.post('/api/pending/cancel', (req, res) => {
  mongoose.connect(url)
    .then(
      () => {
        console.log('/api/pending/cancel connects successfully')
      },
      err => { console.log(err) }
    )
  let traveler = req.body.traveler; //user email
  let accId = parseInt(req.body.accommodationId) //accid
  console.log('acc',accId)
  transactionModel
  .findOneAndUpdate({'traveler': traveler, 'accommodationId': accId},
  {'$set': {'status': 'cancel'}},
  {"new": true })
  .exec(function(err, docs){
    if(err){
      console.log(err)
    }
    console.log('doc',docs)
    return res.status(200).json({status:"ok"})
  })
})

// change pending to success
app.post('/api/pending/success', (req, res) => {
  mongoose.connect(url)
    .then(
      () => {
        console.log('/api/pending/success connects successfully')
      },
      err => { console.log(err) }
    )
  let traveler = req.body.traveler; //user email
  let accId = parseInt(req.body.accommodationId) //accid
  console.log('acc',accId)
  transactionModel
  .findOneAndUpdate({'traveler': traveler, 'accommodationId': accId},
  {'$set': {'status': 'success'}},
  {"new": true })
  .exec(function(err, docs){
    if(err){
      console.log(err)
    }
    console.log('doc',docs)
    return res.status(200).json({status:"ok"})
  })
})

// get all history(accommodation info) of traveler
app.get('/api/history/traveler/:id', (req, res) => {
    mongoose.connect(url)
    .then(
      () => {
        console.log('/api/history/traveler connects successfully')
      },
      err => { console.log(err) }
    )
    transactionModel
    .find({'traveler': req.params.id}, 'review star status')
    .populate({
      path: 'accommodationId', select: 'startDate endDate price',
      populate: {path: 'property', select: 'address suburb'}
    })
    .sort('-modifiedTime')
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

// get all history(accommodation info) of provider
app.get('/api/history/provider/:id', (req, res) => {
  mongoose.connect(url)
  .then(
    () => {
      console.log('/api/history/provider connects successfully')
    },
    err => { console.log(err) }
  )
  accommodationModel
  .find({}, 'startDate endDate price ad')
  .populate({
    path: 'property', match: {owner: req.params.id}, select: 'address suburb'
  })
  .sort('-startDate')
  .exec( function(err, docs){ 
    if (err){
        console.log(err)
        res.sendStatus(500)
    }
    docs = docs.filter(function(doc){
      return doc.property !== null;
    })
    console.log('docs',docs)
    res.json(docs)
  })
});

// provider pay advertisement
app.post('/api/ad', (req, res) => {
  mongoose.connect(url)
  .then(
    () => {
      console.log('/api/ad connects successfully')
    },
    err => { console.log(err) }
  )
  let accommodationId = parseInt(req.body.accommodationId);
  let ad = parseInt(req.body.ad);
  accommodationModel
  .find({_id: accommodationId})
  .exec(function(err, accs){
    if (err){
      console.log(err)
      res.sendStatus(500)
    }
    let oldAd = accs[0].ad;
    let newAd = oldAd + ad;
    accommodationModel
    .findOneAndUpdate({'_id': accommodationId},
    {'$set': {'ad': newAd}},
    {'new': true})
    .exec(function(err, docs){
      if (err){
        console.log(err)
        res.sendStatus(500)
      }
      console.log(docs)
      return res.status(200).json({status:"ok"})
    })
  })
  
})

// insert review of accommodation from traveler
app.post('/api/review/update', (req, res) => {
  mongoose.connect(url)
  .then(
    () => {
      console.log('/api/review/update connects successfully')
    },
    err => { console.log(err) }
  )
  let traveler = req.body.traveler; // traveler email
  let accommodationId = req.body.accommodationId;
  let review = req.body.review
  let star = req.body.star
  transactionModel
  .findOneAndUpdate({traveler: traveler, accommodationId: accommodationId},
  {'$set': {'review': review, 'star': star, 'reviewDate': Date.now()}},
  {"new": true })
  .exec(function(err, docs){
    if (err){
      console.log(err)
      res.sendStatus(500)
    }
    console.log(docs)
    return res.status(200).json({status:"ok"})
  })
})

// provider add new property
app.post('/api/property/new', (req, res) => {
  mongoose.connect(url)
  .then(
    () => {
      console.log('/api/property/new connects successfully')
    },
    err => { console.log(err) }
  )
  let owner = req.body.owner; // provider email address
  let address = req.body.address;
  let suburb = req.body.suburb;
  let postcode = parseInt(req.body.postcode);
  let capacity = parseInt(req.body.capacity);
  function getRandom(min, max) {
		return 'image/' + (Math.floor(Math.random() * (max-min)) + min) +'.jpg';
	}
  propertyModel
  .count()
  .exec(function(err, count){
    if(err){
      console.log(err);
    }
    console.log('count',count)

    let property = new propertyModel({
      _id: count,
      owner: owner,
      address: address,
      suburb: suburb,
      postcode: postcode,
      capacity: capacity,
      pictures: [getRandom(1,754),getRandom(1,754),getRandom(1,754),getRandom(1,754),getRandom(1,754)]
    })
    property
    .save(function(err, docs){
      if (err) {
        console.log(err);
        res.sendStatus(500).send(err);
      }
      console.log(docs)
      return res.status(200).json(docs);
    })
  })
})

// get property info for provider
app.get('/api/property/:id', (req, res) => {
  mongoose.connect(url)
  .then(
    () => {
      console.log('/api/property connects successfully')
    },
    err => { console.log(err) }
  )

  propertyModel
  .find({'owner': req.params.id})
  .exec(function(err, docs){
    if(err){
      console.log(err);
    }
    console.log(docs)
    res.json(docs)
  })
})

// provider add accommodation based on property
app.post('/api/accommodation/new', (req, res) => {
  mongoose.connect(url)
  .then(
    () => {
      console.log('/api/accommodation/new connects successfully')
    },
    err => { console.log(err) }
  )
  let property = parseInt(req.body.property); // property id
  let startDate = new Date(req.body.startDate); // '2016-07-28'
  let endDate = new Date(req.body.endDate); // '2016-07-28'
  let price = parseInt(req.body.price);
  let ad = req.body.ad ? parseInt(req.body.ad) : 0
  
  accommodationModel
  .count()
  .exec(function(err, count){
    if(err){
      console.log(err);
    }
    console.log('count',count)
    let acc = new accommodationModel({
      _id: count,
      property: property,
      startDate: startDate,
      endDate: endDate,
      price: price,
      ad: ad
    })
    acc
    .save(function(err, docs){
      if (err) {
        console.log(err);
        res.sendStatus(500).send(err);
      }
      console.log(docs)
      return res.status(200).json(docs);
    })
  })
})

// post traveler requirement
app.post('/api/travelerReq', (req, res) => {
  mongoose.connect(url)
  .then(
    () => {
      console.log('/api/travelerReq connects successfully')
    },
    err => { console.log(err) }
  )
  let user = req.body.user; // traveler email
  let suburb = req.body.suburb;
  let postcode = parseInt(req.body.postcode);
  let capacity = parseInt(req.body.capacity);
  let minPrice = parseInt(req.body.minPrice);
  let maxPrice = parseInt(req.body.maxPrice);
  let comment = req.body.comment; // special requirements
  const travelerReq = new travelerReqModel({
    user: user,
    suburb: suburb,
    postcode: postcode,
    capacity: capacity,
    minPrice: minPrice,
    maxPrice: maxPrice,
    comment: comment
  })
  travelerReq
  .save(function(err, docs){
    if(err){
      console.log(err)
    }
    console.log(docs)
  })
})

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);