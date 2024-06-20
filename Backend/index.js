import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import userRouter from './routes/user.routes.js';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import { User } from '../models/user.model.js';
import { asyncHandle } from '../utils/asyncHandle.js';
import { ErrorReq } from '../utils/ErrorReq.js';
import { Response } from '../utils/Response.js';
import { Slot } from '../models/slot.model.js';


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

app.post('/register' , 
  asyncHandle(async (req, res) => {
    const { email, username, password } = req.body;
  
    if (!email || !username || !password) {
      throw new ErrorReq(400, "All fields are required");
    }
  
    // Check if a user with the same email or username already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
  
    if (existingUser) {
      throw new ErrorReq(409, "User with email or username already exists");
    }
  
    try {
      // Attempt to create a new user
      const user = new User({ email, username, password });
      await user.save();
  
      // Generate access and refresh tokens
      const accessToken = user.generateAccessToken();
      const refreshToken = user.generateRefreshToken();
  
      console.log("Access Token:", accessToken);
      console.log("Refresh Token:", refreshToken);
  
      // Return the newly created user without the password and refresh token fields
      const newUser = await User.findById(user._id).select("-password -refreshToken");
  
      res.status(201).json(
        new Response(
          201,
          "User registered successfully",
          newUser,
          accessToken,
          refreshToken
        )
      );
    } catch (error) {
      // Handle duplicate key error
      if (error.code === 11000) {
        const field = Object.keys(error.keyValue)[0];
        const value = error.keyValue[field];
        throw new ErrorReq(409, `User with ${field} "${value}" already exists`);
      } else {
        // Log the error for debugging purposes
        console.error("Error during user registration:", error);
  
        // Handle other errors
        throw new ErrorReq(500, "Something went wrong while registering the user");
      }
    }
  })
)


app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
  });
});


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
