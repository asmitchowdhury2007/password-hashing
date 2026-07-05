require("dotenv").config()
const cluster = require("cluster");
const os = require("os");
const express = require("express");

const {ConnectDB} = require ("./lib/db");
const UserRouter = require ("./routes/user.route")
const StaticRouter = require ("./routes/static.route");
const cookieParser = require("cookie-parser");

const numCPUs = os.availableParallelism();



if(cluster.isPrimary){
    console.log(`Primary ${process.pid} is running`)
    for(let i=0; i<numCPUs; i++){
        cluster.fork();
    }
}
else{
    const app = express();
    ConnectDB("mongodb://127.0.0.1:27017/password-Hashed").then(() => console.log("Mongodb running..."))
    app.use(express.json());
    app.use(cookieParser());
    app.use("/", StaticRouter);
    app.use("/user", UserRouter);
    app.listen(process.env.PORT, () => {
        console.log(`Worker ${process.pid} listening on port ${process.env.PORT}`);
    });
}


