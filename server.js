 const express=require('express');
const dotenv=require('dotenv');
const colors=require('colors');
const connectDB=require('./config/db');
const errorHandler=require('./middleware/error');
const morgan=require('morgan');
const cookieParser=require('cookie-parser');

// //LOAD EN
dotenv.config({path:'./config/config.env'});

//CONNECT DATABASE
connectDB();


//routes

 const bootcamps=require('./routes/bootcamps');
 const auth=require('./routes/auth');



const app=express();
app.use(express.json());

//cookie parser
app.use(cookieParser);


if(process.env.NODE_ENV==='development'){
    app.use(morgan('dev'));

}


//mount routes
app.use('/api/v1/bootcamps',bootcamps);
app.use('/api/v1/auth',auth);


app.use(errorHandler);
    
const PORT=process.env.PORT||5000;
const server=app.listen(  PORT,
    console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));
    process.on('unhandledRejection',(err,promise)=>{
    console.log(`Error:${err.message}`); 
    //close server               
     server.close(()=>
     process.exit(1)); });


