import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function commenthandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(400).json({ error: `Method ${req.method} not allowed` });
  }

  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  // const { postId } = req.query;

  // if (Object.keys(req.body).length === 0) {
  //   return res.status(400).json({ error: "Content cannot be empty" });
  // }

  // if (Object.values(req.body).includes("")) {
  //   return res.status(400).json({ error: "All fields are required" });
  // }

  // if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
  //   return res.status(400).json({ error: "Content cannot be empty" });
  // }

  try {
    const response = await prisma.comment.create({
      data: {
        comment: req.body.comment,
        user: {
          connect: {
            id: session.user.id,
          },
        },
        post: {
          connect: {
            id: req.body.postId,
          },
        },
      },
      // include: {
      //   post: {
      //     select: {
      //       comments: true,
      //     },
      //   },
      //   user: {
      //     select: {
      //       id: true,
      //       username: true,
      //     },
      //   },
      // },
    });

    return res
      .status(201)
      .json({ message: "Commented Successfully", response });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }
}
