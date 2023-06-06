const express=require('express');
const bodyParser=require('body-parser')
const path=require('path');
const cors=require('cors');
// const helmet=require('helmet');
// const morgan =require('morgan');
// const fs=require('fs');
const app=express();

app.use(cors());
require('dotenv').config();
const PORT=process.env.PORT || 3000;
const sequelize=require('./util/database');

// app.use(helmet());
// const accessLogStream = fs.createWriteStream('access.log', { flags : 'a' })
// app.use(morgan('combined',{stream:accessLogStream}))


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'public')));

const userRoutes=require('./routes/user');
const expenseRoutes=require('./routes/expense')
const orderRoutes=require('./routes/order');
const passwordRoutes=require('./routes/password');
const expenseFileRoutes=require('./routes/expensefile');





const User = require("./models/user");
const Expense = require("./models/expense");
const Order=require('./models/order');
const ForgotPasswordRequest=require('./models/forgotPassword');
const ExpenseFile=require('./models/expensefile');
// const { Stream } = require('stream');


app.use('/user',userRoutes);
app.use('/expense',expenseRoutes);
app.use('/order',orderRoutes);
app.use('/password',passwordRoutes);
app.use('/expense-file',expenseFileRoutes);

app.use((req,res) => {
    let url = req.url
   
    res.header('Content-Security-Policy', "img-src  'self'");
    res.sendFile(path.join(__dirname, `views/${url}.html`))
})


// app.get("/", (req, res, next) => {
//     res.status(404).send("<h1>Oops...Page Not Found</h1>");
//   });

User.hasMany(Expense);
Expense.belongsTo(User);
User.hasMany(Order);
Order.belongsTo(User);
User.hasMany(ForgotPasswordRequest);
ForgotPasswordRequest.belongsTo(User);
User.hasMany(ExpenseFile);
ExpenseFile.belongsTo(User);


sequelize.sync().then(result=>{
    console.log(result);
    app.listen(PORT);

}).catch(err=>{
    console.log(err);
})