import {asyncHandler} from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Teacher } from "../models/teachers.models.js";

const genrateAccessTokenAndRefreshToken = async (userId) => {
    try {
        const ser = await Teacher.findById(userId);
        const accessToken = ser.genrateAccessToken();
        const refreshToken = ser.genrateRefreshToken();
        ser.refreshToken = refreshToken;
        ser.save({ validateBeforeSave: false }); 
        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(420, "You are not authorised");
    }
};

const registerTeacher = asyncHandler(async(req,res)=>{
    try {
        const {fullname , email , password , mobile ,gender} = req.body
        console.log(req.body);
     if (!password) {
         throw new ApiError(400,"Password required")
     }
     const teacher = await Teacher.findOne({ email});
     console.log(1)
     if (teacher) {
        return res.status(400).json({ error: "Username already exists" });
    }
    const boyAvtar= `https://avatar.iran.liara.run/public/boy?username=${fullname}`
    const girlAvtar = `https://avatar.iran.liara.run/public/girl?username=${fullname}`
    const newTeacher = new Teacher({
        fullname,
        gender ,
        email ,
        password ,
        mobile ,
        avtar : gender === 'male'? boyAvtar : girlAvtar
    })
    console.log(newTeacher);

    if(!newTeacher){
        return res.status(400).json({ error: "Failed to create new teacher" });
    }
    const savedTeacher = await newTeacher.save()

    return res.status(200).json(
        new ApiResponse(200,"New Teacher Added",savedTeacher)
    )
    } catch (error) {
        console.log(error.message)
        throw new ApiError(400,`${error.message}`)
    }
})
const loginTeacher = asyncHandler(async(req,res)=>{
    try {
        const {email,password} = req.body
        const teacher = await Teacher.findOne({ email})
        if (!teacher) {
            throw new ApiError(400,"Teacher doesn't exsist")
        }
        const isPasswordValid = await teacher.isPasswordCorrect(password)
        if (!(isPasswordValid)){
            throw new ApiError(405, "invalid credential")
            }
            const {accessToken, refreshToken} = await genrateAccessTokenAndRefreshToken(teacher._id)    
            const loggedUser = await Teacher.findById(teacher._id).select("-password -refreshToken")
            const options = {
                httpOnly : true ,
                secure : true
            }
            return res.status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(
              new ApiResponse(
                  200, 
                  {
                      loggedUser : loggedUser,
                      accessToken : accessToken,
                      refreshToken : refreshToken
                  },
                  "User logged In Successfully"
              )
          )
        }catch (error) {
        throw new ApiError(400,`${error.message}`)        
    }
})
export {
    registerTeacher,
    loginTeacher
}