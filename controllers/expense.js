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
    const result= await req.user.createExpense({
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
      
    res.status(500).send(error)
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
  const dateNumber = +req.query.dateNumber;
  if (isNotValid(dateNumber)) {
    return res.status(400).send({ type: 'error', message: 'Bad query parameter' });
  }

  const now = new Date();
  const date =  await new Date(
    now.getFullYear(),
    now.getMonth(),
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
  else{
    sumAndCount = 0;
    

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


const { Op } = require('sequelize');

exports.getExpensesByMonth = async (req, res, next) => {
  const monthNumber = +req.query.monthNumber;
  if (isNotValid(monthNumber)) {
    return res.status(400).send({ type: "error", message: "Bad Query Parameters!" });
  }

  const now = new Date();
  const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth() + monthNumber, 1);
  const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + monthNumber + 1, 0);

  const expensesByDay = [];
  const currentDate = new Date(firstDayOfMonth);

  let totalMonthlyExpense = 0; // Track total monthly expense

  while (currentDate <= lastDayOfMonth) {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth(); // Adjusted for 0-based indexing
    const day = currentDate.getDate();
    const formattedDate = formatDate(currentDate, { day: "2-digit", month: "long", year: "numeric" });

    try {
      const expenses = await Expense.findAll({
        where: {
          userId: req.user.id,
          month: month,
          year: year,
          date: day, // Compare only the day portion
        },
        attributes: ['amount', 'category', 'description']
      });

      const dailyExpenses = expenses.map((expense) => ({
        amount: expense.amount,
        category: expense.category,
        description: expense.description
      }));

      expensesByDay.push({ date: formattedDate, expenses: dailyExpenses });

      // Calculate daily expense total and add to monthly total
      const dailyExpenseTotal = expenses.reduce((sum, expense) => sum + parseFloat(expense.amount) , 0);
      totalMonthlyExpense += dailyExpenseTotal;
    } catch (err) {
      console.log(err);
      return res.status(500).send(err);
    }

    currentDate.setDate(currentDate.getDate() + 1);
  }

  const monthName = formatDate(firstDayOfMonth, { month: "long",year: "numeric" }); // Get month name in English

  res.status(200).send({ month: monthName, totalMonthlyExpense: totalMonthlyExpense, expensesByDay });
};













exports.getExpensesByYear = async (req, res, next) => {
  const yearNumber = +req.query.yearNumber;
  console.log(yearNumber);
  if (isNotValid(yearNumber)) {
    return res
      .status(400)
      .send({ type: "error", message: "Bad Query Parameters!" });
  }

  const year = new Date().getFullYear() + yearNumber;

  try {
    const monthlyData = await Expense.findAll({
      where: {
        userId: req.user.id,
        year: year
      },
      attributes: [
        "month",
        "category",
        [Sequelize.fn("SUM", Sequelize.col("amount")), "totalExpense"]
      ],
      group: ["month", "category"],
      raw: true
    });

    const monthlySumData = await Expense.findAll({
      where: {
        userId: req.user.id,
        year: year
      },
      attributes: [
        "month",
        [Sequelize.fn("SUM", Sequelize.col("amount")), "totalMonthlyExpense"]
      ],
      group: ["month"],
      raw: true
    });

    const yearlySum = monthlyData.reduce((sum, object) => sum + parseFloat(object.totalExpense || 0), 0);

    const categoryWiseSums = {};

    monthlyData.forEach((object) => {
      const month = object.month;
      const category = object.category;
      const expense = object.totalExpense || 0;

      if (!categoryWiseSums[month]) {
        categoryWiseSums[month] = {};
      }

      if (!categoryWiseSums[month][category]) {
        categoryWiseSums[month][category] = 0;
      }

      categoryWiseSums[month][category] += parseFloat(expense);
    });

    const categoryWiseSumArray = Object.entries(categoryWiseSums).map(([month, categories]) => ({
      month: getEnglishMonthName(month),
      categories: Object.entries(categories).map(([category, sum]) => ({ category, sum }))
    }));

    res.status(200).send({ monthWiseSum: monthlyData, monthlySum: monthlySumData, categoryWiseSums: categoryWiseSumArray, year: year, yearlySum: yearlySum });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

function getEnglishMonthName(month) {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const monthIndex = parseInt(month);
  return months[monthIndex] || '';
}


exports.getLeaderBoard=async (req,res,next)=>{


  try {
    const users= await User.findAll({
      include:[{model:Expense,attributes:[]}],
      attributes:[
        "id",
       "name",
       [Sequelize.fn("SUM",Sequelize.col("amount")),"userTotalExpense"]
      ],
      group:["users.id"],
      order:[["userTotalExpense","DESC"]],
    })
    
    console.log(users);
    res.status(200).send({userWiseExpense:users,userId:req.user.id});
  } catch (error) {
    console.log(error);
      res.status(500).send(error);
  }

  
}




exports.deleteExpense= async (req,res,next)=>{
      const expenseId=req.params.expenseId;
      if(isNotValid(expenseId)){
        return res.status(400).send({type:"error",message:"Bad query parameter"});
      }

      try {
        
        const expense= await Expense.findByPk(expenseId);
       await  expense.destroy();
        res.status(200).send({ type: "success", message: "Expense Deleted Successfully." });
      } catch (error) {
          console.log(error);
          res.status(500).send(error);
      }

}









  