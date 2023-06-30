const { productmodel } = require("../database/Schema")
const config = {
    user:'sa',
    password: '1234',
    database: 'E-commerce',
    server: 'localhost',
    trustServerCertificate: true
  }
const sql = require('mssql');

const deleteProductById =async (id)=>{
    // let del = await productmodel.deleteOne({id:id})
    let pool = await sql.connect(config);
    let result =   await pool.request().query(`delete from Products where id=${id};`) //monday
    let final = result;
    // console.log(final)
    // return final;

}

const upDateProduct =async  (piname, pidescription,piprice,pipquantiy,pid)=>{

    // let newproduct  = await productmodel.updateOne({id:pid},{$set:{
    //     name:piname,
    //     details:pidescription,
    //     price:piprice,
    //     quantity:pipquantiy,
    //  }})
    let pool = await sql.connect(config);
    let result =   await pool.request().query(`UPDATE Products 
    SET name = '${piname}', details = '${pidescription}', price ='${piprice}', quantity='${pipquantiy}' WHERE id=${pid};`) //monday
    let final = result;

}
const getAllProduct = async()=>{
    // let products = await productmodel.find({});
    // return products;
    let pool = await sql.connect(config);
    let result =   await pool.request().query(`select * from Products;`) 
    let final = result.recordset;
    // console.log(final)
    return final;
}

const getproductquantity= async(id)=>{
    let pool = await sql.connect(config);
    let result =   await pool.request().query(`select quantity from Products where id=${id};`); 
    let final = result.recordset[0].quantity;
    // console.log(final)
    return final;
}

const getAllSellerProduct = async (id)=>{
    let pool = await sql.connect(config);
    let result =   await pool.request().query(`select * from Products where seller_id=${id} `) 
 let final = result.recordset;
// console.log(final,"seller");
 return final;
}

 
module.exports={deleteProductById,upDateProduct,getAllProduct,getproductquantity,getAllSellerProduct}