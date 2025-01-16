const {addProperty,getproperty}=require('../controller/propertycontroller')
const authenticateToken=require('../middleware/Authenticatemiddle')
const express=require('express')

const router=express.Router()

router.post('/addproperty',addProperty)
router.get('/getproperty',authenticateToken,getproperty)

module.exports=router;