const mongoose = require("mongoose");

const loginSchema = new mongoose.Schema({
    name :{
        type : String,
    },
    email:{
        type:String,
    },
    password:{
        type:String,
    }
});
const Userlogins = mongoose.model("Userlogins",loginSchema);
module.exports= Userlogins;