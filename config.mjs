import mysql from "mysql";
//import 'dotenv/config'

console.log('franck');
console.log(process.env.DB_PASSWORD);
const connection = mysql.createConnection({
  host     : process.env.DB_HOST,
  user     : process.env.DB_USER,
  password : process.env.DB_PASSWORD,
  //port : '8889',
  database : process.env.DB_NAME
});

export default connection;