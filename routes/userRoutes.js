const express = require('express');
const { userRegister, userLogin, changePassword, loggedInUser, getAllUser } = require('../controllers/userController');
const checkUserAuth = require('../middlewares/auth.middleware');
const routes= express.Router();



routes.get('/',async(req,res)=>{
    const users= await getAllUser();
    res.send(users);
})
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