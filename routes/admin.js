const {adminController} =  require('../controller');
const Joi = require("joi");

const admin =[
    {
        method: 'POST',
        path: '/admin/createScreen',
        options:{
            validate:{
                payload:Joi.object({
                    screen_name:Joi.string().required(),
                    seats:Joi.integer().required(),
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
            validate:{
                payload:Joi.object({
                    movie_name:Joi.string().required(),
                    duration:Joi.integer().required(),
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
]

module.exports = admin