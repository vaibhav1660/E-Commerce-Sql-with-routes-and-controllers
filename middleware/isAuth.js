module.exports = (req,res,next)=>{
    if(req.session.is_loggedin&&(req.session.user.is_Verified==1)){
        next();
        return
    }
    else if(req.session.is_loggedin){
        res.send("please verify your account")
    }
    else {
        res.render("home");
    }
}