// import dotenv from 'dotenv';
// dotenv.config();
import express from 'express';
import cors from 'cors';
import './DB/Config.js'
import './DB/InitDB.js'
import { initTables } from './DB/InitDB.js';
const app = express();

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));


app.get('/', (req, res) => {
  res.send('ברוכה הבאה לשרת!');
});

const PORT = process.env.PORT||5000;
initTables()
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
