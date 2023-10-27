const mongoose=require('mongoose')
const userSchema=new mongoose.Schema({
     username:{
        type:String,
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