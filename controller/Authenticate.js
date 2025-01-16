const {refreshkey}=require('../config/config')
const jwt=require("jsonwebtoken")
const {privatekey}=require("../config/config")


const Refresh=async(req,res)=>{
   const {token}=req.body

   if(!token){
    return res.status(401).send('token not provided')
   }

    jwt.verify(token, refreshkey, (err, user) => {

        if (err) {
            return res.status(403).send('Invalid refresh token');
        }
  
        const accessToken = jwt.sign({ username: user}, privatekey, {
            expiresIn: '4m', 
        });
  
        res.json({ token: accessToken });
    })
}

module.exports=Refresh