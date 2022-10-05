const Theatre = require('../model/Theatre');
const Movie = require('../model/Movie');

class adminController{}

adminController.createScreen= async(req, res) => {
    try{
        const ins= await Theatre.query().insert(req.payload)    
        return res.response({ message: 'Screen Added Successfully!',data:ins}).code(200);
    }
    catch(error){
       return res.response(error).code(500);
    }
}

adminController.createMovie= async(req,res)=>{
    try{
        const ins= await Movie.query().insert(req.payload)    
        return res.response({ message: 'Movie Added Successfully!',data:ins}).code(200);
      }
      catch(error){
         return res.response(error).code(500);
      }
}



module.exports = adminController