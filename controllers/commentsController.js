
const postModel =require('../models/post');

const commentsController= async (data,id)=>{
   // data=req.body;
   // id=req.user.id;
          try{
          const  comment ={
            text:data.text,
            postedBy:id,
          }
          const details = await postModel.findByIdAndUpdate(data.postId, { $push:{comments:comment} }, { new:true} ).
                                                                      populate("comments.postedBy").populate("postedBy");
          if(details){
            return {
               "status":"success",
               "data":details,
              }
          }
          else{
           return {
               "status":"failed",
               "data":"not find details",
              }
          }
         
          }catch(e){
             return{
                "status":"error",
                "data":e.message,
             }
          }
}

module.exports=commentsController