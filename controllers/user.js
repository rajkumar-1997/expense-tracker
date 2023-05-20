const User=require('../models/user');
const path=require('path')





function  isNotValid(str){
    if(str==undefined || str.length==0){
         return true;
    }
    else{
        return false;
    }
}

exports.signUp=(req,res,next)=>{
    console.log(req.body);
    const {name,email,password}=req.body;
    if(isNotValid(name) || isNotValid(email) || isNotValid(password)){
        return res.status(400).send({type:'error',message:'Invalid Form Data!'})
    }
    else{
        User.create({name,email,password})
        .then(()=>{
            res.status(201).json({message:'Successfully created'})
          
        }).catch((err)=>{
            console.log(err);
            res.status(403).json(err);
        })
    }
}