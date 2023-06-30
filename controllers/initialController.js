const {cartmodel,productmodel,User} = require("../database/Schema");
const { getAllProduct } = require("../services/productServices");
const { getfounduserpass, getmailToken, verifyUser } = require("../services/userServices");
 
const config = {
  user:'sa',
  password: '1234',
  database: 'E-commerce',
  server: 'localhost',
  trustServerCertificate: true
}
const sql = require('mssql');




const logingetfun = (req,res)=>{
    res.render("login", { error: "" });
}

const loginpostfun = async(req,res)=>{
    let { username, password } = req.body;
    // const foundUser = await User.findOne({ username, password });
    const foundUser = await getfounduserpass(username,password)
    if (foundUser) {
      req.session.is_loggedin = true;
      req.session.username = username;
      req.session.user = foundUser;
      
     
      let product = await getAllProduct();
    
      res.redirect("/home")
      
      return
    } else {
      res.render("login",{error: "Incorrect Crediantials"});
      
      return
    }
}

const logoutfun = function (req, res) {
    req.session.destroy();
    res.redirect("/login");
}
const slashfun = (req,res)=>{
    res.render("home");
}
const resetpassfun = async (req,res)=>{
  // console.log(req.params)
  // console.log(" reset pass me pahucha hai ")
 let token = Number( req.params.token)

 
 
 let user  = await  getmailToken(token);
 if(user){
   req.session.is_loggedin = true;
   req.session.current_user =  user.username;
   req.session.username =  user.username;
   req.session.user = user;
   req.session.count = 0;
   console.log(req.session.is_loggedin)
   res.redirect('/changepassword')
   return
 }
 else {
   res.send("it seems that  you haven't sign up yet")
 }
}
const senddatafun = async(req,res)=>{
  const { id } = req.query;
// console.log(id);
var x = Number(id);

let pool = await sql.connect(config);
let result =   await pool.request().query(`SELECT * FROM Products   
ORDER BY id   
OFFSET ${5*x}  ROWS   
FETCH NEXT 5 ROWS ONLY;`) 
let final = result.recordset;
// console.log(final)
res.send(JSON.stringify(final));

}
const slashhomefun = async (req,res)=>{
  // let product = await productmodel.find({});
  let product = await getAllProduct();
  res.render("house", {
    name: req.session.username,
    product: product,
    count: req.session.count,
    user: req.session.user,
  });
}
const verifyfun = (req,res)=>{
  res.send("Verify your Email to continue! We have judt sent you an email check it out now !");
  }
  const verifymailfun = async function(req,res){
    const {token} = req.params;
    //  let user  = await  User.findOne({mailToken:token})
    let user  = await getmailToken(token);
    if(user){
      let update = await verifyUser(token)
      // let update = await User.updateOne({mailToken:token},{$set:{isVerified:true}})
      req.session.is_loggedin = true;
      req.session.current_user =  user.username;
      req.session.username =  user.username;
      req.session.user = user;
      req.session.count = 0;
      // console.log(req.session.is_loggedin)
      res.redirect('/login')
      return
    }
    else {
      res.send("your token is wrong")
    }
}



module.exports={logingetfun,loginpostfun,logoutfun,slashfun,resetpassfun,senddatafun,slashhomefun,verifyfun,verifymailfun};