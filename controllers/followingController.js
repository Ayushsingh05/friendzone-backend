const userModel = require("../models/user");

const followingListController = async (data) => {
  // data=req.body
  try {
    const { email } = data;

    const followingListDetails = await userModel
      .findOne({ email })
      .populate("following");

    return followingListDetails;
  } catch (e) {
    console.error(e);
    return { error: e.message };
  }
};

module.exports = followingListController;
