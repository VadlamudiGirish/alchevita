import dbConnect from "@/db/connect";
import { Remedy } from "@/db/models/Remedy";
import { Symptom } from "@/db/models/Symptom";
import { getServerSession } from "next-auth/next";
import { getToken } from "next-auth/jwt";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  const token = await getToken({ req });
  const userId = token?.sub;

  try {
    await dbConnect();

    if (req.method !== "GET") {
      return res.status(405).json({ status: "Method not allowed!" });
    }

    const { bookmarked, symptom } = req.query;

    if (bookmarked === "true" && !session) {
      return res.status(401).json({ status: "Not authorized" });
    }

    let symptomFilter = {};
    if (symptom) {
      const symDoc = await Symptom.findOne({ name: symptom });
      if (!symDoc) return res.status(200).json([]);
      symptomFilter = { symptoms: symDoc._id };
    }

    const remedies = await Remedy.aggregate([
      { $match: symptomFilter },
      {
        $lookup: {
          from: "bookmarkremedies",
          let: { remedyId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$remedyId", "$$remedyId"] },
                    ...(userId ? [{ $eq: ["$owner", userId] }] : []),
                  ],
                },
              },
            },
          ],
          as: "bookmarkInfo",
        },
      },
      {
        $lookup: {
          from: "symptoms",
          let: { symptomIds: "$symptoms" },
          pipeline: [
            { $match: { $expr: { $in: ["$_id", "$$symptomIds"] } } },
            {
              $addFields: {
                __order: { $indexOfArray: ["$$symptomIds", "$_id"] },
              },
            },
            { $sort: { __order: 1 } },
          ],
          as: "symptomsData",
        },
      },
      {
        $addFields: {
          isBookmarked: { $gt: [{ $size: "$bookmarkInfo" }, 0] },
          symptoms: {
            $map: {
              input: "$symptomsData",
              as: "symptom",
              in: { _id: "$$symptom._id", name: "$$symptom.name" },
            },
          },
        },
      },
      { $unset: ["bookmarkInfo", "symptomsData"] },
      ...(bookmarked === "true" ? [{ $match: { isBookmarked: true } }] : []),
      { $sort: { _id: -1 } },
    ]);

    return res.status(200).json(remedies);
  } catch (error) {
    console.error("API Error:", error);
    return res
      .status(500)
      .json({ status: "Server Error", error: error.message });
  }
}
