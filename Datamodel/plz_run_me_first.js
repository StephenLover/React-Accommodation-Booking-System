let mongoose = require('mongoose');
const userModel = require('./models/user.js');
const accommodationModel = require('./models/accommodation.js');
const transactionModel = require('./models/transaction.js');
const propertyModel = require('./models/property');
const reviewModel = require('./models/review');
const watchingModel = require('./models/watchingList');
const travelerReqModel = require('./models/travelerReq');
const shell = require('shelljs');

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
          mongoose.connection.db.dropDatabase();
          //console.log('Database drop');
        
        })
        .catch(err => {
          console.error('Database connection error')
        })
    }
  }
  
  //const accDB = new Database();
  
  function getSum(array, key) {
    return array.reduce(function (r, a) {
        return r + a[key];
    }, 0);
  }

  // create new record
  let user = new userModel({
    _id: 'albuslee@gmail.com',
    password: '111'
  });
  let prop= new propertyModel({
    _id: 0,
    owner: user,
    address: '121 Dora St.',
  })
  let acc = new accommodationModel({
    _id: 0,
    property: prop,
  })
  let trans = new transactionModel({
    accommodationId: acc,
    traveler: user,
  })
  let rev = new reviewModel({
      accommodationId: acc,
      reviewer: user,
  })
  let watch = new watchingModel({
      user: user,
      watching_list: [acc]
  })
  let travelerReq = new travelerReqModel({
    user: user,
    minPrice: 20,
    maxPrice: 100,
  })
  
  const dropDatabase = new Promise((resolve, reject) => {
    mongoose.connect(url)
        .then(() => {
          mongoose.connection.db.dropDatabase(function(err){
            if(err){
              reject(err)
            }else{
              resolve()
            }
          });
        })
        .catch(err => {
          console.error('Database connection error')
        })
  })

  dropDatabase.then(res =>{
    const foo = new Promise((resolve, reject) => {
      // mongoose.connect(url)
      //   .then(
      //     () => {
      //       console.log('Database connects successfully')
      //     },
      //     err => { console.log(err) }
      //   )
      // save function
      let control_list = []
      let n = 7
      console.log('Database initializing...')
      for(let x of [user, prop, acc, trans, rev, watch, travelerReq]){
        x.save()
        .then(doc => {
          control_list.push(doc)
          if(control_list.length === n){
            console.log('Database initialized successfully!')
            resolve(control_list)
            mongoose.disconnect()
          }
        })
        .catch(err => {
          console.error(err)
        })
      }
    })
    foo
    .then(res => {
      shell.exec('sh data.sh')
      mongoose.connect(url)
        .then(
          () => {
            console.log('Database connects successfully')
          },
          err => { console.log(err) }
        )
      const getNumProperty = new Promise((resolve, reject) => {
        propertyModel
        .count()
        .exec(function(err, count){
          if(err) {console.log(err)}
          //console.log(count)
          resolve(count)
      })
      })
      getNumProperty.then(count =>{
        let res_list = []
        console.log('----------------------------')
        console.log('Calculating Average Stars...')
        console.log('----------------------------')
        for(let i = 0; i< count; i++){
          let sum = 0;
          transactionModel
            .find({}, 'star')
            .populate({
              path: 'accommodationId', match: {property: i}, select: '_id'
            })
            .exec( function(err, docs){ 
              if (err){
                  console.log(err)
              }
              docs = docs.filter(function(doc){
                return (doc.accommodationId !== null) && (doc.star !== null);
              })
              //console.log('docs',docs)
              sum = getSum(docs, 'star')
              let mean = 0
              if(docs.length !== 0){
                mean = (sum/docs.length).toFixed(1)
              }
              //console.log(i,mean)
              propertyModel
              .findOneAndUpdate({'_id': i},
              {'$set': {'avgStar': mean}},
              {'new': true})
              .exec(function(err, results){
                if(err) {console.log(err)}
                //console.log(results)
                res_list.push(0)
                if(res_list.length === count){
                  console.log('---------------------------------------------')
                  console.log('All database constructed successfully! Enjoy!')
                  console.log('---------------------------------------------')
                  mongoose.disconnect();
                }
              })
            })
        }
      })
      
    })
  })
  