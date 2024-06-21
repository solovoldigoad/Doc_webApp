import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import userRouter from './routes/user.routes.js';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true,
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB', err);
  process.exit(1);
});

app.use(cookieParser())

app.use('/api/v1/users', userRouter);

app.get('/', (req, res) => {
  res.send('Welcome to the API');
});


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

module.exports = app;
