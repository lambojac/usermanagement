const mongoose=require('mongoose')
const { stringify } = require('uuid')
const userSchema=new mongoose.Schema({
     username:{
        type:String,
        required:true,
     },
     password:{
        type:string,
        required:true
     },
     roles:[{
        type:string,
        default:"Employee"
     }],
     active:{
        type:Boolean,
        default:true
     }
})
module.exports=mongoose.model("user",userSchema)