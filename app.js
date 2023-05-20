const express=require('express');
const bodyParser=require('body-parser')
const path=require('path');
const cors=require('cors');
const app=express();
app.use(cors());

require('dotenv').config();
const PORT=process.env.PORT || 3000;
const sequelize=require('./util/database');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'public')));

const userRoutes=require('./routes/user');
// app.use('/user',userRoutes);

app.use('/user',userRoutes);
app.use((req,res) => {
    let url = req.url
   
    
    res.sendFile(path.join(__dirname, `views/${url}.html`))
})

// app.get("/", (req, res, next) => {
//     res.status(404).send("<h1>Oops...Page Not Found</h1>");
//   });





sequelize.sync().then(result=>{
    console.log(result);
    app.listen(PORT);

}).catch(err=>{
    console.log(err);
})