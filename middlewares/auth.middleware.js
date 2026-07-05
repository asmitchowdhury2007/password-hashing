const {verifyToken} = require("../lib/utils")

async function authMiddleware (req,res,next){
    const token = req.cookies.token;
    if(!token) return res.redirect("/login");
    const decoded = verifyToken(token)
    if(decoded){
        req.id = decoded.id;
        next();
    }
    return res.redirect("/login");
    
    
}

module.exports ={
    authMiddleware,
}