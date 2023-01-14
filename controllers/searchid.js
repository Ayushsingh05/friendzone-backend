const postModel = require('../models/postModel');
const signupModel = require("../models/signupModel");

const searchProfileIdController = async (req, res) =>{

                                              try
                                              {
                                                const profile_exists = await signupModel.findOne({_id:req.params.id}); //.select("-password")
                                                const post_exists = await postModel.find({postedBy:req.params.id}).populate("postedBy");

                                                if(profile_exists)
                                                {
                                                  return res.status(200).json({profile_exists, post_exists});
                                                }

                                              }catch(e)
                                              {
                                                console.log(e);
                                                return res.status(404).json({error:"Profile not found"});
                                              }

                                            }

module.exports = searchProfileIdController;