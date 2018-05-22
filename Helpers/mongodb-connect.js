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
});