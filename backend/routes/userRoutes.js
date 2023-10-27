const express=require("express")
const router=express.Router()
const usersController=require("../controllers/userController")
router.route('/')
.get(usersController.getAllUser)
.post(usersController.createNewUser)
.patch(usersController.updateUser)
.delete(usersController.deleteUser)

module.exports=router