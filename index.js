const dotenv =require('dotenv');
dotenv.config();
const cors = require('cors');
const express = require('express');
const connect = require('./config/db');

const app =express();
const port =process.env.PORT;
app.use(cors());
app.use(express.json());
connect().then(()=>{
    console.log("connected to database");
}).catch((err) =>{
    console.log("can't connect to database");
})
app.listen(port,()=>{
    console.log(`server listening at http://localhost:${port}`);
})