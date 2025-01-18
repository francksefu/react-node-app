import express from "express";
import Expense from "./db/Expense.mjs";
import Categorie from "./db/categorie.mjs";
import cors from "cors";

const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors());
app.use(express.json());

//index or get all
app.get("/categories", (req, res) => {
  res.json({ categories: Categorie.selectAll() });
});

//create
app.post("/categories", (req, res) => {
  let categorie = req.body;
  Categorie.insert(categorie);
  res.send({ message: 'New categorie was added', });
});


//index or get all
app.get("/expenses", (req, res) => {
  res.json({ expenses: (Expense.selectAll()) });
});

//create
app.post("/expenses", (req, res) => {
  let expenses = (req.body);
  Expense.insert(expenses);
  res.json({ expenses: Expense.selectAll() });
});

app.get("/api", (req, res) => {
    res.json({ message: 'Hello franck' });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});