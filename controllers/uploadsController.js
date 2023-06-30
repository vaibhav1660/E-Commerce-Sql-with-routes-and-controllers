const {cartmodel,productmodel,User} = require("../database/Schema");
const { getAllProduct } = require("../services/productServices");
const config = {
  user:'sa',
  password: '1234',
  database: 'E-commerce',
  server: 'localhost',
  trustServerCertificate: true
}
const sql = require('mssql');
const { name } = require("ejs");


const uploadfun= async(req, res) => { 
    let { pname, pdescription, pprice, pquantity } = req.body;
   
 

  let pool = await sql.connect(config);
  let result =   await pool.request().query(`INSERT INTO Products (name, image, price,details,quantity)
  VALUES ('${pname}','${req.file.path}',${pprice},'${pdescription}',${pquantity});`) //monday
  let final = result;



  res.redirect('/Admin');
  }


const uploadsellerfun= async(req,res)=>{
  let { pname, pdescription, pprice, pquantity } = req.body;
  let seller_id=req.session.user.user_id;
  let pool = await sql.connect(config);
  let result =   await pool.request().query(`INSERT INTO Products (name, image, price,details,quantity,seller_id)
  VALUES ('${pname}','${req.file.path}',${pprice},'${pdescription}',${pquantity},${seller_id});`) //wednesday
  let final = result;



  res.redirect('/Seller');
}



  module.exports={uploadfun,uploadsellerfun}