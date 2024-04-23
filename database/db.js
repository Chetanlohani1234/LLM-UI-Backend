const mongoose=require("mongoose");
//const url="mongodb://127.0.0.1:27017/Ticketing"
//const url = "mongodb+srv://root:MongoDb%40123!@cluster0.8ujyaqs.mongodb.net/Ticketing"
const url = "mongodb+srv://lohanichetan4:MongoDb1234@ticketing-cluster.15tb2sf.mongodb.net/LLM";

module.exports.connectdb=async(req,res)=>{
    try{ 
        await mongoose.connect(url,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        }).then((res)=>{
            console.log("Database Connected Successfully")
        }).catch((error)=>{ 
            console.log(error);
            console.log("Something Went Wrong")
        })
    }catch(error){
        console.log(error);
        console.log("Something Went Wrong")
    }
}