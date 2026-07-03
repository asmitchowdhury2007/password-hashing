const mongoose = require ("mongoose");

const passwordSchema = new mongoose.Schema({
    password:{
        type:String,
        required:true,
    },
    createdBy :{
        type:mongoose.Schema.Types.ObjectId,
        ref : "users",
        required:true,

    }
});

const passwords = mongoose.model("passwords", passwordSchema);

module.exports = passwords;