import mysql from "mysql";

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  port : '8889',
  database : 'testmysql'
});

export default connection;