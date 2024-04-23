const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
        },
    post_id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Post'
            },
    username:{
        type:String,
            },        
    comment:{
       type:String,
    },
},
{timestamps:true}
)

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;