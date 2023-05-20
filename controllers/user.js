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
    // console.log(req.body);
    const {name,email,password}=req.body;
    if(isNotValid(name) || isNotValid(email) || isNotValid(password)){
        return res.status(400).send({type:'error',message:'Invalid Form Data!'})
    }
    else{
        User.create({name,email,password})
        .then(()=>{
            res.status(200).json({message:'Successfully created'})
          
        }).catch((err)=>{
            console.log(err);
            res.status(403).json(err);
        })
    }
}

exports.logIn=(req,res,next)=>{
   
    const {email,password}=req.body;
    console.log(req.body);

    if( isNotValid(email) || isNotValid(password)){
        return res.status(400).send({type:'error',message:'Invalid Form Data!'})
    }
    else{
        User.findAll({where:{email}}).then((user)=>{
            if(user.length>0){
                if(user[0].password===password){
                    res.status(200).send({message:'user logged in successfully'})
                }
                else{
                    res.status(404).send({type:error,message:'Wrong password'});
                }
            }
            else{
                res.status(404).send({type:error,message:'User does not exist'});
            }
        }).catch((err)=>{
            console.log(err);
            res.status(403).json(err);
        })
    }

}