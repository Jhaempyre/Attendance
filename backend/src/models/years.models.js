import mongoose , {Schema} from "mongoose";
const yearSchema = new Schema(
    {
        year: {
            type: String,
            required: true,
            unique: true, // e.g., "1st Year"
        }
    },
    { timestamps: true }
);

export const Year = mongoose.model("Year", yearSchema);
