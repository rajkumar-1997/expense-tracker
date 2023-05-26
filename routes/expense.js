const express=require('express');

const ExpenseController=require('../controllers/expense');
const router=express.Router();

router.post('/addexpense',ExpenseController.postExpense);


module.exports=router;