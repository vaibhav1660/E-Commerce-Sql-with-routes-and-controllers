const { User } = require("../database/Schema");
const config = {
    user:'sa',
    password: '1234',
    database: 'E-commerce',
    server: 'localhost',
    trustServerCertificate: true
  }
const sql = require('mssql');
const { ConnectionCheckOutStartedEvent } = require("mongodb");
const createUser = async (name, username, email, password, mobile,role)=>{
 
    var mailToken = Date.now();
    sql.connect(config,(err)=>{
        if(err){
           
        }
         var request = new sql.Request();
        request.query(`insert into Users (Name, Username, Email,Password,Mobile, is_Verified,role,mailToken) values('${name}','${username}','${email}','${password}',${mobile},0,${role},${mailToken})`,(err,data)=>{
           
        })
      })
      return mailToken;
} 
 const updateUser = async (username,password1)=>{
    
    let pool = await sql.connect(config);
    let result =   await pool.request().query(`update Users set Password='${password1}' where Username='${username}';`) 
    let final = result
  
 }

 const getUserByUsername = async (username)=>{

    let pool = await sql.connect(config);
    let result =   await pool.request().query(`select * from Users  where Username='${username}';`) 
    let final = result.recordset[0]
   
    return final;
 }


const getEmail = async (email)=>{
   
    let pool = await sql.connect(config);
    let result =   await pool.request().query(`select * from Users  where Email='${email}';`) 
    let final = result.recordset[0]
  
    return final;

}

const getfounduserpass = async (username,password)=>{

let pool = await sql.connect(config);
let result =   await pool.request().query(`SELECT * FROM users WHERE username = '${username}' AND password = '${password}';`) 
let final = result.recordset[0]

return final;
}


const getmailToken = async (token)=>{
  
   
    let pool = await sql.connect(config);
    let result =   await pool.request().query(`select * from Users  where mailToken=${token}`) 
 let final = result.recordset[0]

 return final;

}
 
const verifyUser =async (token)=>{
    
    sql.connect(config,(err)=>{
        if(err){
            console.log(err);
        }
         var request = new sql.Request();
        request.query(`update Users set is_Verified=1 where mailToken=${token}`,(err,data)=>{
            
        })
      })

}




 module.exports={updateUser,getUserByUsername,createUser,getEmail,getfounduserpass,getmailToken,verifyUser}
 
