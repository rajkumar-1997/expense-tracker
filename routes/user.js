const express=require('express');
const userController=require('../controllers/user');
const router=express.Router();
const middlewareController=require('../middlewares/auth');

router.post('/signup',userController.signUp);
router.post('/login',userController.logIn);
router.get( "/premium-check", middlewareController.authenticate, userController.isUserPremium);

module.exports=router;
