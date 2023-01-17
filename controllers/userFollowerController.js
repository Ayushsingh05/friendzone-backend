
const userModel = require("../models/user");


const userFollowersController = async (data,user) =>{
        try
        {
        
        // data =req.body;
        // user=req.user
         userModel.findByIdAndUpdate(data.followId,
          { $push:{followers:user._id} },
          { new:true },
          (err,result)=>{
          if(err)
          {
          return ({error:err});
          }
          userModel.findByIdAndUpdate(user._id,
          {$push:{following:data.followId}},
          {new:true}).select("-password")
           .then(result =>{
          return (result);
          }
          )
          }
          )

          }catch (e)
          {
          console.log(e);
          return {error:"Profile followers not found"};
          }
           }

module.exports = userFollowersController;