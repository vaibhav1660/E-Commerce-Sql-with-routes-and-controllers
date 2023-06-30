const {cartmodel,productmodel,User} = require("../database/Schema");
const { findUserCartByUsername, updateCartByUsername, cartGetById, cartUpdateById, findUserCartByuser_id, createCart, deleteCart, placeUserorder, myorder } = require("../services/cartServices"); 
const { getAllProduct, getproductquantity } = require("../services/productServices");
const cartfun = async(req,res)=>{
  let usercart = await cartGetById ( req.session.user.user_id );
  let products = await getAllProduct()
  if(usercart){
  console.log("usrer cart ", usercart);
  let mytotal_item_cost = 0;
  for(let i = 0 ; i < usercart.length ; i++){
    mytotal_item_cost += usercart[i].quantity[0]*usercart[i].price;
  }
  console.log(mytotal_item_cost)
  req.session.currentcost = mytotal_item_cost;
  res.render("mycart", {
    username: req.session.username,
    cart: usercart,
    products: products,
  });
}
  else{
    res.render("mycart", {
      username: req.session.username,
      cart:[],
      products: products,
    })
  }
}
 

const cartdecrementfun = async(req,res)=>{
 
  // let usercart = await cartmodel.findOne({ username: req.session.username });
  let { id } = req.params;
  let data=1;
  let usercart = await  findUserCartByuser_id( req.session.user.user_id );
  
    var flag = true;
    let cartitems = usercart;
    cartitems.forEach(async(cartitem) => {
      if (cartitem.product_id == id) {
        
         flag = false;
         data=cartitem.quantity-1;
        let cartupdate = await cartUpdateById(cartitem.user_id,cartitem.product_id,cartitem.quantity-1)
      }
    });

  res.json(data);
}
const cartdeletefun = async(req,res)=>{
 

  let { id } = req.params;
  let data=1;
  let usercart = await  deleteCart( req.session.user.user_id,id );
   
  res.redirect("/cart");
  return;


}
const cartincrementfun = async(req,res)=>{
  let { id } = req.params;
  let data=1;
  let usercart = await  findUserCartByuser_id( req.session.user.user_id );
  let quantity=await getproductquantity(id)
 
    var flag = true;
    let cartitems = usercart;
  cartitems.forEach(async(cartitem) => {
      if (cartitem.product_id == id) {
        
         flag = false;
         data=cartitem.quantity;
         if(quantity>data)
         {
  
          data=cartitem.quantity+1;
             }
             
            
let cartupdate = await cartUpdateById(cartitem.user_id,cartitem.product_id,data)
// console.log(data)
  
res.json(data);
    
  
        
      }
    });
    


}


const addtocartfun = async (req,res)=>{
  let { id } = req.params;

 
let usercart = await  findUserCartByuser_id( req.session.user.user_id );
 
if (usercart != undefined) {
  var flag = true;
  let cartitems = usercart;
  cartitems.forEach(async(cartitem) => {
    if (cartitem.product_id == id) {
      
       flag = false;
      let cartupdate = await cartUpdateById(cartitem.user_id,cartitem.product_id,cartitem.quantity)
    }
  });
 
  if (flag) {
    // console.log("yha par aa rha hai flag ke pass ")
   await createCart( req.session.user.user_id,id,1)
  }
  
} else {
  await createCart( req.session.user.user_id,id,1)
  
}
res.json({ m: "added to cart sucessfully" });

}

const placeorderfun = async(req,res)=>{
  const cart = await cartGetById( req.session.user.user_id)
  // console.log("cart",cart)
  res.render("placeorder",{username: req.session.username,cart :cart});
}

const placeorderformfun=async(req,res)=>{
  const carts = await cartGetById(req.session.user.user_id)
  let user_id =req.session.user.user_id;
  let meragharhai = req.session.address;
  console.log("the alternative solution is this ",req.session.address)
  let address = meragharhai.address;
  console.log(address)
  let city = meragharhai.city;
  let state = meragharhai.state;
  let zip = meragharhai.zip;
   carts.forEach(async (cart)=>{
    // console.log(cart,"tension hai");
    let placeorder= await placeUserorder(cart,address,city,state,zip,user_id)
    if(placeorder == 1){
      res.send(true)
    }else{
      // res.send("Sorry cant place your order");
      res.send(false);
    }
  })
}
const getorders = async(req,res)=>{
  let id=req.session.user.user_id;
let orders= await myorder(id)

  res.render('myorders',{orders:orders,username: req.session.username})
}

const handleAddress = (req,res)=>{
  req.session.address = req.body;
  console.log(  req.session.address)
  console.log(req.session.address)
  console.log(req.session.currentcost)
  res.render('paymentplacing',{cost:req.session.currentcost})
}

const sendSuccess =(req,res)=>{
  res.render('ordersuccess')
}
module.exports={cartfun,cartdecrementfun,cartdeletefun,cartincrementfun,addtocartfun,placeorderfun,placeorderformfun,getorders,myorder,handleAddress,sendSuccess};