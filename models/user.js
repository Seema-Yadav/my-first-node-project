const crypto=require('crypto') ;
const mongoose=require('mongoose');
var bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please enter name']
    },
    email:{
        type:String,
        required:[true,'Please add email'],
        match:[
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please use a valid email',
        ]
     },
     role:{
         type:String,
         enum:['user','publisher'],
         defaults:'user'
     },
     password:{
         type:String,
         required:[true,'Please add password'],
         minlength:6,
         select:false
     },
     resetPasswordToken:String,
     resetPasswordExpire:Date,
     createdAt:{
         type:Date,
         default:Date.now
     }
});
//encrypt password user
UserSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        next();
    }
    const salt=await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt);
});



//sign jwt and return
UserSchema.methods.getSignedJwtToken=function(){
return jwt.sign({id:this._id},'process.env.JWT_KEY',{
    expiresIn: process.env.JWT_EXPIRE
});
};

//match user enter password to hashed password
UserSchema.methods.matchPassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}

//Generte n hsh passsword token
UserSchema.methods.getResetPasswordToken=function(){
    const resetToken=crypto.randomBytes(20).toString('hex');

    //hash tokkken
    this.resetPasswordToken=crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

    //sset expire
    this.resetPasswordExpire=Date.now()+10*60*1000;
    return resetToken;
}


module.exports=mongoose.model('User',UserSchema);