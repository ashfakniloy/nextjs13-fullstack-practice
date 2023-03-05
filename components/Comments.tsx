import Link from "next/link";
import { prisma } from "../lib/prisma";
import { formatDistanceToNow } from "date-fns";
import DeleteComment from "./DeleteComment";

async function getComments(postId: string) {
  const response = await prisma.comment.findMany({
    where: {
      postId: postId,
    },
    include: {
      user: {
        select: {
          username: true,
          id: true,
        },
      },
    },
  });

  const data = JSON.parse(JSON.stringify(response));

  return data;
}

async function Comments({
  postId,
  myId,
  authorId,
}: {
  postId: string;
  myId: string;
  authorId: string;
}) {
  const comments: UserComment[] = await getComments(postId);

  return (
    <div className="mt-4 w-full max-w-[500px]">
      <p className="">{comments?.length ? "Comments" : "No comments yet"}</p>
      <div className="mt-3 space-y-4 text-sm">
        {comments.map((comment, i) => (
          <div key={i}>
            <Link
              href={`/user/${comment.userId}`}
              className={`font-bold ${
                comment.userId === myId
                  ? "text-blue-500"
                  : "text-gray-400 hover:text-gray-300"
              } `}
            >
              {comment.user.username}
            </Link>

            <p className="mt-1">{comment.comment}</p>
            <div className="mt-1 flex items-center gap-7">
              <p className="text-gray-400">
                {formatDistanceToNow(new Date(comment.createdAt), {
                  addSuffix: true,
                })}
              </p>
              {(comment.userId === myId || myId === authorId) && (
                <DeleteComment id={comment.id} />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Comments;
