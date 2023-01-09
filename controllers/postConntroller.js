
const { request } = require('express');
const postModel =require('../models/post');



const createPost = async(data,user)=>{
         const {post_title,post_body,post_pic_url}=data;
         if(!post_title || !post_body || !post_pic_url){
            return {
                "status":"failed",
                "message": "All feilds are required"
            }
         }
         try{
        const posDetails= new postModel({
            post_title,
            post_body,
            post_pic_url,
            postedBy:user
        })
       const temp = await postModel.create(posDetails);
       return {
            "status":"success",
            "message": "Post Created Successfully",
            "data":temp
       }
         }catch(e){
            return {
                "status":"failed",
                "message": e.message,
            }
         }
    
         }

         const getAllPost =async ()=>{
             try{
           const postData=await postModel.find();
           return{
               "status":"success",
               "message": "Post get Successfully",
               "data" : postData
           }
             }catch(e){
                return{
                    "status":"failed",
                    "message": e.message,   
             }
         }
        }

        module.exports={
            createPost,
            getAllPost
        }
