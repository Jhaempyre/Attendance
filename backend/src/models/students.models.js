import mongoose , {Schema} from "mongoose";

const studentSchema = new Schema(
    {
        enrollmentNumber:{
            type:String,
            required:true,
            unique:true,
        },
        fullname:{
            type:String,
            required:true,           
            trim:true,
            index:true
        },
        year:{
            type:Schema.Types.ObjectId,
            ref:"Year",
        },
        branch:{
            type:Schema.Types.ObjectId,
            ref : "Branch",
            required:true,

        },
        section:{
            type:Schema.Types.ObjectId,
            ref: "Section"
        }
    },{
        timestamps:true
    }
    )
export const Student = mongoose.model("student", studentSchema)