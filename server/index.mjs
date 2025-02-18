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
  try {
    res.json({ categories: (Categorie.selectAll()) });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

//create
app.post("/categories", (req, res) => {
  let categorie = req.body;
  Categorie.insert(categorie);
  res.send({ message: 'New categorie was added', });
});


//index or get all
app.get("/expenses", (req, res) => {
  try {
    res.json({ expenses: (Expense.selectAll()) });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
  
});
//update

app.put("/expenses/:id", (req, res) => {
  try {
    let expenseItem = req.body;
    Expense.update(expenseItem).then((data) => res.status(201).json({message: 'Successfully added', expenses: data }));
  ;
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

app.delete("/expenses/:id", (req, res) => {
  try {
    let id = req.params.id;
    Expense.delete(id).then((data) => res.status(201).json({message: 'Successfully added', expenses: data }));
  ;
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});


//create
app.post("/expenses", (req, res) => {
  try {
    let expenses = (req.body);
    Expense.insert(expenses).then((data) => res.status(201).json({message: 'Successfully added', expenses: data }));
  } catch(error) {
    res.status(500).send({ message: error.message });
  }
});

app.get("/api", (req, res) => {
    res.json({ message: 'Hello franck' });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});