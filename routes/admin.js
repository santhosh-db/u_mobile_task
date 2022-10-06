const {adminController} =  require('../controller');
const Joi = require("joi");

const admin =[
    {
        method: 'POST',
        path: '/admin/createScreen',
        options:{
            auth: 'jwt',
            validate:{
                payload:Joi.object({
                    screen_name:Joi.string().required(),
                    seats:Joi.number().integer().required(),
                }),
                failAction: (req, res, source, error) => {                                                
                    console.log("Error: ", source.details[0].message);
                    return res.response({error:source.details[0].message}).code(500).takeover();                      
                }
            }
        },
        handler: adminController.createScreen
    },
    {
        method: 'POST',
        path: '/admin/createMovie',
        
        options:{
            auth: 'jwt',
            validate:{
                payload:Joi.object({
                    movie_name:Joi.string().required(),
                    language:Joi.string().required(),
                    type:Joi.string().required(),
                    duration:Joi.number().integer().required(),
                    role:Joi.string().optional()
                }),
                failAction: (req, res, source, error) => {                                                
                    console.log("Error: ", source.details[0].message);
                    return res.response({error:source.details[0].message}).code(500).takeover();                      
                }
            }
        },
        handler: adminController.createMovie
    },
    {
        method: 'POST',
        path: '/admin/movieSchedule',
        
        options:{
            //auth: 'jwt',
            validate:{
                payload:Joi.object({
                    screen_name:Joi.string().required(),
                    movie_name:Joi.string().required(),
                    movie_startTime:Joi.string().required()
                }),
                failAction: (req, res, source, error) => {                                                
                    console.log("Error: ", source.details[0].message);
                    return res.response({error:source.details[0].message}).code(500).takeover();                      
                }
            }
        },
        handler: adminController.movieSchedule
    },
]

module.exports = admin