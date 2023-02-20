const express = require('express');
const commentsController = require('../controllers/commentsController');
const { createPost, getPost, getAllPost, getUserPost, deletePost } = require('../controllers/postController');
const dislikesController = require('../controllers/postDislikes');
const likesController = require('../controllers/postLikes');
const router = new express.Router();
const auth = require("../middlewares/auth.middleware");
const multer=require('multer');



router.get("/getcreatepost", auth, async(req,res)=>{
    const result = await getPost();
     res.send(result);
} );

router.get("/allpost", auth, async(req,res)=>{
     const result = await getAllPost();
     res.send(result);
});
router.get("/userPost",auth, async(req,res)=>{
    const id=req.user._id;
    const result = await getUserPost(id);
    res.send(result);
});
router.delete("/delete/:postId", auth, async(req,res)=>{
   const  id= req.params.postId;
   const result =await deletePost(id);
   res.send(result);
});

router.put("/likes",auth, async(req,res)=>{
    const user=req.user;
    const data=req.body
    // console.log(data);
    const result = await likesController(data,user) // data.postId
    res.send(result);
});
router.put("/dislikes",auth, async(req,res)=>{
    const user=req.user;
    const data=req.body
    const result = await dislikesController(data,user) // data.postId
    res.send(result);
});

router.put("/comments",auth, async(req,res)=>{
     const data=req.body;
     const id=req.user.id;
     const result = await commentsController(data,id); 
   res.send(result);//data.postId ,data.text
});

const imageConfig= multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,"./upload_posts")
    },
    filename:(req,file,callback)=>{
        callback(null,`image-${Date.now()}.${file.originalname}`)
    }
})

const isImage=(req,file,callback)=>{
    if(file.mimetype.startswith("image")){
        callback(null,true)
    }
    else{
        callback(new Error("Only Image is allowed"))
    }
}

const upload=multer({
    storage:imageConfig,
    fileFilter:isImage,
})

router.post("/createpost",upload.single("postImage"), auth, async (req,res)=>{
          const data=req.body;
          const user=req.user;
          const {filename}=req.file;
          const result = await createPost(data,user,filename);
          res.send(result);
} );

router.post("/uploadImage")


module.exports = router;