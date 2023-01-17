const postModel = require("../models/post");
const userModel = require("../models/user");

const userUnfollowersController = async (id, user) => {
    // id=req.body.unFollowId
    // user =req.user
  try {
  
    userModel.findByIdAndUpdate(
      id,
      { $pull: { followers: user._id } },
      { new: true },
      (err, result) => {
        if (err) {
          return { error: err };
        }
        userModel
          .findByIdAndUpdate(
            user._id,
            { $pull: { following: id } },
            { new: true }
          )
          .select("-password")
          .then((result) => {
            return (result);
          });
      }
    );
  } catch (e) {
    console.log(e);
    return { error: "Profile unfollowers not found" };
  }
};

module.exports = userUnfollowersController;
