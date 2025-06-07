import express from "express";

const app = express();
app.use(cors());
app.use(express.json());
const secretKey = 'kalunga';

app.get('/franck', (req, res) => {
    res.status(200).send({ message : 'Chesko' });
})