const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
    name :{
        type : String,
        required: true,
    },
    email:{
        type:String,
        required: true,
    },
    password:{
        type:String,
        required: true,
    },

    phoneNumber:{
        type:String,
    },
    address:{
        type:String,
    },
    image :{
      type : String
    }
});
const UserData = mongoose.model("UserData",UserSchema);
module.exports = UserData;