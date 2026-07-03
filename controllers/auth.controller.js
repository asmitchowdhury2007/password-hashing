require("dotenv").config();
const user = require ("../models/user");
const bcrypt = require("bcrypt");


async function signup(req,res){
    const {fullname,email,password} = req.body
    const fullnameRegex = /^[a-zA-Z\s]{3,50}$/;
    const emailRegex    = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if(!fullname || !email || !password){
        return res.redirect("/user/signup");
    }
    if(!fullnameRegex.test(fullname)){
        return res.redirect("/signup");
    }
    if(!emailRegex.test(email)){
        return res.redirect("/signup");
    }
    if(!passwordRegex.test(password)){
        return res.redirect("/signup");
    }
    let User = await user.findOne({email});
    if(User){
        return res.redirect("/signup");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);
    const newUser = await user.create({
        fullname:fullname.trim(),
        email,
        password : hashedPassword
    });
    if(newUser){
        const token = generateToken(newUser_id);
        res.cookie("token", token, {
            maxAge : 7*24*60*60*1000,
            httpOnly: true,         
            secure:process.env.NODE_ENV==="production",       
            sameSite: "strict"
        })
        res.redirect("/");
    }
    else{
        return res.redirect("/signup");
    }
}


async function login(req,res){
    const {email,password} = req.body
    const User = await user.findOne({email});
    if(User){
        const isPasswordMatched = await bcrypt.compare(password, User.password);
        if(!isPasswordMatched) return res.redirect("/login");
        const token = generateToken(User._id);
        res.cookie("token", token, {
            maxAge : 7*24*60*60*1000,
            httpOnly: true,         
            secure:process.env.NODE_ENV==="production", 
            sameSite: "strict"
        })
        return res.redirect("/");
    }
    else{
        return res.redirect("/login");
    }

}
async function logout(req,res){
    
}


module.exports ={
    signup,
    login,
    logout
}