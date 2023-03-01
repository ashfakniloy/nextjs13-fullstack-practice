import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";
// import { getToken } from "next-auth/jwt";
import { getSession } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function posthandler(
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

  // if (req.method === "GET") {
  //   try {
  //     const response = await prisma.post.findMany({
  //       // where: {
  //       //   userId: id,
  //       // },
  //       orderBy: {
  //         createdAt: "desc",
  //       },
  //     });

  //     return res.status(200).json(response);
  //   } catch (error) {
  //     return res.status(400).json({ error });
  //   }
  // }

  if (req.method === "POST") {
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "Content cannot be empty" });
    }

    if (Object.values(req.body).includes("")) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    //   return res.status(400).json({ error: "Content cannot be empty" });
    // }

    try {
      const response = await prisma.post.create({
        data: { ...req.body, userId: session?.user?.id },
      });

      res.status(201).json({ message: "Submitted Successfully", response });
    } catch (error) {
      console.log(error);
      res.status(400).json({ error, session });
    }
  }
}
