const {cartmodel,productmodel,User} = require("../database/Schema");
const sendEmail = require("../methods/sendEmail");
const { createUser, getUserByUsername } = require("../services/userServices");

const createaccountfun = (req,res)=>{
    res.render("createaccount", { error: ""})
}
const createaccountpostfun=async(req,res)=>{
    let { name, username, email, password, mobile ,role} = req.body;
    // const foundUser = await User.findOne({ username });
  const foundUser = await getUserByUsername(username)
  if (foundUser) {
    res.render("createaccount", {
      error: "Username already taken, please change it",
    });
    return;
  } else {
    karoCreateaccount(name, username, email, password, mobile,role);
    // res.render("login" ,{error:null});
  }
  async function karoCreateaccount(name, username, email, password, mobile,role) {
   let user= await createUser(name, username, email, password, mobile,role)
    
    sendEmail(email, user ,function(err, data){
      if(err){
          res.render("createaccount", {error: err})
          return
      }
  
  
  })
    {
      // let user = await User.findOne({username:req.body.username})
      // console.log(user);
      // console.log("working perfectly fine  ");
    }
  }
  res.redirect("/verify");
}
module.exports={createaccountfun,createaccountpostfun};