const { Mongoose } = require("mongoose");

const ErrorResponse = require("../utils/errorResponse");

const errorHandler=(err,req,res,next)=>{
let error={...err};
error.message=err.message;
console.log(err.stack.red);
if(err.name==='CastError'){
    const message=`Bootcamp not find id of${err.value}`;
error=new ErrorResponse(message,404);
}
res.status(error.statusCode||500).json({
    success:false,
    error:error.message||'server error'
});
}
module.exports=errorHandler;