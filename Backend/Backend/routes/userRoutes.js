const userController = require("../controllers/userController")
const express=require("express");
const router=express.Router();


router.post("/create",userController.createUserProducts)
// router.get("/view",userController.getUser)
router.post("/login",userController.login)


module.exports = router;zx