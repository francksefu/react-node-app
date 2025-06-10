import express from "express";
import Expense from "./server/db/Expense.mjs";
import Categorie from "./server/db/categorie.mjs";
import User from "./server/db/User.mjs";
import cors from "cors";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';



const PORT = process.env.PORT || 3001;
let courantUser;
const app = express();
app.use(cors());
app.use(express.json());
const secretKey = 'kalunga';

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

app.get('/franck', (req, res) => {
  
    console.log(courantUser);
    try {
      res.json({ categories: (Categorie.selectAll()) });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
})
app.post('/signup', async (req, res) => {
  const { username, password, names, dateT } = req.body;
  const hashedPassword = await bcrypt.hash(password, 8);

  // Store user
  if (await User.checkIfUsernameExist(username)) {
    res.status(200).send({ message : 'User exist' });
  } else {
    User.insert({username: username, password: hashedPassword, names, dateT});
  
    User.selectAll().then(async (data) => {
      
      const user = JSON.parse(data).find(u => u.username == username);
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).send('Invalid credentials');
      }
      courantUser = {id: user.id, names: user.names}
      const token = jwt.sign({ userId: user.username }, secretKey, { expiresIn: '30m' });
      res.status(200).send({ token : token, names: user.names});
    });
  }
  
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
    courantUser = {id: user.id, names: user.names};
    const token = jwt.sign({ userId: user.username }, secretKey, { expiresIn: '30m' });
    res.status(200).send({ token : token, names: user.names });
  });
});

app.use(authenticateToken);
//index or get all
app.get("/categories", (req, res) => {
  console.log(courantUser);
  try {
    res.json({ categories: (Categorie.selectAll(courantUser.id)), id: JSON.stringify(courantUser.id)});
  } catch (error) {
    res.status(500).send({ message: error.message, id: JSON.stringify(courantUser.id) });
  }
});

//create
app.post("/categories", (req, res) => {
  try {
    let categorie = req.body;
    Categorie.insert(categorie, courantUser.id).then((data) => res.status(201).json({message: 'Successfully added', categories: data }));
  } catch(error) {
    res.status(500).send({ message: error.message });
  }
});

app.put("/categories/:id", (req, res) => {
  try {
    let categorieItem = req.body;
    Categorie.update(categorieItem, courantUser.id).then((data) => res.status(201).json({message: 'Successfully added', categories: data }));
  ;
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

app.delete("/categories/:id", (req, res) => {
  try {
    let id = req.params.id;
    Categorie.delete(id, courantUser.id).then((data) => res.status(201).json({message: 'Successfully added', categories: data }));
  ;
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});


//index or get all
app.get("/expenses", (req, res) => {
  try {
    res.json({ expenses: (Expense.selectAllRelatedToCategories(courantUser.id)) });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
  
});

app.put("/expenses/:id", (req, res) => {
  try {
    let expenseItem = req.body;
    Expense.update(expenseItem, courantUser.id).then((data) => res.status(201).json({message: 'Successfully added', expenses: data }));
  ;
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

app.delete("/expenses/:id", (req, res) => {
  try {
    let id = req.params.id;
    Expense.delete(id, courantUser.id).then((data) => res.status(201).json({message: 'Successfully added', expenses: data }));
  ;
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});


//create
app.post("/expenses", (req, res) => {
  try {
    let expenses = (req.body);
    Expense.insert(expenses, courantUser.id).then((data) => res.status(201).json({message: 'Successfully added', expenses: data }));
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
  console.log(`Server listening on ${'ok'}`);
});
