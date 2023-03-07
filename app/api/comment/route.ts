import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { authOptions } from "../../../pages/api/auth/[...nextauth]";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // const body = await request.json();
  // console.log("request body", body);

  const { comment, postId } = await request.json();

  if (!comment || !postId) {
    return NextResponse.json(
      { error: "All parameters required" },
      { status: 400 }
    );
  }

  try {
    const response = await prisma.comment.create({
      data: {
        comment: comment,
        user: {
          connect: {
            id: session.user.id,
          },
        },
        post: {
          connect: {
            id: postId,
          },
        },
      },
    });

    return NextResponse.json({ message: "Commented Successfully", response });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 400 });
  }
}

export async function DELETE(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = request.nextUrl;

  const commentId = searchParams.get("commentId");

  if (typeof commentId !== "string") {
    return NextResponse.json({ error: "Invalid Searchparam" }, { status: 400 });
  }

  try {
    const response = await prisma.comment.delete({
      where: {
        id: commentId,
      },
    });

    return NextResponse.json({ message: "Deleted Successfully", response });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 400 });
  }
}
