var {User} = require('../models/user');

var validate = ((req,res,next)=>{
    var token = req.header('x-auth');
    User.findByToken(token).then((user)=>{
        if(!user){
          //console.log('No User Found');
          return Promise.reject();
        }
        req.user = user;
        req.token = token;
        next()
      }).catch((e)=>{
        console.log('Errorrrrrr');
    
        res.status(401).send(e)
      })
})

module.exports = {validate};