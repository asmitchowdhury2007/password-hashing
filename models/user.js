const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    fullname:{
        required:true,
        type:String,
    },
    email :{
        required:true,
        unique:true,
        type:String,
    },
    password :{
        type:String,
        required:true,
    }

},{
    timestamps:true,
})

const user = mongoose.model("users", userSchema);

module.exports = user;