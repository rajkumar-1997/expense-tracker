const  Expense=require('../models/expense');
const Sequelize=require('sequelize');
const User=require('../models/user');

function isNotValid(str) {
    if (str == undefined || str.length === 0) return true;
    else return false;
  }
  
  function formatDate(date, options) {
    return new Intl.DateTimeFormat("en-IN", options).format(date);
  }

  exports.postExpense= async (req,res,next)=>{
    const {amount,category,description}=req.body;
    const dateNumber= req.query.dateNumber;
    console.log(dateNumber);
    // console.log(req.user);

    if(isNotValid(amount) || isNotValid(category) || isNotValid(description)|| isNotValid(description)){
      return res.status(400).send({type:"error",message:"invalid Form Data!"});

    }
    const now = new Date();
    const date = await new Date(
      now.getFullYear(),
      now.getMonth()+1,
      now.getDate() + parseInt(dateNumber)
    );

  try {
    const result=  Expense.create({
      amount,
      category,
      description,
      date: date.getDate(),
      month: date.getMonth(),
      year: date.getFullYear(),
     
    })
    res.status(201).send({
      expense:result,
      notification:{
        type:"success",
        message:`${category} Expense Added`
      },
    });
  } catch (error) {
      
    res.status(500).json({message:error.message})
  }
   
  
   
  };




  