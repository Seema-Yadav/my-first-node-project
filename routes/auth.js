const express=require('express');
const{register,login,forgotPasssword }=require('../controller/auth');
const router=express.Router();
router.post('/register',register);
router.post('/login',login);
router.post('/forgotpassword',forgotPasssword);
module.exports=router;