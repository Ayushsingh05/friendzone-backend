
const postModel =require('../models/post');



const createPost = async(data,user)=>{
          // data= req.body;
          // user= req.user
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

  const getPost =async ()=>{
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
  const getAllPost = async ()=>{
    try{
        const allpost= await postModel.find("postedBy", "_id, name").sort("-createdAt");
         return{
            "status":"success",
            "message": "All Post get Successfully",
            "data":allpost
         }
    }catch(e){
        return {
            "status":"failed",
            "message": e.message,
        }
    }
  }

  const getUserPost = async (id)=>{
    // id=req.user._id
    try{
       const posts= await postModel.find({postedBy:id}).populate("postedBy").sort("-createdAt");
       return {
            "status":"success",
            "message": "User Post Data get Successfully",
            "data": posts
       }
    }catch(e){
     return{
        "status":"failed",
        "message": e.message,
     }
    }
  }

  const deletePost = async (id)=>{
    //  id= req.params.postId
    try{
       const post =await postModel.findById({_id:id});
       if(!post){
   return {
            "status":"failed",
            "message": "Post Not Found",
   }
       }
       else{
        const temp = await postModel.findByIdAndDelete({_id:id});
        return {
            "status":"success",
            "message": "Post Deleted Successfully",
            "data":temp,
        }
       }
    }catch(e){
      return {
        "status":"failed",
        "message": e.message,
      }

    }

  }


       module.exports={
            createPost,
            getPost,
            getAllPost,
            getUserPost,
            deletePost
               }
