// import external class
let mongoose = require('mongoose');
const userModel = require('./models/user.js');
const accommodationModel = require('./models/accommodation.js');
const transactionModel = require('./models/transaction.js');
const propertyModel = require('./models/property');
const watchingModel = require('./models/watchingList')

// define the address and database name, then connect
const server = '127.0.0.1:27017'; // REPLACE WITH YOUR DB SERVER
const database = 'test';      // REPLACE WITH YOUR DB NAME
const url = `mongodb://${server}/${database}`;
class Database{
  constructor() {
    this._connect();
  }
  _connect() {
    mongoose.connect(url)
      .then(() => {
        console.log('Database connection successful')
        //mongoose.connection.db.dropDatabase();
        //console.log('Database drop');
        // userModel.remove({})
        //   .then(() => {
        //     console.log('collection removed')
        //   })
        //   .catch(err => {
        //     console.log('error: '+err)
        //   })
      
      })
      .catch(err => {
        console.error('Database connection error')
      })
  }
}

// const accDB = new Database();

// // create new record
// let user = new userModel({
//   _id: 'albuslee@gmail.com',
//   password: '111'
// });
// let prop= new propertyModel({
//   _id: 0,
//   owner: user,
//   address: '121 Dora St.',
// })
// let acc = new accommodationModel({
//   _id: 0,
//   property: prop,
// })
// let trans = new transactionModel({
//   accommodationId: acc,
//   traveler: user,
// })

// // save function
// for(let x of [user, prop, acc, trans]){
//   x.save()
//    .then(doc => {
//      console.log(doc)
//    })
//    .catch(err => {
//      console.error(err)
//    })
// }


// find owner's details of accommodation
// accommodationModel.
//   find({}).
//   populate({
//     path: 'owner',
//     match: { postcode: { $eq: '2032'} }
//   }).
//   sort('startDate').
//   exec(function (err, docs) {
//     if (err) return handleError(err);
//     docs = docs.filter(function(doc){
//       return doc.tags != null;
//     })
//     console.log('The result %s', docs);
//   });

// find accommodations
// accommodationModel
//   .find({postcode: '2032'}, null, {skip: 10})
//   //.sort('startDate')
//   .exec(function (err, docs){
//     if (err) return handleError(err);
//     console.log(docs);
//   })

  mongoose.connect(url)
    .then(
      () => {
        console.log('Database connects successfully')
      },
      err => console.log(err)
    )
  let user = 'test@gmail.com'; //user email
  let accId = 12 //accid
  // watchingModel
  // .findOneAndUpdate({'user': user},
  // {'$push': {'watching_list': accId}},
  // { "new": true, "upsert": true })
  // .exec(function(err, docs){
  //   if (err){
  //     console.log(err)
  //   }
  //   console.log(docs)
  // })

transactionModel
.find({},'star')
.populate({
  path: 'accommodationId', match: {'property': 100}
})
.exec(function(err, docs){
  if(err){
    console.log(err)
  }
  docs = docs.filter( doc => {
    return doc.accommodationId !== null;
  })
  console.log(docs)
  mongoose.disconnect()
})
