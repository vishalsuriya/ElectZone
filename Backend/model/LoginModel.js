const mongoose = require("mongoose");
const loginSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});
const Userlogins = mongoose.model("Userlogins",loginSchema);
module.exports= Userlogins;