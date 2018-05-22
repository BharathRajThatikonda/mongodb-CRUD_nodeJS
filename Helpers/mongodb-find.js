const {MongoClient,ObjectID} = require('mongodb');

const dburl = 'mongodb://localhost:27017/mongodb_API'
MongoClient.connect('mongodb://localhost:27017/mongodb_API',(err,dataBase)=>{
if(err){
    console.log('connect to NOT DB')
}
    console.log('connect to DB')
//***** Featch All the Data of the Colection *****/
//    dataBase.collection('users').find().toArray().then((results)=>{
//     console.log(`${results} collection Objects`);
//     console.log(`${JSON.stringify(results,undefined,2)} collection Objects`);

//    },(err)=>{
//         console.log('unabel to featc',err);
//    })

//***** Featch Data by Qurey by a Name Feild ****/
// dataBase.collection('users').find({'lastName':'Thatikonda'}).toArray().then((results)=>{
//     console.log(`${results} collection Objects`);
//     console.log(`${JSON.stringify(results,undefined,2)} collection Objects`);

//    },(err)=>{
//         console.log('unabel to featc',err);
//    })


//***** Featch Data by Qurey by ID ****/
// dataBase.collection('users').find({ _id:new ObjectID('5b04021d8177b78db4fa3dc6')}).toArray().then((results)=>{
//     console.log(`${results} collection Objects`);
//     console.log(`${JSON.stringify(results,undefined,2)} collection Objects`);

//    },(err)=>{
//         console.log('unabel to featc',err);
//    })
//***** Featch collection Get Count****/
//    dataBase.collection('users').find().count().then((results)=>{
//     console.log(`${results} collection Objects`);
//    },(err)=>{
//         console.log('unabel to featc',err);
//    })

//***** Featch collection Count  by Qurey ****/

   dataBase.collection('users').find({ _id:new ObjectID('5b04021d8177b78db4fa3dc6')}).count().then((results)=>{
    console.log(`${results} collection Objects`);
   },(err)=>{
        console.log('unabel to featc',err);
   })
});