const express=require('express');

const router=express.Router();

const expenseFileControllers=require('../controllers/expensefile')
const middlewareController=require('../middlewares/auth');


router.get('/download',middlewareController.authenticate,expenseFileControllers.downloadReport);

router.get('/download-history',middlewareController.authenticate,expenseFileControllers.getDownloadHistory)
module.exports=router;