import mysql from "mysql";

const connection = mysql.createConnection({
  host     : '193.203.168.98',
  user     : 'u471236973_expense',
  password : 'kalunga1998@F',
  //port : '8889',
  database : 'u471236973_expense'
});

export default connection;