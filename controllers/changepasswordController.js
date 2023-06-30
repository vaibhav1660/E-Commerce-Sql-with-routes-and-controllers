const {cartmodel,productmodel,User} = require("../database/Schema");
 
const { updateUser, getUserByUsername } = require("../services/userServices");

const changepasswordfun = (req, res)=> {
    res.render("changepassword");
}
const changepasswordpostfun = async function (req, res) {
    let password1 = req.body.new_password;
    let password2 = req.body.confirm_password;
    if (password1 != password2 || password1.length < 1) {
      res.send("please enter password same in both field");
      return;
    }
  
    const foundUser1 = await getUserByUsername(req.session.user.Username)
    
    console.log("found user", foundUser1,req.session.username);
    if (foundUser1.Username == req.session.user.Username) {
      let data = await updateUser(req.session.username,password1);
      // res.send("changed succesfully");
      res.render("login",{error:null});
      return;
    } else {
      res.send("something went wrong");
    }
}
module.exports={changepasswordfun,changepasswordpostfun};