import { Teacher } from "../models/teachers.models.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from 'jsonwebtoken'; 


const authVerify = asyncHandler(async(req,_,next)=>{
    try {
     const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")
       console.log(token);
     if(!token){
       console.log("ram")
      throw new ApiError(400,"Unauthorised request")
 
     }
     const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
     console.log("29");
     const theTeacher = await Teacher.findById(decodedToken?._id).select("-password -refreshToken")
     console.log("33");
     if(!theTeacher){
      throw new ApiError(400,"Invalid access token")
 
     }
     req.theTeacher = theTeacher
     console.log("44");
     next()
    } catch (error) {
       console.log("lol")
     throw new ApiError(401, error?.message || "Invalid access token")    
    }   
 }) 
 
 export { authVerify }