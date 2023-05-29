const express=require('express');

const ExpenseController=require('../controllers/expense');
const middlewareController=require('../middlewares/auth');
const router=express.Router();

router.post('/addexpense',middlewareController.authenticate,ExpenseController.postExpense);

router.get('/get-by-date',middlewareController.authenticate,ExpenseController.getExpensesByDate);
router.get('/get-by-month',middlewareController.authenticate,ExpenseController.getExpensesByMonth);
router.get('/get-by-year',middlewareController.authenticate,ExpenseController.getExpensesByYear);
router.delete('/delete/:expenseId',middlewareController.authenticate,ExpenseController.deleteExpense);

module.exports=router; 