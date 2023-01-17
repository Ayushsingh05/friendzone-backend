const postModel = require('../models/post');
const signupModel = require("../models/user");

const searchProfileIdController = async (id) =>{
// id=req.params.id
  try
  {
  const user_exists = await signupModel.findOne({_id:id}); 
   const post_exists = await postModel.find({postedBy:id}).populate("postedBy");

  if(user_exists)
  {
  return ({user_exists, post_exists});
  }

  }catch(e)
 {
 console.log(e);
  return ({error:"Profile not found"});
  }

  }

module.exports = searchProfileIdController;