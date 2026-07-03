require("dotenv").config();
const jwt = require ("jsonwebtoken")

async function generateToken (id){
    return jwt.sign({id}, process.env.JWT_SECRET,{
        expiresIn : "7d"
    })
    
}

