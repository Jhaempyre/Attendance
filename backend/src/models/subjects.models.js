import mongoose,{Schema} from "mongoose";

const subjectSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        code: {
            type: String,
            required: true,
            unique: true, // e.g., "CSE201"
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
