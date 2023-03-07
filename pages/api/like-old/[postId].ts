import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function likehandler(
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

  const { postId } = req.query;

  if (req.method === "POST") {
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
      const response = await prisma.like.create({
        data: {
          // post: {
          //   connect: {
          //     id: postId,
          //   },
          // },
          user: {
            connect: {
              id: session.user.id,
            },
          },
          post: {
            connect: {
              id: `${postId}`,
            },
          },
        },
        include: {
          post: {
            select: {
              likes: true,
            },
          },
        },
      });

      return res.status(201).json({ message: "Liked Successfully", response });
    } catch (error) {
      // console.log(error);
      return res.status(400).json({ error });
    }
  }

  if (req.method === "DELETE") {
    try {
      const response = await prisma.like.delete({
        where: {
          postId_userId: {
            userId: session.user.id,
            postId: `${postId}`,
          },
        },
        select: {
          post: {
            select: {
              likes: true,
            },
          },
        },
        // select: {
        //   post: {
        //     include: {
        //       likes: true,
        //     },
        //   },
        // },
      });

      // console.log("rspns", response);

      const filteredRes = response.post.likes.filter(
        (like) => like.userId !== session.user.id
      );

      return res
        .status(201)
        .json({ message: "Unliked Successfully", filteredRes });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error });
    }
  }
}
