const express = require('express');
const commentsController = require('../controllers/commentsController');
const { createPost, getPost, getAllPost, getUserPost, deletePost } = require('../controllers/postController');
const dislikesController = require('../controllers/postDislikes');
const likesController = require('../controllers/postLikes');
const router = new express.Router();
const auth = require("../middlewares/auth.middleware");




router.post("/createpost", auth, async (req,res)=>{
          const data=req.body;
          const user=req.user;
          const result = await createPost(data,user);
          res.send.json(result);
} );
router.get("/getcreatepost", auth, async(req,res)=>{
     const result = await getPost();
     res.send.json(result);
} );

router.get("/allpost", auth, async(req,res)=>{
     const result = await getAllPost();
     res.send.json(result);
});
router.get("/userPost",auth, async(req,res)=>{
    const id=req.user._id;
    const result = await getUserPost(id);
    res.send.json(result);
});
router.delete("/delete/:postId", auth, async(req,res)=>{
   const  id= req.params.postId;
   const result =await deletePost(id);
   res.send.json(result);
});

router.put("/likes",auth, async(req,res)=>{
    const user=req.user;
    const data=req.body
    const result = await likesController(data,user) // data.postId
    res.send.json(result);
});
router.put("/dislikes",auth, async(req,res)=>{
    const user=req.user;
    const data=req.body
    const result = await dislikesController(data,user) // data.postId
    res.send.json(result);
});

router.put("/comments",auth, async(req,res)=>{
     const data=req.body;
   const id=req.user.id;
   const result = await commentsController(data,id); //data.postId ,data.text
});


module.exports = router;