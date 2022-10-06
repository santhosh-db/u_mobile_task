const Theatre = require('../model/Theatre');
const Movie = require('../model/Movie');
const Schedule= require('../model/Schedule')
const moment= require("moment");

class adminController{}

adminController.createScreen= async(req, res) => {
    try{
        if(req.auth.artifacts.role != 'user')
        {
            const ins= await Theatre.query().insert(req.payload)    
            return res.response({ message: 'Screen Added Successfully!',data:ins}).code(200);
        }
        else{
            return res.response({message:"Denied access"}).code(200);
        }
        
    }
    catch(error){
       return res.response(error).code(500);
    }
}

adminController.createMovie= async(req,res)=>{
    try{
        if(req.auth.artifacts.role != 'user')
        {
            const ins= await Movie.query().insert(req.payload)    
            return res.response({ message: 'Movie Added Successfully!',data:ins}).code(200);
        }
        else{
            return res.response({message:"Denied access"}).code(200);
        }
        
      }
      catch(error){
         return res.response(error).code(500);
      }
}

adminController.movieSchedule= async(req,res)=>{
    try{
        // if(req.auth.artifacts.role != 'user')
        // {
            let start=moment(new Date(req.payload.movie_startTime)).format("YYYY-MM-DD HH:mm:ss");
            let que1= await Movie.query().findOne({title:req.payload.movie_name});
            let que2=await Theatre.query().findOne({screen_name:req.payload.screen_name});
            let end=moment(new Date(start)).add(que1.duration, 'minutes').format("YYYY-MM-DD HH:mm:ss");
            let obj={
                movie_id:que1.id,
                screen_id:que1.id,
                start_time:start,
                end_time:end
            }
            console.log(obj);
            const ins= await Schedule.query().insert(obj)    
            return res.response({ message: 'Movie Scheduled Successfully!',data:obj}).code(200);
        // }
        // else{
        //     return res.response({message:"Denied access"}).code(200);
        // }
        
      }
      catch(error){
         return res.response(error).code(500);
      }
}

module.exports = adminController