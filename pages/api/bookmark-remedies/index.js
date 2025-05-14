import dbConnect from "@/db/connect";
import { BookmarkRemedy } from "@/db/models/BookmarkRemedy";
import { getServerSession } from "next-auth/next";
import { getToken } from "next-auth/jwt";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  const token = await getToken({ req });
  const userId = token?.sub;

  if (!session) {
    return res.status(401).json({ status: "Not authorized" });
  }

  try {
    await dbConnect();
  } catch (dbError) {
    console.error("Database connection error:", dbError);
    res.status(500).json({
      status: "Database connection failed",
      error: "DB_CONNECTION_ERROR",
    });
    return;
  }

  try {
    if (req.method === "GET") {
      const bookmarkRemedies = await BookmarkRemedy.find({ owner: userId });

      res.status(200).json(bookmarkRemedies);
      return;
    }
  } catch (GetError) {
    console.error(GetError);
    res.status(404).json({
      status: "Failed to fetch bookmark",
      error: "BOOKMARK_NOT_FOUND",
    });
    return;
  }
  try {
    if (req.method === "POST") {
      const bookmarkRemedyData = req.body;

      await BookmarkRemedy.create({ ...bookmarkRemedyData, owner: userId });

      res.status(201).json({ status: "Remedy bookmark created" });
      return;
    }
  } catch (createError) {
    res.status(500).json({
      status: "Failed to create bookmark",
      error: "CREATE_OPERATION_FAILED",
    });
    return;
  }

  return res.status(405).json({
    status: "Method not allowed",
    allowedMethods: ["GET", "POST"],
    error: "METHOD_NOT_ALLOWED",
  });
}
