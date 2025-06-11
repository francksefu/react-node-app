import mysql from "mysql";
require('dotenv').config()

const connection = mysql.createConnection({
  host     : process.env.DB_HOST,//'193.203.168.98',
  user     : process.env.DB_USER,
  password : process.env.DB_PASSWORD,
  //port : '8889',
  database : process.env.DB_NAME
});

export default connection;