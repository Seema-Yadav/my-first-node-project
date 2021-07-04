const Bootcamp=require('../models/bootcamp');
const ErrorResponse=require('../utils/errorResponse');
const asyncHandler=require('../middleware/async');
//@desc get all bootcamp
//@route GET/api/v1/bootcamps
//@access public
exports.getBootcamps=asyncHandler(async(req,res,next)=>{
    
        const bootcamps=await Bootcamp.find();
        res
        .status(200)
        .json({success:true,count:bootcamp.length,data:bootcamps});
    

  
    
});
//@desc get single bootcamp
//@route GET/api/v1/bootcamps/:id
//@access public
exports.getBootcamp=asyncHandler(async(req,res,next)=>{
  
        const bootcamp=await Bootcamp.findById(req.params.id);
       if(!bootcamp){ 
           return  next(new ErrorResponse(`Bootcamp not find id of${req.param.id}`,404));
           
     }
     res.status(200).json({success:true,data:bootcamp});
    
   
    
});
//@desc create new bootcamp
//@route POST /api/v1/bootcamps
//@access private
exports.createBootcamp=asyncHandler(async (req,res,next)=>{
  
 const bootcamp=await Bootcamp.create(req.body);
    
 
 res.status(201).json({
        success:true,
        data:bootcamp
    });

});
    

//@desc update new bootcamp
//@route PUT /api/v1/bootcamps
//@access private
exports.updateBootcamp=asyncHandler(async(req,res,next)=>{
   const bootcamp=await Bootcamp.findByIdAndUpdate(req.params.id,req.body,{
    new:true,
    runValidator:true
});
   if(!bootcamp){
       return next(new ErrorResponse(`Bootcamp not find id of${req.param.id}`,404));
   } 
   res.status(200).json({sucess:true,data:bootcamp});

});
//@desc delete new bootcamp
//@route delete /api/v1/bootcamps/:id
//@access private
exports.deleteBootcamp=asyncHandler(async(req,res,next)=>{
    const bootcamp=await Bootcamp.findByIdAndDelete(req.params.id);
       if(!bootcamp){
        return  next(new ErrorResponse(`Bootcamp not find id of${req.param.id}`,404));
       } 
       res.status(200).json({sucess:true,data:{}});
    
    });  


