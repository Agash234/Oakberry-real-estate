const Authenticate=require('../controller/Authenticate')
const express=require('express')

const router=express.Router()

router.post('/refresh',Authenticate)

module.exports=router