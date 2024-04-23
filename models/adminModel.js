const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email : {
    type: String,
  },
  password : {
    type: String,
  },
  phoneNo : {
    type : String,
  },
  role : {
    type : String,
    //enum : ["admin","collaborator","user"]
  }
},
{ timestamps : true }
);

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;