import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import Comment from "../../../models/Comment";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, query } = req;

  await dbConnect();

  console.log(req.body.reply_id);

  switch (method) {
    case "POST":
      try {
        const comments = await Comment.updateOne(
          {
            _id: new mongoose.Types.ObjectId(query.id as string),
            "reply._id": new mongoose.Types.ObjectId(req.body.reply_id),
          },
          {
            $set: {
              "reply.$.vote": req.body.vote,
            },
          }
        );
        res.status(200).json({ success: true, data: comments });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
