const userModel =require('../models/user');

const followers = async (data) =>{
    try
    {
      const {email} = data;

        const followersList = await userModel.findOne({email}).populate("followers");
        return followersList;  

    }catch(e)
      {
          console.error(e);
          return {error : e.message};
      }
 }

module.exports = followers