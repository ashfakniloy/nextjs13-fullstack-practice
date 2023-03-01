import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function GET(
  request: NextRequest,
  { params: { title } }: { params: { title: string } }
) {
  // const { searchParams } = request.nextUrl;
  // const t = searchParams.get("t");
  // return NextResponse.json({ search: title });

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

    // return res.status(200).json(response);
    return NextResponse.json(response);
  } catch (error) {
    console.log("error", error);

    // return res.status(400).json({ error: "Something went wrong" });
    return NextResponse.json({ error: "Something went wrong" });
  }
}
