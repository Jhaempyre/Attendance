import {asyncHandler} from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Teacher } from "../models/teachers.models.js";

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

export {
    registerTeacher
}