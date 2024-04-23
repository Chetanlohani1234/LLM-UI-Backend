const express = require('express');
const app = express();
const adminController = require('../controllers/adminControllers')

module.exports=(app)=>{
   app.post('/api/admin/signUp', adminController.adminSignUp);
   app.get('/api/admin/getAdminById/:_id',adminController.getAdminById);
   app.post('/api/admin/logIn', adminController.loginAdmin); 
}   