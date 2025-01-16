const Agent=require("../controller/Agentcontroller")
const authenticateToken=require('../middleware/Authenticatemiddle')
const express=require('express')

const router=express.Router()

router.get('/getagent',authenticateToken,Agent)

module.exports=router