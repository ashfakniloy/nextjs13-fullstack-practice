import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function commenthandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // if (req.method !== "POST") {
  //   return res.status(400).json({ error: `Method ${req.method} not allowed` });
  // }

  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { commentId } = req.query;

  if (req.method === "DELETE") {
    try {
      const response = await prisma.comment.delete({
        where: {
          id: `${commentId}`,
        },
      });

      return res
        .status(201)
        .json({ message: "Deleted Successfully", response });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error });
    }
  }
}
