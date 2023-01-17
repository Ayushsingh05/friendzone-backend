// const postModel = require("../models/post");
const userModel = require("../models/user");

const searchProfileController = async (data) => {
    // data=req.body
  try {
    const { name } = data;

    if (!name) {
      return  ({ error: "Please add valid profile name to search" });
    }

    const user_exits = await userModel.findOne({ name });

    if (user_exits) {
      return (user_exits);
    } else {
      return ({ error: "Profile not found" });
    }
  } catch (e) {
    console.log(e);
    return ({ error: "Profile not found" });
  }
};

module.exports = searchProfileController;
