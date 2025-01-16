const mongoose = require('mongoose')
const dotenv =require('dotenv')
dotenv.config()

exports.privatekey=process.env.PRIVATE_KEY
exports.secretkey=process.env.SECRET_KEY
exports.refreshkey=process.env.REFRESH_KEY



exports.connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI,{
            dbName:"Oakberry"})
          
        console.log('conected.....')
    }catch(err){
        console.error(err.message);
        process.exit(1);
    }
}