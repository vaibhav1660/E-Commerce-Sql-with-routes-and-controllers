const {cartmodel,productmodel,User} = require("../database/Schema");
const sendPass = require("../methods/sendPass");
const { getEmail } = require("../services/userServices");

const forgetpasswordgetfun = (req,res)=>{
    res.render("forgetpass");
}

const forgetpasswordpostfun = async(req,res)=>{
    let {email}=req.body;
    let flag=true;
    // let user  = await User.findOne({email:email})
    let user  = await getEmail(email)
    // console.log("user", user)
    if(user){
  
      sendPass (email, user.mailToken, (err, data) => {
        flag = false;
        res.send("we have sent a reset link to your email");
        return;
      });
    }
    else {
      res.send("we can't find your email");
      return;
    }
}
module.exports ={forgetpasswordgetfun,forgetpasswordpostfun};