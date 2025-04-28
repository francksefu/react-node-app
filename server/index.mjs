import express from "express";
import Expense from "./db/Expense.mjs";
import Categorie from "./db/categorie.mjs";
import User from "./db/User.mjs";
import cors from "cors";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors());
app.use(express.json());
const secretKey = 'your_secret_key';

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader;

  if (!token) return res.status(401).send(JSON.stringify({message: 'Token required'}));

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.status(403).send('Invalid or expired token');
    req.user = user;
    next();
  });
};

app.post('/signup', async (req, res) => {
  const { username, password, names, dateT } = req.body;
  const hashedPassword = await bcrypt.hash(password, 8);

  // Store user
  User.insert({username: username, password: hashedPassword, names, dateT});
  
  User.selectAll().then(async (data) => {
    
    const user = JSON.parse(data).find(u => u.username == username);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).send('Invalid credentials');
    }
    const token = jwt.sign({ userId: user.username }, secretKey, { expiresIn: '30m' });
    res.status(200).send({ token : token });
  });
});

app.post('/signin', async (req, res) => {
  const { username, password, names, dateT } = req.body;

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 8);
  
  User.selectAll().then(async (data) => {
    
    const user = JSON.parse(data).find(u => u.username == username);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).send('Invalid credentials');
    }
    const token = jwt.sign({ userId: user.username }, secretKey, { expiresIn: '30m' });
    res.status(200).send({ token : token });
  });
});

app.use(authenticateToken);
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
  try {
    let categorie = req.body;
    Categorie.insert(categorie).then((data) => res.status(201).json({message: 'Successfully added', categories: data }));
  } catch(error) {
    res.status(500).send({ message: error.message });
  }
});

app.put("/categories/:id", (req, res) => {
  try {
    let categorieItem = req.body;
    Categorie.update(categorieItem).then((data) => res.status(201).json({message: 'Successfully added', categories: data }));
  ;
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

app.delete("/categories/:id", (req, res) => {
  try {
    let id = req.params.id;
    Categorie.delete(id).then((data) => res.status(201).json({message: 'Successfully added', categories: data }));
  ;
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
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

app.post('/signup', async (req, res) => {
  const {username, password} = req.body;
  const hashedPassword = await bycrypt.hash(password, 8);
  User.insert(username, hashedPassword);
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});