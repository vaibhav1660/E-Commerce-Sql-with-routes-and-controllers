const {cartmodel,productmodel,User} = require("../database/Schema");
const { deleteProductById, upDateProduct, getAllProduct } = require("../services/productServices");

const adminfun = (req,res)=>{
    res.render("Admin",{
        username:req.session.username
    });
}


const admindeletefun = async function(req,res){
    let {id }= req.params
    await deleteProductById(id);
    
res.redirect("/edit")
}
const editfun = async(req,res)=>{
    
    let data =await getAllProduct();
    res.render("Admin1",{product:data,name:req.session.username});

}


const editupdatefun = async(req,res)=>{
    let { p1name, p1description, p1price, p1quantity } = req.body;
    let pid=parseInt(req.params.id);
    let newproduct  = await upDateProduct( p1name, p1description, p1price, p1quantity,pid)
    
res.redirect('/edit');
    }
module.exports={adminfun,admindeletefun,editfun,editupdatefun};