const express=require('express');

const ExpenseController=require('../controllers/expense');
const middlewareController=require('../middlewares/auth');
const router=express.Router();

router.post('/addexpense',middlewareController.authenticate,ExpenseController.postExpense);

router.get('/get-by-date',middlewareController.authenticate,ExpenseController.getExpensesByDate);


module.exports=router;