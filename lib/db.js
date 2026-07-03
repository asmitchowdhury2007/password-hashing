const mongoose = require("mongoose");


async function ConnectDB(url){
    return await mongoose.connect(url);
}

module.exports = {
    ConnectDB
}