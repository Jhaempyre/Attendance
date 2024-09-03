import mongoose , {Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"

const teacherSchema = new Schema(
    {
        email:{
            type:String,
            required:true,
            unique:true,
            lowercase :true,
            trim:true,
        },
        fullname:{
            type:String,
            required:true,           
            trim:true,
            index:true
        },
        password:{
            type: String ,
            required:[true,"Passowrd caahiye re baba"]
        },
        mobile:{
            type:String ,
            required:true ,
        },
        gender: {
			type: String,
			required: true,
			enum: ["male", "female"],
		},
        avtar: {
			type: String,
			default: "",
		},
        refreshToken:{
            type :String

        }
    },{
        timestamps:true
    }
    )

    teacherSchema.pre("save",async function(next){
        if(!this.isModified("password")) return next();
        this.password= await bcrypt.hash(this.password,11)
        next()
    })
    // In the User model
    teacherSchema.methods.isPasswordCorrect = async function(password){     
         return await bcrypt.compare(password, this.password)
     
    }

    teacherSchema.methods.genrateAccessToken = function()
{
    return jwt.sign({
        _id:this._id,
        email:this.email,
        username:this.fullname
    },
    process.env.ACCESS_TOKEN_SECRET,{
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    }
    )
}

teacherSchema.methods.genrateRefreshToken = function()
    {
        return jwt.sign({
        _id:this._id,
        
    },
    process.env.REFRESH_TOKEN_SECRET,{
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    }
    )
    }

export const Teacher = mongoose.model("teacher", teacherSchema)