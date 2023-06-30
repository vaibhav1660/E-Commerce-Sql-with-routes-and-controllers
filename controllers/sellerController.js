const {cartmodel,productmodel,User} = require("../database/Schema");
const { mydelivery } = require("../services/cartServices");
const { getAllProduct, getAllSellerProduct, deleteProductById, upDateProduct } = require("../services/productServices");







const sellerfun = (req,res)=>{
    
    res.render("Seller",{username: req.session.username});
}
const editsellerfun = async(req,res)=>{
    // console.log(req.session.user)
    let data =await getAllSellerProduct(req.session.user.user_id);
    res.render("Seller1",{product:data,name:req.session.username});

}

const sellerdeletefun = async(req,res)=>{
    let {id }= req.params
    await deleteProductById(id);
    
res.redirect("/editseller")
}

const editupdatesellerfun = async(req,res)=>{
    let { p1name, p1description, p1price, p1quantity } = req.body;
    let pid=parseInt(req.params.id);
    let newproduct  = await upDateProduct( p1name, p1description, p1price, p1quantity,pid)
    
res.redirect('/editseller');
}

const mydeliveryfun =async(req,res)=>{
let id=req.session.user.user_id;
    let delivery= await mydelivery(id);
// console.log (delivery,"meridelivery");
res.render("mydelivery",{delivery:delivery,  username:req.session.username});


}

const addbulkfun=async(req,res)=>{
    res.render("bulkpage",{ username:req.session.username});
}


module.exports={sellerfun,editsellerfun,sellerdeletefun,editupdatesellerfun,mydeliveryfun,addbulkfun}