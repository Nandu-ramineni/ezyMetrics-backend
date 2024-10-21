import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT;
connectDB();
app.get('/', (req, res) => {
    res.send('Hello from ezyMetrics!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});