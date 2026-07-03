
async function homepage (req,res){
    res.json({message :"Welcome to home page "});
}

async function signup_page (req,res){
    res.json({message :"Welcome to signup page "});
}

async function login_page (req,res){
    res.json({message :"Welcome to login page "});
}

module.exports ={
    homepage,
    signup_page,
    login_page,
}