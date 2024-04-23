const express = require('express');
const app = express();
const commentController = require('../controllers/commentControllers')
//const userController = require('../controllers/userControllers')

module.exports=(app)=>{
   app.post('/api/user/comment', commentController.createComment);
   app.get('/api/user/getComment',commentController.getComment);
   //app.get('/api/user/getCommentById/:_id',commentController.getCommentsById);
   //app.put('/api/update-comment/:id',commentController.updateComment);
   //app.post('/api/user/logIn', userController.loginUser); 
}