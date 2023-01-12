const postModel = require('../models/postModel');
const signupModel = require("../models/signupModel");

const profileFollowersController = async (req, res) =>{
                                              try
                                              {
                                                console.log(req.body.followId);
                                                signupModel.findByIdAndUpdate(req.body.followId,
                                                                              { $push:{followers:req.user._id} },
                                                                              { new:true },
                                                                              (err,result)=>{
                                                                                              if(err)
                                                                                              {
                                                                                                return res.status(422).json({error:err});
                                                                                              }
                                                signupModel.findByIdAndUpdate(req.user._id,
                                                                              {$push:{following:req.body.followId}},
                                                                              {new:true}).select("-password")
                                                                              .then(result =>{
                                                                                        res.status(200).json(result);
                                                                                             }
                                                                                    )
                                                                                            }
                                                                              )

                                              }catch (e)
                                                {
                                                  console.log(e);
                                                  return res.status(404).json({error:"Profile followers not found"});
                                                }
                                          }

module.exports = profileFollowersController;