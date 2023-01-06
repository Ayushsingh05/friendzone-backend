const userModel =require('../models/user');

const bcrypt =require('bcrypt');

const jwt = require('jsonwebtoken');

const userRegister = async (data)=>{
    //   return data
    // const user =await userModel.findOne({email:data.email});
    // console.log(data.email);
    // return data.email;
    // if(user){
    //     return {
    //         "status": "failed",
    //         "message": 'Email already exists'
    //     }
    // }
    // else{
        if(data.name && data.email && data.password && data.married){
            try{
                const salt = await bcrypt.genSalt(10);
                const hashPassword = await bcrypt.hash(data.password, salt);
                const newUser= new userModel({
                    name: data.name,
                    email: data.email,
                    password:hashPassword,
                    married: data.married
                   })
                 const temp=  await userModel.create(newUser);
                 console.log(temp);
                 return {
                    "status": "success",
                    "message": 'User Registered Successfully'
                }
            }catch(e){
                return {
                    "status": "success",
                    "message": e.message
                }
            }
          
        }else{
            return {
                "status": "failed",
                "message": 'All fields are required'
            }
        }
    
}

module.exports={
    userRegister,
    
}