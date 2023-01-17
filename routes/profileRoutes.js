const express = require('express');
const followers = require('../controllers/followerContollers');
const followingListController = require('../controllers/followingController');
const searchProfileIdController = require('../controllers/searchid');
const searchProfileController = require('../controllers/searchName');
const userFollowersController = require('../controllers/userFollowerController');
const userUnfollowersController = require('../controllers/userUnfollowerController');
const router = new express.Router();

const auth = require("../middlewares/auth.middleware");



router.post("/search", auth, async(req,res)=>{
    const data=req.body;
    const result =await searchProfileController(data); //data.name;
    res.send.json(result);
} );

router.get("/search/:id", auth, async(req,res)=>{
  const id=req.params.id;
  const result =await searchProfileIdController(id);
  res.send.json(result);
});

router.put("/followers", auth, async(req,res)=>{
        const data =req.body;
        const user=req.user;
        const result = await userFollowersController(data,user); //data.followId;
        res.send.json(result);
});

router.put("/unfollowers", auth, async(req,res)=>{
    const id=req.body.unFollowId
    const user =req.user;
    const result = await userUnfollowersController(id,user);
    res.send.json(result);
});

router.post("/following/list", auth, async(req,res)=>{
    const data =req.body;
    const result = await followingListController(data);// email
    res.send.json(result);
});

router.post("/followers/list", auth, async(req,res)=>{
     const data=req.body;
     const result = await followers(data); //email
});




module.exports = router;
