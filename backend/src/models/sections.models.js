import mongoose,{Schema} from "mongoose";

const sectionSchema = new Schema(
    {
        name: {
            type: String,
            required: true, // e.g., "A", "B"
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

export const Section = mongoose.model("Section", sectionSchema);
