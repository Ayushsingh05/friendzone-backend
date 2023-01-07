const express = require('express');
const { userRegister, userLogin, changePassword, loggedInUser } = require('../controllers/userController');
const checkUserAuth = require('../middlewares/auth.middleware');
const routes= express.Router();


routes.post('/register', async(req, res)=>{
    const data =req.body;
 console.log('/',data);
        const message= await userRegister(data);
         
        res.send(message);
    

})
routes.post('/login',async(req,res)=>{
    const data =req.body;
    const message = await userLogin(data);
     res.send(message)
})

routes.post('/changePassword',checkUserAuth,async(req,res)=>{
    const data =req.body;
    const id=req.user._id;
    const message = await changePassword(data,id);
})

routes.get('/loggedInUser',checkUserAuth, async(req,res)=>{
    const data= req.user;
    const message =await loggedInUser(data);
    res.send(message);
})


module.exports= routes