const express = require('express');
const { userRegister } = require('../controllers/userController');
const routes= express.Router();

//Public Routes

routes.post('/register', async(req, res)=>{
    const data =req.body;
 console.log('/',data);
        const message= await userRegister(data);
         
        res.send(message);
    

})




module.exports= routes