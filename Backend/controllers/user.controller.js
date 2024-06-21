
import mongoose from 'mongoose';
import { User } from '../models/user.model.js';
import { asyncHandle } from '../utils/asyncHandle.js';
import { ErrorReq } from '../utils/ErrorReq.js';
import { Response } from '../utils/Response.js';
import { Slot } from '../models/slot.model.js';


const generateAccessAndRefereshTokens = async(userId) =>
  {
    try{
      const user = await User.findById(userId)
      const accessToken = user.generateAccessToken()
      const refereshToken = user.generateRefreshToken()

      user.refreshToken = refereshToken
      await user.save({validateBeforeSave: false})
      return {accessToken , refereshToken}
    }
    catch(error){
      throw new ErrorReq(500 , "Something went wrong while generating tokens")
    }
}
const registerUser = asyncHandle(async (req, res) => {
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
});


const LoginUser = asyncHandle( async (req , res) => {

  const { email , username , password} = req.body
  if(!(email || username)){
    throw new ErrorReq ( 400 , " username or email are required")
  }
  const user = await User.findOne({
    $or: [{email} , {username}]
  })
  if(!user){
    throw new ErrorReq(404 , "user does not exist")
  }

  const isPasswordValid = await user.isPasswordCorrect(password)
    
  if(!isPasswordValid){
    throw new ErrorReq( 401 , "incorrect password ")
  }

  const {accessToken , refereshToken} = await generateAccessAndRefereshTokens(user._id)

  console.log('Access Token:', accessToken);
  console.log('Refresh Token:', refereshToken);
  
  const loggedInUser = await User.findById(user._id).select("-password -refereshToken")
  
  // this let only the server modify the cookine , Frontend can not modify the cookies
  const options = {
    httpOnly: true,
    secure: true,
}
  return res.status(200)
  .cookie("accessToken" , accessToken , options)
  .cookie("refereshToken" , refereshToken , options)
  .json(
    new Response(200 , 
      {
        user: loggedInUser, accessToken,
        refereshToken
      },
      "User logged In Succesfully "
    )
  )
} );

const LogoutUser = asyncHandle(async(req , res ) =>{
      await User.findByIdAndUpdate(
        req.user._id,
        {
          $set: {
            refereshToken: undefined
          }
        },
        {
          new: true
        }
      )

      const options = {
        httpOnly: true,
        secure: true,
    }

    return res
    .status(200)
    .clearCookie("accessToken" , options)
    .clearCookie("refereshToken" , options)
    .json(new Response(200 , {} , "User logged out" ))
}
)

const SearchTimeSlot = asyncHandle(async (req , res )=>{
  const {StartTime, EndTime, date, day} = req.query;
  try{
    const timeSlot = await Slot.findOne({StartTime, EndTime, date, day})
    if(timeSlot){
      return res.status(200).json({ exists: true, timeSlot})
    }else{
      return res.status(200).json({ exists: false });
    }
  }catch(error){
    return res.status(500).json({message: 'Server error', error  })
  }
})

const createSlotTimeInfo = asyncHandle(async (req, res) => {
  const { username, location, phone, gender, StartTime, EndTime, date, day } = req.body;

  if(!username || !location || !phone || !gender || !StartTime || !EndTime || !date || !day ){
    throw new ErrorReq( 400 , "User ditials are required")
  }
  try {
      const slotTime = new Slot({ StartTime, EndTime, date, day, username , location , phone , gender , booked: true });
      await slotTime.save();
      res.status(201).json(new Response(201, "Slot booked successfully", slotTime));
  } catch (error) {
      console.log('user time is not register' , error)
    }
  })

  const getAllSlots = asyncHandle(async (req, res) => {
    try {
      const slots = await Slot.find();
      res.status(200).json(new Response(200, "Slots fetched successfully", slots));
    } catch (error) {
      res.status(500).json(new Response(500, "Failed to fetch slots", error));
    }})

export { 
  registerUser,
  LoginUser,
  LogoutUser,
  createSlotTimeInfo,
  SearchTimeSlot,
  getAllSlots
};
