const postModel = require("../models/post");

const likesController = async (data,user) => {
    // user=req.user;
    // data=req.body
    // console.log(data);
  try {
    const likesDetails = await postModel.findByIdAndUpdate(
      data.postId,
      { $push: { likes: user._id } },
      { new: true }
    );
 console.log(likesDetails);
    return (likesDetails);
  } catch (e) {
    console.error(e);
    return ({ error: "Failed to fetch post likes data" });
  }
};

module.exports = likesController;
