const {MongoClient , ObjectID} = require('mongodb');

const dburl = 'mongodb://localhost:27017/mongodb_API'
MongoClient.connect('mongodb://localhost:27017/mongodb_API',(err,dataBase)=>{
if(err){
    console.log('connect to NOT DB')
}
    console.log('connect to DB')

    dataBase.collection('users').insertOne({
        name:'Bharath',
        lastName:'Thatikonda'
    },(err,results)=>{
        if(err){
        console.log('not inserted records');
    }
     console.log(results.ops);
     console.log( JSON.stringify(results.ops));
    });
dataBase.close();
// db.collection('Todos').insertOne({
  //   text: 'Something to do',
  //   completed: false
  // }, (err, result) => {
  //   if (err) {
  //     return console.log('Unable to insert todo', err);
  //   }
  //
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // });

  // Insert new doc into Users (name, age, location)
  // db.collection('Users').insertOne({
  //   name: 'Andrew',
  //   age: 25,
  //   location: 'Philadelphia'
  // }, (err, result) => {
  //   if (err) {
  //     return console.log('Unable to insert user', err);
  //   }
  //
  //   console.log(result.ops[0]._id.getTimestamp());
  // });
});