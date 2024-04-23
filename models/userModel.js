const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email : {
    type: String,
  },
  password : {
    type: String,
  },
  // phoneNo : {
  //   type : String,
  // },
  role : {
    type : String,
    //enum : ["admin","collaborator","user"]
  }
},
{ timestamps : true }
);

const User = mongoose.model('User', userSchema);

module.exports = User;