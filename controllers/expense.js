const  Expense=require('../models/expense');
const Sequelize=require('sequelize');
const User=require('../models/user');
const sequelize = require('../util/database');

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
    // console.log(dateNumber);
    // console.log(req.user);

    if(isNotValid(amount) || isNotValid(category) || isNotValid(description)|| isNotValid(description)){
      return res.status(400).send({type:"error",message:"invalid Form Data!"});

    }
    const now = new Date();
    const date = await new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + parseInt(dateNumber)
    );

  try {
    const result=  req.user.createExpense({
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

// exports.getExpensesByDate= async (req,res,next)=>{
//   const dateNumber=req.query.dateNumber;
//   if(isNotValid(dateNumber)){
//     return res.status(400).send({type:'error',message:'Bad query parameter'});
//   }

//   const now=  new date();
//   const date=  new date(
//     now.getFullYear(),
//     now.getMonth()+1,
//     now.getDate+parseInt(dateNumber)
//   );
//   const dateToSend=  formatDate(date,{
//     day: "2-digit",
//     month: "long",
//     year: "numeric",
//   });

//   let sumAndCount={count:0,total:0};

//     Expense.findAll({
//     attributes:[
//       [Sequelize.fn('COUNT',Sequelize.col("id")),"count"],
//       [Sequelize.fn('SUM',Sequelize.col("amount")),"total"]
//     ]
//     ,
//     group: ["userId"],
//     where: {
//       userId: req.user.id,
//       date: date.getDate(),
//       month: date.getMonth(),
//       year: date.getFullYear(),
//     },

//   }).then((sumAndCounts)=>{
//     if(sumAndCounts.length==1){
//          sumAndCount=sumAndCounts[0];
//     }
//     return req.user.getExpenses({
//       where: {
//         date: date.getDate(),
//         month: date.getMonth(),
//         year: date.getFullYear(),
//       }
//     })
// }).then((expenses)=>{
//   res.status(200).send({
//    expenses:expenses,
//    date:dateToSend,
//    totalAndCount: sumAndCount,
//   })
// }).catch((error)=>{
//   console.log(error);
//   res.status(500).send(error);
// })
// }


exports.getExpensesByDate = async (req, res, next) => {
  const dateNumber = req.query.dateNumber;
  if (isNotValid(dateNumber)) {
    return res.status(400).send({ type: 'error', message: 'Bad query parameter' });
  }

  const now = new Date();
  const date =  await new Date(
    now.getFullYear(),
    now.getMonth() ,
    now.getDate() + parseInt(dateNumber)
  );
  const year = date.getFullYear();
  const month = date.toLocaleString('en-IN', { month: 'long' });
  const day = date.getDate().toString().padStart(2, '0');
  const dateToSend = ` ${day} ${month} ${year}`;

  let sumAndCount = { count: 0, total: 0 };

  try {
    const sumAndCounts = await Expense.findAll({
      attributes: [
        [Sequelize.fn('COUNT', Sequelize.col('id')), 'count'],
        [Sequelize.fn('SUM', Sequelize.col('amount')), 'total'],
      ],
      group: ['userId'],
      where: {
        userId: req.user.id,
        date: date.getDate(),
        month: date.getMonth(),
        year: date.getFullYear(),
      },
    });

    if (sumAndCounts.length == 1) {
      sumAndCount = sumAndCounts[0];
    

    const expenses = await req.user.getExpenses({
      where: {
        date: date.getDate(),
        month: date.getMonth(),
        year: date.getFullYear(),
      },
    });

    res.status(200).send({
      expenses: expenses,
      date: dateToSend,
      totalAndCount: sumAndCount,
    });
  }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};









  