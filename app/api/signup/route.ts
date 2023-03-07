import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function POST(request: NextRequest) {
  const body = await request.json();

  if (Object.keys(body).length === 0) {
    return NextResponse.json(
      { error: "Content cannot be empty" },
      { status: 400 }
    );
  }

  if (Object.values(body).includes("")) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 }
    );
  }

  const { username, email, password } = body;

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
    return NextResponse.json(
      { error: "Username already exists" },
      { status: 400 }
    );
  }

  if (emailExists) {
    return NextResponse.json(
      { error: "Email already exists" },
      { status: 400 }
    );
  }

  try {
    const response = await prisma.user.create({
      data: body,
    });

    return NextResponse.json(
      { message: "Account Created Successfully", response },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
