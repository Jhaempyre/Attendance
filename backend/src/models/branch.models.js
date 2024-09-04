import mongoose,{Schema} from "mongoose";
const branchSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true, // e.g., "CSE"
        }
    },
    { timestamps: true }
);

export const Branch = mongoose.model("Branch", branchSchema);
