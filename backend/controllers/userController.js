const User=require('../models/User')
const Note=require("../models/Note")

const asyncHandler=require('express-async-handler')
const bcrypt=require("bcrypt")

//@desc create new user
//@desc Get all users
//@route Get /users
//@access Private
//@acess update user
//@route patch /user

const getAllUser=asyncHandler (async(req,res)=>{
const users=await User.find().select('-password').lean()
if(!users?.length){
    return res.status(400).json({message:"No user found"})
}
res.json(users)
})
//@desc create new user
//@desc Get all users
//@route Get /users
//@access Private
//@acess update user
//@route patch /user

const createNewUser=asyncHandler (async(req,res)=>{
const {username, password, roles}=req.body
//confirm data
if(!username||!password||!Array.isArray(roles)||!roles.length){
    return res.status(400).json({message:"All fields are required"})
}
//check gor duplicates
const duplicate=await User.findOne({username}).lean().exec()
if(duplicate){
    return res.status(409).json({message:"duplicate username"})
}
//hash password
const hashedPwd=await bcrypt.hash(password,10)//salt round
const userObject={username,"password":hashedPwd, roles}
//create and store new user
const user=await User.create(userObject)
if(user){//created
    res.status(201).json({message:`New user ${username} created`})

}else{
    res.status(400).json({message:"Invalid user data received "})
}
})
//@desc create new user
//@desc Get all users
//@route Get /users
//@access Private
//@acess update user
//@route patch /user

const updateUser=asyncHandler(async(req,res)=>{
    const{id, username,roles, active,password}=req.body
    //confirm data
    if(!id||!username||!Array.isArray(roles)||!roles.length||typeof active!=="boolean"){
        return res.status(400).json({message:"All fields are required"})
    }
    const user=await User.findById(id).exec()
    if(!user){
        return res.status(400).json({message:"User not found"})
    }
    //check for duplicate 
    const duplicate=await User.findOne({username}).lean().exec()
    //Allow update to the original user
    if(duplicate && duplicate?._id.toString()!==id){
       return res.status(409).json({message:"Duplicate username"}) 
    }
    user.username=username
    user.roles=roles
    user.active= active
    if(password){
        //Hash password
        user.password=await bcrypt.hash(password, 10)// salt rounds
    }
    const updatedUser=await user.save()
    res.json({message:`${updatedUser.username}updated`})
})

//@desc create new user
//@desc Get all users
//@route Get /users
//@access Private
//@acess update user
//@route patch /user

const deleteUser=asyncHandler(async(req,res)=>{
const {id}=req.body
if(!id){
    return res.status(400).json({message:"user id required"})
}
const notes=await Note.findOne({user:id}).lean().exec()
if(notes?.length){
return res.status(400).json({message:"User has assigned notes"})
}
const user=await User.findById(id).exec()
if(!user){
    return res.status(400).json({message:"user not found"})
}
const result =await user.deleteOne()
const reply=`Username ${result.username} with ID ${result._id} deleted`
res.json(reply)
})

module.exports={
    getAllUser,createNewUser, updateUser, deleteUser
}