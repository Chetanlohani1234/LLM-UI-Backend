const express = require('express');
const app = express();
const userController = require('../controllers/userControllers')

module.exports=(app)=>{
   app.post('/api/user/signUp', userController.userSignUp);
   //app.get('/api/user/getUserById/:_id',userController.getUserById);
   app.post('/api/user/logIn', userController.loginUser); 
}