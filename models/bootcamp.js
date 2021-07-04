const mongoose=require('mongoose');
const BootcampSchema=new mongoose.Schema({
    name:{
        type:String,
        
        maxlength:[50,'Name can not be more than 50']
    
    },
    slug:String,
    description:{
        type:String,
        maxlength:[500,'Name can not be more than 50']

    },
    website:{
        type:String,
        match:[
            /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi,
            'Please use a valid URL with HTTP',
        ]
    
    },

    phone:{
        type:String,
        maxlength:[20,'phone can not be more than 20']
    },
    email:{
        type:String,
        match:[
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please use a valid email',
        ]
     },
    location:{
       
        //geo json
    type: {
              type: String, // Don't do `{ location: { type: String } }`
              enum: ['Point'], // 'location.type' must be 'Point'
              
            },
    coordinates: {
              type: [Number],
              index:'2dsphere'
         },
         formattedAddress:String,
          },
          careers:{
              type:[String],
              required:true,
              enum:[
                  'web development',
                  'Mobile development',
                  'UI/UX',
                  'Data Science',
                  'Business',
                  'other'
              ]
          },
          averagerating:{
              type:Number,
              min:[1,'Rating at least 1 element'],
              max:[10,'rating not more than10']

          },
averageCost:Number,
photo:{
    type:String,
    default:'no-photo.jpg'
},
housing:{
    type:Boolean,
    default:false
},
jobAssistance:{
    type:Boolean,
    default:false
},
jobGuarantee:{
    type:Boolean,
    default:false
},
accptGi:{
    type:Boolean,
    default:false
},
createdAt:{
    type:Date,
    default:Date.now
},
});
module.exports=mongoose.model('Bootcamp',BootcampSchema);