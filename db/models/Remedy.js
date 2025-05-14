import mongoose from "mongoose";

const { Schema } = mongoose;

const remedySchema = new Schema({
  title: { type: String, required: true },
  imageUrl: { type: String, required: true },
  ingredients: {
    type: [String],
    required: true,
    min: [1, "Ingredients array must contain at least one item."], // Ensures non-empty array
  },
  preparation: { type: String },
  usage: { type: String },
  symptoms: {
    type: [Schema.Types.ObjectId], // Array of symptom IDs (ObjectIds)
    ref: "Symptom", // Reference to the "Symptom" model
    required: true,
    min: [1, "At least one symptom ID is required."], // Ensures non-empty array
  },
  owner: { type: String, required: true },
});

const Remedy = mongoose.models.Remedy || mongoose.model("Remedy", remedySchema);
export { Remedy };
