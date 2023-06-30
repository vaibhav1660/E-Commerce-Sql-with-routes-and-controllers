const { CommandStartedEvent } = require("mongodb");
const { cartmodel } = require("../database/Schema");
const config = {
    user:'sa',
    password: '1234',
    database: 'E-commerce',
    server: 'localhost',
    trustServerCertificate: true
  }
  
const sql = require('mssql');

const findUserCartByUsername = async (username )=>{
    let usercart = await cartmodel.findOne({ username: username });
    return usercart
}
const findUserCartByuser_id = async (_id )=>{
    // console.log(_id)
    let pool = await sql.connect(config);
    let result =   await pool.request().query(`select * from Cart where user_id=${_id};`) 
    // console.log(result)
    return result.recordset
    
    
}
// findUserCartByuser_id()
const cartUpdateById= async(user_id,product_id,quantity)=>{
    let pool = await sql.connect(config);
    let result =   await pool.request().query(`update  Cart set quantity=${quantity} where user_id=${user_id} and product_id = ${product_id};`) 
    // console.log("err  yah hai ")
}
const updateCartByUsername = async (username ,items)=>{
    let usercart1 = await cartmodel.updateOne(
        { username: username },
        { $set: { items: items } }
      );
}
const deleteCart=async (  user_id,id )=>{
    let pool = await sql.connect(config);
    let result =   await pool.request().query(` delete from Cart where user_id=${user_id}and product_id=${id}`) 
    // console.log("err  yah hai ")
}
const  createCart= async( user_id,product_id,quantity)=>{
    // console.log(`insert into  Cart (user_id,product_id,quantity) ( ${user_id} ,${product_id},${quantity})`)
    let pool = await sql.connect(config);
    let result =   await pool.request().query(`insert into  Cart (user_id,product_id,quantity) values( ${user_id} ,${product_id},${quantity});`) 
    // console.log(result ,"result ka error")
}
const cartGetById = async (_id)=>{
  
  let pool = await sql.connect(config);
  let result =   await pool.request().query(`select * from Cart inner join Products on Cart.product_id=id  where user_id=${_id};`) 
  
  return result.recordset
}
const placeUserorder = async(cart,address,city,state,zip,user_id)=>{
  console.log(cart);
  console.log(address);
  console.log(city);
  console.log(state);
  console.log(zip);
  console.log(user_id)
  let rtn = 1; 
  try{ 
    let pool = await sql.connect(config);
    let originalquan = `select quantity from products where id = ${cart.product_id}`;
    let quant = await pool.query(originalquan);
    // console.log(123);
    // console.log(quant.recordset[0].quantity,"quant hai ye");
      if(quant.recordset[0].quantity -cart.quantity[0] <= 0){
        console.log('yaha fasa hai')
        throw err;
      }
  let result =   await pool.request().query(`

  Begin Try
  Begin Transaction 
  INSERT INTO Orders (user_id, Product_id, quantity,Address,city,state,zip,order_status)
VALUES (${user_id}, ${cart.product_id},${cart.quantity[0]}, '${address}','${city}', '${state}',${zip},'paid')
  
update products set quantity =${quant.recordset[0].quantity -cart.quantity[0]} where id=${cart.product_id} and quantity>=${cart.quantity[0]}

delete  cart   where product_id=${cart.product_id} and user_id=${user_id}

commit transaction
end try 

begin catch
rollback transaction
end catch
  
  `) 
  // console.log(result,"yhi rsult hai");
  rtn = 1;
  console.log('1hai')
//   return result.recordset
}
catch(err){
  if(err){
    console.log(err)
    console.log('dikkat')
    rtn =  0;
  }
}finally{
  console.log('final')
  return rtn
}
}

const myorder=async(id)=>{
   
  let pool = await sql.connect(config);
  let result =   await pool.request().query(`select * from users join orders on users.user_id = orders.user_id join products on orders.product_id =products.id  where users.user_id = ${id};`) 
  
  return result.recordset
}

const mydelivery=async(id)=>{
  
  let pool = await sql.connect(config);
  let result =   await pool.request().query(`select products.name,users.name,products.price,products.image,orders.quantity,orders.Address,Orders.city,Orders.state,Orders.zip,orders.order_status from users join orders on users.user_id = orders.user_id join products on orders.product_id =products.id  where products.seller_id =${id}`)
  return result.recordset 
} 
module.exports= {findUserCartByUsername,updateCartByUsername,cartGetById,cartUpdateById,findUserCartByuser_id,createCart,deleteCart,placeUserorder,myorder,mydelivery}

