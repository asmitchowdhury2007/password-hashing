require("dotenv").config()
const express = require("express");
const app = express();
const {ConnectDB} = require ("./lib/db");
const UserRouter = require ("./routes/user.route")
const StaticRouter = require ("./routes/static.route");


ConnectDB("mongodb://127.0.0.1:27017/password-Hashed").then(() => console.log("Mongodb running..."))



app.use(express.json());



app.use("/", StaticRouter)
app.use("/user", UserRouter);





app.listen(process.env.PORT, () => console.log("Server Running..."))
