const mongoose = require('mongoose')
require('dotenv').config();
async function connect(){
 return new Promise((resolve,reject)=>{
    mongoose.connect(process.env.DB,(err)=>{
        if(err){
            reject(err);
        }
        resolve();
    })
 })
}

module.exports=connect;