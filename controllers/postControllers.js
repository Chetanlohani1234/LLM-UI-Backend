const Post = require('../models/postModel');

const createPost = async (req, res) => {
    try {
        const post = new Post({
            user_id: req.body.user_id,
            category: req.body.category,
            heading: req.body.heading,
            description: req.body.description,
            priority: req.body.priority,
        });

        if (!req.file) {
            throw new Error('No file uploaded');
        }

        const image = req.file;

        const imagePath = {
            path: image.path,
            url: `https://system-ticketing-backend.onrender.com/uploads/${encodeURIComponent(image.filename)}`,
        };

        post.image = imagePath;

        const postData = await post.save();

        res.status(200).send({ success: true, msg: 'Post Data Successfully', data: postData });
    } catch (error) {
        res.status(400).send({ success: false, msg: error.message });
    }
}


const getPosts = async(req,res)=>{
    try{

         const posts = await Post.find().populate("user_id");
         res.status(200).send({success:true,msg:"Get data Successfully",data:posts});

    } catch(error){
        res.status(400).send({success:false,msg:error.message});
    }

}

const getPostsById = async(req,res) => {

    try{

        const postId = req.params.id;
        const post = await Post.findById(postId).populate("user_id");

        if (!post) {
            return res.status(404).send({ success: false, msg: "Post not found" });
        }
        
        res.status(200).send({success:true,msg:"Get Data Successfully",data:post});

   } catch(error){
       res.status(400).send({success:false,msg:error.message});
   }

}




const deletePost = async(req,res)=>{
    try{

        const id = req.params.id;

        await Post.deleteOne({_id:id});
        res.status(200).send({success:true,msg:'Post deleted Successfully'});        
    } catch(error){
        res.status(400).send({success:false,msg:error.message});
    }

}


const updatePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const { category, heading, description, priority } = req.body;

        let post = await Post.findById(postId);

        if (!post) {
            return res.status(404).send({ success: false, msg: 'Post not found' });
        }
        post.category = category || post.category;
        post.heading = heading || post.heading;
        post.description = description || post.description;
        post.priority = priority || post.priority;

        if (req.file) {
            const image = req.file;

            const imagePath = {
                path: image.path,
                url: `https://system-ticketing-backend.onrender.com/uploads/${encodeURIComponent(image.filename)}`,
            };

            post.image = imagePath;
        }
        const updatedPost = await post.save();

        res.status(200).send({ success: true, msg: 'Post updated successfully', data: updatedPost });
    } catch (error) {
        res.status(400).send({ success: false, msg: error.message });
    }
}

module.exports = {
    createPost,
    getPosts,
    getPostsById,
    deletePost,
    updatePost
}