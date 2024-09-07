import {asyncHandler} from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Teacher } from "../models/teachers.models.js";
import { Student } from "../models/students.models.js";
import { Branch } from "../models/branch.models.js";
import { transformSync } from "next/dist/build/swc/index.js";
import { Year } from "../models/years.models.js";
import { Section } from "../models/sections.models.js";
import { Subject } from "../models/subjects.models.js";

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
}
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
const logOutTeacher = asyncHandler(async(req,res)=>{
    await Teacher.findByIdAndUpdate(
        req.theTeacher._id,
        {
            $unset:{
                refreshToken : 1
            }
        }, 
            {
                new : true
            }
     )
     const options = {
        httpOnly: true,
        secure: true
    }
    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "Teacher logged Out"))
 })
const addYear = asyncHandler(async(req,res)=>{
    try {
        const {year} = req.body
        console.log(year)
        if (!year) {
            throw new ApiError(400, "Year is required");
        }
        const existingYear= await Year.findOne({ year });
        console.log("2")
        if (existingYear) {
            throw new ApiError(400, "Year already exists");
        }
        console.log("1")
        const newYear = new Year({ year });
        console.log(newYear)
        const savedYear = await newYear.save();
        console.log(savedYear)

        res.status(200).json(new ApiResponse(200, "Year Added successfully", savedYear));
    } catch (error) {
        throw new ApiError(500, error.message);
    }
})
const addBranch = asyncHandler(async(req,res)=>{
    try {
        const { name } = req.body;

        if (!name) {
            throw new ApiError(400, "Branch name is required");
        }

        const existingBranch = await Branch.findOne({ name });
        if (existingBranch) {
            throw new ApiError(400, "Branch already exists");
        }

        const newBranch = new Branch({ name });
        const savedBranch = await newBranch.save();

        res.status(200).json(new ApiResponse(200, "Branch added successfully", savedBranch));
    } catch (error) {
        throw new ApiError(500, error.message);
    }
})//working
const addSection = asyncHandler(async(req,res)=>{
    try {
        const { name, branchId, yearId } = req.body;

        if (!name || !branchId || !yearId) {
            throw new ApiError(400, "Section name, branch, and year are required");
        }

        const sectionExists = await Section.findOne({ name, branch: branchId, year: yearId });
        if (sectionExists) {
            throw new ApiError(400, "Section already exists for this branch and year");
        }

        const newSection = new Section({
            name,
            branch: branchId,
            year: yearId
        });

        const savedSection = await newSection.save();
        res.status(200).json(new ApiResponse(200, "Section added successfully", savedSection));
    } catch (error) {
        throw new ApiError(500, error.message);
    }
})
const addSubejct = asyncHandler(async(req,res)=>{
    try {
        const { name, code, branchId, yearId } = req.body;

        if (!name || !code || !branchId || !yearId) {
            throw new ApiError(400, "Subject name, code, branch, and year are required");
        }

        const existingSubject = await Subject.findOne({ code, branch: branchId, year: yearId });
        if (existingSubject) {
            throw new ApiError(400, "Subject with this code already exists");
        }

        const newSubject = new Subject({
            name,
            code,
            branch: branchId,
            year: yearId
        });

        const savedSubject = await newSubject.save();
        res.status(200).json(new ApiResponse(200, "Subject added successfully", savedSubject));
    } catch (error) {
        throw new ApiError(500, error.message);
    }
})
const addStudent = asyncHandler(async(req,res)=>{
    try {
        const { enrollmentNumber, fullname, yearId, branchId, sectionId } = req.body;

        if (!enrollmentNumber || !fullname || !yearId || !branchId || !sectionId) {
            throw new ApiError(400, "All fields are required");
        }

        const existingStudent = await Student.findOne({ enrollmentNumber });
        if (existingStudent) {
            throw new ApiError(400, "Student with this enrollment number already exists");
        }

        const newStudent = new Student({
            enrollmentNumber,
            fullname,
            year: yearId,
            branch: branchId,
            section: sectionId
        });

        const savedStudent = await newStudent.save();
        res.status(200).json(new ApiResponse(200, "Student added successfully", savedStudent));
    } catch (error) {
        throw new ApiError(500, error.message);
    }
})
const getStudentsBySection = asyncHandler(async (req, res) => {
    try {
        const { sectionId } = req.params;

        if (!sectionId) {
            throw new ApiError(400, "Section ID is required");
        }

        const students = await Student.find({ section: sectionId })
            .populate('year', 'year')  // To include year information
            .populate('branch', 'name')  // To include branch information
            .populate('section', 'name'); // To include section information

        if (students.length === 0) {
            return res.status(404).json(new ApiResponse(404, {}, "No students found in this section"));
        }

        return res.status(200).json(new ApiResponse(200, students, "Students fetched successfully"));
    } catch (error) {
        throw new ApiError(500, error.message);
    }
});

export {
    registerTeacher,
    loginTeacher,
    logOutTeacher,
    addYear,
    addBranch,
    addSection,
    addSubejct,
    addStudent,
    getStudentsBySection
}