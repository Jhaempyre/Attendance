import mongoose,{Schema} from "mongoose";

const subjectSchema = new Schema(
    {
        name: {
            type: String,
            required: true
            
        },
        code: {
            type: String,
            required: true
        },
        year: {
            type: Schema.Types.ObjectId,
            ref: "Year",
            required: true,
        },
        branch: {
            type: Schema.Types.ObjectId,
            ref: "Branch",
            required: true,
        }
    },
    { timestamps: true }
);

export const Subject = mongoose.model("Subject", subjectSchema);
