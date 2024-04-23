const mongoose = require('mongoose');

const ticketingSchema = mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
        },
    category:{
       type:String,
    },
    heading:{
        type:String,
    },
    description:{
        type:String,
    },
    priority:{
        type:String,
    },
    image:{
        type:Object,
    },
},
{timestamps:true}
)

module.exports = mongoose.model("Post",ticketingSchema);