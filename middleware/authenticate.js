const jwt=require('jsonwebtoken')

const validate=(req,res)=>{
    try{
        console.log("valid");
        const token=req.headers.authorization.split(' ')[1]
        const decode=jwt.verify(token,'verySecretpass')
        return {isValid:true, decode}
    }
    catch(error)
    {
         res.response(error).code(500);
        
    }
}


module.exports=validate