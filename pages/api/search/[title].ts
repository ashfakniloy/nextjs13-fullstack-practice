import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

export default async function searchHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(400).json({ error: `Method ${req.method} not allowed` });
  }

  const { title } = req.query;

  // return res.status(200).json("success");

  try {
    const response = await prisma.post.findMany({
      where: {
        title: {
          startsWith: title?.toString(),
          mode: "insensitive",
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        title: true,
      },
    });

    return res.status(200).json(response);
  } catch (error) {
    console.log("error", error);

    return res.status(400).json({ error: "Something went wrong" });
  }
}
