const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class userConstroller{}

userConstroller.list= async(req, res) => {
    try{
      let del=await User.query().delete();
      return res.response(del).code(200);
    }
    catch(error){
       return res.response(error).code(500);
    }
}

userConstroller.login= async(req, res)=>{
    try{
        const findUser= await User.query().findOne({username:req.payload.username})  
        let passwordCheck= await bcrypt.compare(req.payload.password, findUser.password);
        if(passwordCheck){
            let logtoken = jwt.sign({ id: findUser.id , role:findUser.role}, 'verySecretpass', { algorithm: 'HS256' })
            return res.response({ message: 'User LoggedIn Successfully!',data:findUser,token:logtoken}).code(200);
        }
        else{
            return res.response({ message: 'Password is incorrect'}).code(200);
        }
       
    }
    catch(error){
        return res.response(error).code(500);
    }
}

userConstroller.user= async (req, res) => { 
    try{
        let {password,role}=req.payload
        req.payload.password = await bcrypt.hash(password, 10)
        !role ? req.payload.role='user': req.payload.role;
        const ins= await User.query().insert(req.payload)    
        return res.response({ message: 'User Added Successfully!',data:ins}).code(200);
    }
    catch(error){
         return res.response(error).code(500);
    }    
}

userConstroller.readAllUser= async(req,res)=>{
    try{
        if(req.auth.artifacts.role=='user'){
            return res.response({message:"Denied access"}).code(500);
        }
        else{
            const readAll= await User.query();
            return res.response(readAll).code(200);
        }

    }
    catch(error){
         return res.response(error).code(500);
    }  
    
}

userConstroller.readUser= async(req,res)=>{
    try{
        const readbyId = await User.query().findById(req.query.id);
        return res.response(readbyId).code(200);
    }
    catch(error){
        return res.response(error).code(500);
    }     
}


userConstroller.updateUser= async(req,res)=>{
    try{
        const update = await User.query().patchAndFetchById(req.query.id, req.payload);
        return res.response(update).code(200);;
    }
    catch(error){
         return res.response(error).code(500);
    }     
}    

module.exports = userConstroller