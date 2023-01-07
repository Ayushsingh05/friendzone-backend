const userModel =require('../models/user');

const bcrypt =require('bcrypt');

const jwt = require('jsonwebtoken');

const userRegister = async (data)=>{
    //   return data
    const user =await userModel.findOne({email:data.email});
    console.log(data.email);
    // return data.email;
    if(user){
        return {
            "status": "failed",
            "message": 'Email already exists'
        }
    }
    else{
        if(data.name && data.email && data.password ){
            try{
                const salt = await bcrypt.genSalt(10);
                const hashPassword = await bcrypt.hash(data.password, salt);
                const newUser= new userModel({
                    name: data.name,
                    email: data.email,
                    password:hashPassword,
                    
                   })
                 const temp=  await userModel.create(newUser);
                 console.log(temp);
                 const registeredUser= userModel.findOne({email:data.email})
                 
                //  Generate JWT token

                
                 
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

const userLogin =async(data)=>{
    try{
 const {email,password}=data;
 if(email && password){
    const user = await userModel.findOne({ email: email});
    if(user !=null){
        const isMatch = await bcrypt.compare(password, user.password);
        if(isMatch && (user.email === email)){
            return {
                "status": "success",
                "message": 'Login Successfull',
            }
        }else{
            return {
                "status": "failed",
                "message": 'Email or password is incorrect',
            }
        }
    }else{
        return {
            "status": "failed",
            "message": 'User is not Registered',
        }

    }
 }else{
    return {
        "status": "failed",
        "message": 'All fields are required'
    }
 }
    }catch(e){

    }
}




module.exports={
    userRegister,
    userLogin
}