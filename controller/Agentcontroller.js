const User=require("../model/userSchema")

const getagent=async(req,res)=>{
    
   
    try{
    const agent=await User.find({role:'agent'});
    res.status(200).json(agent) 
   }
   catch(error){
    res.status(500).json("sever error",error)
   }

}

module.exports=getagent;