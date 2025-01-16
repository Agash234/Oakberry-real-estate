const mongoose =require('mongoose')

const userSchema=new mongoose.Schema({
    username:{type:String,required:true},
    password:{type:String,required:true},
    email:{type:String,required:true},
    property_list:{type:Number,default:0},
    images:{
        type:String,
        default:"https://preview.colorlib.com/theme/oakberry/images/person_1.jpg.webp"
    },
     role: { type: String, enum: ['user', 'agent'], default: 'user' },
  agentCode: { type: String, required: function() { return this.role === 'agent'},sparse: true },
    socialmedia:{
        google:{type:String },
        twitter:{type:String},
        facebook:{type:String},
        instagram:{type:String}

    },
    createdAt:{type:Date,default:Date.now}
})

module.exports=mongoose.model('users',userSchema)