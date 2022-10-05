'use strict';

let Hapi = require('@hapi/hapi');
let route = require("./routes");
let dotenv = require("dotenv");
dotenv.config();

const User = require('./model/User');
const Ticket = require('./model/Ticket')
const knex= require('./config/db');
const authenticate= require('./middleware/authenticate')



const init = async () => {
    try{
        const server = Hapi.Server({
            host: process.env.APP_HOST,
            port: process.env.APP_PORT
        });
        
        
        await server.register(require('hapi-auth-jwt2'))
        server.auth.strategy('jwt', 'jwt', {
            validate: authenticate
        });
        server.route(route);
        await server.start();
        console.log("Server started on ",server.info.uri);
    }
    catch(error){
        console.log(error);
    }
}



process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
})

init();