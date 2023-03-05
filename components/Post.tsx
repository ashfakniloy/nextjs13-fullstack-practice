import Link from "next/link";
import LikeButton from "./LikeButton";

function Post({
  id,
  title,
  category,
  description,
  user,
  createdAt,
  likes,
  // comments,
  _count,
}: Post) {
  return (
    <div className="bg-gray-900 p-7 flex justify-between items-center gap-3 lg:gap-[100px] rounded-lg">
      <div className="">
        <div className="flex items-center gap-7">
          <p className="text-xl font-medium text-gray-300">{title}</p>
          <span className="text-[10px] text-gray-200 px-1.5 py-1 border border-red-600 bg-red-900/50 rounded-full capitalize">
            {category}
          </span>
        </div>
        <p className="mt-3 text-sm line-clamp-2">{description}</p>
        <div className="mt-2 flex items-center gap-5 text-xs">
          {user?.username && (
            <p className="text-gray-300 font-medium text-sm">
              Author: {user?.username}
            </p>
          )}
          <p className=" text-gray-400 italic">
            {new Date(createdAt).toLocaleDateString("en-US", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
        <div className="mt-1 flex justify-between items-center md:w-[220px]">
          <LikeButton postId={id} likes={likes} />

          {Number(_count?.comments) > 0 && (
            <Link href={`/post/${id}`} className="text-sm text-gray-300">
              {Number(_count?.comments) > 1 ? (
                <span>{_count?.comments} Comments</span>
              ) : (
                <span>{_count?.comments} Comment</span>
              )}
            </Link>
          )}

          {/* {comments?.length ? (
            <Link
              href={`/post/${id}`}
              className="text-sm text-gray-300 hover:text-gray-200"
            >
              {comments.length > 1 ? (
                <span>{comments.length} Comments</span>
              ) : (
                <span>{comments.length} Comment</span>
              )}
            </Link>
          ) : (
            ""
          )} */}

          {/* {comments?.length ? (
            <Link
              href={`/post/${id}`}
              className="text-sm text-gray-300 hover:text-gray-200"
            >
              {comments.length} Comments
            </Link>
          ) : (
            ""
          )} */}
        </div>
      </div>
      <Link href={`/post/${id}`}>
        <button className="text-xs font-bold bg-cyan-800 px-3 py-2 rounded-md details uppercase">
          Details
        </button>
      </Link>
    </div>
  );
}

export default Post;
