import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { authOptions } from "../../../pages/api/auth/[...nextauth]";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const reqBody = await request.json();

  if (!reqBody) {
    return NextResponse.json(
      { error: "Content can not be empty" },
      { status: 400 }
    );
  }

  if (Object.keys(reqBody).length === 0) {
    return NextResponse.json(
      { error: "Content cannot be empty" },
      { status: 400 }
    );
  }

  if (Object.values(reqBody).includes("")) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 }
    );
  }

  try {
    const response = await prisma.post.create({
      data: { ...reqBody, userId: session?.user?.id },
    });

    return NextResponse.json({ message: "Submitted Successfully", response });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error, session }, { status: 400 });
  }
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const postId = searchParams.get("postId");

  if (typeof postId !== "string") {
    return NextResponse.json(
      { error: "Invalid Searchparams" },
      { status: 400 }
    );
  }

  try {
    const response = await prisma.post.delete({
      where: {
        id: postId,
      },
    });

    return NextResponse.json({ message: "Deleted Successfully", response });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const postId = searchParams.get("postId");

  if (typeof postId !== "string") {
    return NextResponse.json(
      { error: "Invalid Searchparams" },
      { status: 400 }
    );
  }

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

  try {
    const response = await prisma.post.update({
      where: {
        id: postId,
      },
      data: body,
    });

    return NextResponse.json({ message: "Updated Successfully", response });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
