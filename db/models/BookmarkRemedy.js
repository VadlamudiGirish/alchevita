import mongoose from "mongoose";

const { Schema } = mongoose;

const bookmarkRemedySchema = new Schema({
  remedyId: { type: Schema.Types.ObjectId, ref: "Remedy", required: true },
  owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

const BookmarkRemedy =
  mongoose.models.BookmarkRemedy ||
  mongoose.model("BookmarkRemedy", bookmarkRemedySchema);

export { BookmarkRemedy };
