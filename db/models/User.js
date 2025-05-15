import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  githubId: { type: String, required: true, unique: true },
  name: { type: String },
  image: { type: String },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export { User };
