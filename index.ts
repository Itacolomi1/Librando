/**
 * Required External Modules
 */
 import express from "express";
 import cors from "cors";

 require('rootpath')(); 
/**
 * App Variables
 */
 let PORT: number = 0;
var expressJwt = require('express-jwt');
var config = require("./config.json");

 if (!process.env.PORT) {
    console.log('got out for the backdoors');
    // process.exit(1);
     PORT = 9090;
 }
 else{
    PORT  = parseInt(process.env.PORT as string, 10)
 }
 

 
 const app = express();

/**
 *  App Configuration
 */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use(express.json());


app.use('/api/usuario',require('./controllers/api/usuario.controller'));
app.use('/api/teste',require('./controllers/api/teste.controller'));


/**
 * Server Activation
 */
app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`);
});