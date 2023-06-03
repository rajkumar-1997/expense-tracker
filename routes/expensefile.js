const express=require('express');

const router=express.Router();

const expenseFileControllers=require('../controllers/expensefile')
const middlewareController=require('../middlewares/auth');


router.get('/download',middlewareController.authenticate,expenseFileControllers.downloadReport);


module.exports=router;