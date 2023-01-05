const userModel =require('../models/user');

const bcrypt =require('bcrypt');

const jwt = require('jsonwebtoken');

const userRegister = async (data)=>{
    const {name ,email,password,gender} =data;
    const user =await userModel.findOne({email:email});
    if(user){
        return {
            "status": "failed",
            "message": 'Email already exists'
        }
    }
    else{
        if(name && email && password && gender){
            try{
                const salt = await bcrypt.genSalt(10);
                const hashPassword = await bcrypt.hash(password, salt);
                const newUser= new userModel({
                    name: name,
                    email: email,
                    password:hashPassword,
                    gender: gender
                   })
                 const temp=  await userModel.create(newUser);
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
}

module.exports={
    userRegister,
    
}