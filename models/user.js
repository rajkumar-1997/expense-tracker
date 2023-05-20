const Sequelize=require('sequelize');
const sequelize=require('../util/database');
const User=sequelize.define('users',{
  id:{
type:Sequelize.INTEGER,
autoIncrement:true,
primaryKey:true,
allowNULL:false,

  }, 

  name:{
    type:Sequelize.STRING,
    allowNULL:false,
    
  },
  email:{
    type:Sequelize.STRING,
    allowNULL:false,
    unique:true,
  },

  password:{
    type:Sequelize.STRING,
    allowNULL:false,
  }


});

module.exports=User;