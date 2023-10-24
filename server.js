require("dotenv").config()
const express=require("express")
const app=express()
const path=require("path")
const {logger}=require('./middleware/logger')
const PORT=process.env.PORT||3500
const connectDB=require("./config/dbConn")
const mongoose=require("mongoose")
const {logEvents}=require('./middleware/logger')
console.log(process.env.NODE_ENV)
connectDB()
const errorHandler=require("./middleware/errorHandler")
const cookieParser=require('cookie-parser')
const cors=require('cors')
app.use(logger)
app.use("/",express.static(path.join(__dirname,'/public')))
const corsOption=require('./config/corsoptions')
app.use("/",require("./routes/root"))
app.use('/users',require('./routes/userRoutes'))
app.use(express.json())
app.use(cookieParser())
app.use(cors(corsOption))
 app.all("*",(req,res)=>{
    res.status(404)
    if(req.accepts("html")){
        res.sendFile(path.join(__dirname, "views", "404.html"))
    }else if (req.accepts('json')){
        res.json({message:"404 not found"})
    }else{
        res.type("txt").send("404 not found")
    }
 })

app.use(errorHandler)
mongoose.connection.once('open',()=>{
    console.log('connected to mongodb')
    app.listen(PORT,()=>console.log(`server running on port ${PORT} `))
})
mongoose.connection.on('error',err=>{
    console.log(err)
    logEvents(`${err.no}:${err.code}\t${err.syscall}\t${err.hostname},'mongoErrLog.log`)
})