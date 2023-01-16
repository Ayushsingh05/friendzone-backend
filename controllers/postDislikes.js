const postModel = require("../models/post");

const dislikesController = async (data,user) => {
    // user=req.user;
    // data=req.body
  try {
    const dislikesDetails = await postModel.findByIdAndUpdate(
        data.postId,
      { $pull: { likes: user._id } },
      { new: true }
    );

    return(dislikesDetails);
  } catch (e) {
    console.error(e);
    return ({ error: "Failed to fetch post likes data" });
  }
};

module.exports = dislikesController;
