const Comment = require('../models/commentModel');

// const createComment = async (req, res) => {
//     try {
//         const comment = new Comment({
//             user_id: req.body.user_id,
//             post_id: req.body.post_id,
//             comment: req.body.comment,

//         });

//         const commentData = await comment.save();

//         res.status(200).send({ success: true, msg: 'Comment Successfully', data: commentData });
//     } catch (error) {
//         res.status(400).send({ success: false, msg: error.message });
//     }
// }


exports.createComment = async (req, res) => {
    try {
      const { user_id, post_id,username, comment } = req.body;
      const newComment = await Comment.create({ user_id, post_id,username, comment });
      
      // Emit a Socket.io event for real-time updates
      //req.io.emit('new-comment', newComment);
  
      res.status(201).json({ success: true, comment: newComment });
    } catch (error) {
      console.error('Error creating comment:', error);
      res.status(500).json({ success: false, error: 'Internal server error' });
    }
  };


  exports.getComment = async(req,res)=>{
    try{

         const comments = await Comment.find().populate("user_id").populate("post_id");
         res.status(200).send({success:true,msg:"Get Comment Successfully",data:comments});

    } catch(error){
        res.status(400).send({success:false,msg:error.message});
    }

}

// const getCommentsById = async(req,res) => {

//     try{
//         const comment = await Comment.findById(req.params._id).populate("user_id").populate("post_id");

//         if (!comment) {
//             return res.status(404).send({ success: false, msg: "Post not found"});
//         }
        
//         res.status(200).send({success:true,msg:"Get Comment Successfully",data:comment});

//    } catch(error){
//        res.status(400).send({success:false,msg:error.message});
//    }

// }




// const deletePost = async(req,res)=>{
//     try{

//         const id = req.params.id;

//         await Post.deleteOne({_id:id});
//         res.status(200).send({success:true,msg:'Post deleted Successfully'});        
//     } catch(error){
//         res.status(400).send({success:false,msg:error.message});
//     }

// }


// const updateComment = async (req, res) => {
//     try {
//         const postId = req.params.id;
//         const { comment } = req.body;

//         let comments = await Comment.findById(postId);

//         if (!comments) {
//             return res.status(404).send({ success: false, msg: 'Comment not found' });
//         }
//         comments.comment = comment || comments.comment;


//         const updatedPost = await comments.save();

//         res.status(200).send({ success: true, msg: 'Comment updated successfully', data: comments });
//     } catch (error) {
//         res.status(400).send({ success: false, msg: error.message });
//     }
// }


// module.exports = {
//     createComment,
//     getComment,
//     getCommentsById,
//     deletePost,
//     updateComment
// }