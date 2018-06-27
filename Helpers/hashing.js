const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');


//jwt.sign
//jwt.verify

var data ={
    id:4
};

var jwtToken = jwt.sign(data.id,'bharthRaj');
console.log(`jwtToken :${jwtToken}`)

var decodedValue = jwt.verify(jwtToken ,'bharthRaj')
console.log(`decodedValue: ${decodedValue}`)

var message = 'Iam bharath'
var hash = SHA256(message).toString();

console.log(`Message: ${message}`);
console.log(`hash: ${hash}`);



var tokenb = {
    data,
    hashValue : SHA256(JSON.stringify(data) + 'bharath').toString()
}

var resultHash = SHA256(JSON.stringify(tokenb.data) + 'bharath').toString()

if(resultHash === tokenb.hashValue){
console.log('Data was not Change')
}else{
    console.log('Data was  Changed')

}