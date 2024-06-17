import { User } from "../models/user.model.js";
import { ErrorReq } from "../utils/ErrorReq.js";
import { asyncHandle } from "../utils/asyncHandle.js";
import jwt from "jsonwebtoken"


export const verifyJWT = asyncHandle(async(req ,res ,next)=> {
    try {
    const token =req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer " , "")

    if(!token){
        throw new ErrorReq(401 , "Unauthorized request")
    }

    const decodedToken = jwt.verify(token , process.env.ACCESS_TOKEN_SECRET)
    const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
  
    if(!user){
        throw new ErrorReq(401 , "Invalid Access Token")
    }
    req.user = user;
    next()
} catch (error) {
    throw new ErrorReq(401 , error?.message || "Invalid access token")
}
})