const mongoose=require('mongoose')
const { stringify } = require('uuid')
const userSchema=new mongoose.Schema({
     username:{
        type:String,
        required:true,
     },
     password:{
        type:String,
        required:true
     },
     roles:[{
        type:String,
        default:"Employee"
     }],
     active:{
        type:Boolean,
        default:true
     }
})
module.exports=mongoose.model("user",userSchema)