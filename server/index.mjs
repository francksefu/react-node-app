import express from "express";
import connection from "../server/db/config.mjs"

connection.connect();
let res, def = '';
connection.query('SELECT * FROM user', function (error, results, fields) {
  if (error) throw error;
  res = results
  console.log(JSON.stringify(results));
  def = JSON.stringify(results)

});

connection.end();


const PORT = process.env.PORT || 3001;

const app = express();
app.get("/api", (req, res) => {
    res.json({ message: JSON.parse(def) });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});