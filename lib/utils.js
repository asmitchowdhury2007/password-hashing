require("dotenv").config();
const jwt = require ("jsonwebtoken")

async function generateToken (id){
    return jwt.sign({id}, process.env.JWT_SECRET,{
        expiresIn : "7d"
    })
    
}

async function verifyToken(token){
    return jwt.verify(token, process.env.JWT_SECRET);
}

module.exports = {
    generateToken,
    verifyToken,
}