import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "lib/dbConnect";
import Comment from "models/Comment";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "POST":
      try {
        const votes = await Comment.updateOne(
          { _id: req.body._id },
          {
            vote: req.body.vote,
          }
        );
        res.status(201).json({ success: true, data: votes });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
