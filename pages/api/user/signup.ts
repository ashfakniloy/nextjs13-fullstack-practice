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

  const { username, email, password } = req.body;

  const emailExists = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  const usernameExists = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });

  if (usernameExists) {
    return res.status(400).json({ error: "Username already exists" });
  }

  if (emailExists) {
    return res.status(400).json({ error: "Email already exists" });
  }

  try {
    const response = await prisma.user.create({
      data: req.body,
    });

    res.status(201).json({ message: "Account Created Successfully", response });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
}
