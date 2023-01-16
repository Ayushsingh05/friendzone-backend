const postModel = require("../models/post");

const likesController = async (data,user) => {
    // user=req.user;
    // data=req.body
  try {
    const likesDetails = await postModel.findByIdAndUpdate(
      data.postId,
      { $push: { likes: user._id } },
      { new: true }
    );

    return (likesDetails);
  } catch (e) {
    console.error(e);
    return ({ error: "Failed to fetch post likes data" });
  }
};

module.exports = likesController;
