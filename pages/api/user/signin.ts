import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

export default async function signuphandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(400).json({ error: `Method ${req.method} not allowed` });
  }

  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ error: "Content cannot be empty" });
  }

  if (Object.values(req.body).includes("")) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const { email, password } = req.body;

  try {
    const response = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!response) {
      return res.status(400).json({ error: "Email doesn't Exist" });
    }

    console.log(response);

    if (response.password !== password) {
      return res.status(400).json({ error: "Incorrect Password" });
    }

    res.status(200).json({ message: response });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
}
