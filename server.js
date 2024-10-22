import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import apiRoutes from './Routes/apiRoutes.js';
import { errorHandler } from './Middlewares/errorHandler.js';
import morgan from 'morgan';
import helmet from 'helmet';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(helmet());


app.use('/api', apiRoutes);

app.use(errorHandler);
const PORT = process.env.PORT;
connectDB();

app.get('/', (req, res) => {
    res.send('Hello from ezyMetrics!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});