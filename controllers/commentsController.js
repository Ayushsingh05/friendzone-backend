const { request } = require('express');
const postModel =require('../models/post');

const commentsController= async (data,id)=>{
          try{
          const  comment ={
            text:data.text,
            postedBy:id,
          }

          const details= await postModel.findByIdAndDelete(data.postId,{$push:{comments:comment}},{new:true}).populate("comments.postedBy").populate("postedBy");
           return {
            "status":"success",
            "data":details,
           }
          }catch(e){
             return{
                "status":"error",
                "data":e.message,
             }
          }
}

module.exports=commentsController