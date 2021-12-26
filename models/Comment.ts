import { Schema, models, model, Types } from "mongoose";
import { Comments } from "types";

const CommentSchema = new Schema<Comments>({
  comment: {
    type: String,
  },
  profilePicture: {
    type: String,
  },
  username: { type: String },
  reply: Array,
  vote: { type: Number },
  _id: Types.ObjectId,
  replyTo: String,
  date: { type: String },
});

export default models.Comment || model("Comment", CommentSchema);
