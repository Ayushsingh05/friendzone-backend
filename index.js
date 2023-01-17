const dotenv =require('dotenv');
dotenv.config();
const cors = require('cors');
const express = require('express');
const connect = require('./config/db');
const userRoute= require('./routes/userRoutes')
const profileRoute = require('./routes/profileRoutes');
const postRoute= require('./routes/postRoutes')
const app =express();
const port =process.env.PORT;
app.use(cors());
app.use(express.json());

app.use('/user',userRoute);
app.use('/profile',profileRoute);
app.use('/post',postRoute);
 app.get('/',(req,res)=>{
    res.send("FriendZone is Live Now")
 })
connect().then(()=>{
    console.log("connected to database");
}).catch((err) =>{
    console.log(err.message);
})
app.listen(port,()=>{
    console.log(`server listening at http://localhost:${port}`);
})