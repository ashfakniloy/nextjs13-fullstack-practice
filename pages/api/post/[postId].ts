import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { prisma } from "../../../lib/prisma";
import { authOptions } from "../auth/[...nextauth]";

export default async function postIdhandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // if (req.method !== "PUT" || "PATCH" || "DELETE") {
  //   return res.status(400).json({ error: `Method ${req.method} not allowed` });
  // }

  const { postId } = req.query;

  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const response = await prisma.post.findUnique({
      where: {
        id: `${postId}`,
      },
    });

    if (!response) {
      return res.status(400).json({ error: "Post not found" });
    }

    if (response.userId !== session.user.id) {
      return res.status(400).json({ error: "Not authorized" });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }

  if (req.method === "DELETE") {
    try {
      const response = await prisma.post.delete({
        where: {
          id: `${postId}`,
        },
      });

      return res
        .status(200)
        .json({ message: "Deleted Successfully", response });
    } catch (error) {
      console.log(error);
      res.status(400).json({ error });
    }
  }

  if (req.method === "PUT") {
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "Content cannot be empty" });
    }

    if (Object.values(req.body).includes("")) {
      return res.status(400).json({ error: "All fields are required" });
    }

    try {
      const response = await prisma.post.update({
        where: {
          id: `${postId}`,
        },
        data: req.body,
      });

      return res
        .status(200)
        .json({ message: "Updated Successfully", response });
    } catch (error) {
      console.log(error);
      res.status(400).json({ error });
    }
  }
}
