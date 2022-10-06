'use strict';

let Hapi = require('@hapi/hapi');
let route = require("./routes");
let dotenv = require("dotenv");
dotenv.config();

const knex= require('./config/db');
const authenticate= require('./middleware/authenticate')
const AuthBearer = require('hapi-auth-bearer-token');


const init = async () => {
    try{
        //server creation
        const server = Hapi.Server({
            host: process.env.APP_HOST,
            port: process.env.APP_PORT
        });
        
        //authentication
        await server.register(AuthBearer)
        server.auth.strategy(
            'jwt', 
            'bearer-access-token',
            { 
                validate:authenticate
            }
        );

        //route
        server.route(route);

        //server start
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