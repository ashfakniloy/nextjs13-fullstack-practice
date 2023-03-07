"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useToggle from "../hooks/useToggle";
import { ClearIcon } from "./Icons/ClearIcon";
import { LikeIcon } from "./Icons/LikeIcon";

function LikeButton({
  postId,
  likes,
}: {
  postId: string;
  likes: Like[] | undefined;
}) {
  const router = useRouter();

  const [like, setLike] = useState(false);

  const { node, toggle: showLikes, setToggle: setShowLikes } = useToggle();

  const { status, data: session } = useSession();

  const hasLiked = likes?.find((like) => like.userId === session?.user.id);

  // const url = `/api/like-old/${postId}`;
  const url = `/api/like?postId=${postId}`;

  const handleLike = async () => {
    setLike(true);

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json(",
      },
    });

    const data = await res.json();

    if (res.ok) {
      console.log("liked", data);
    } else {
      setLike(false);

      console.log("like failed", data);
    }
  };

  const handleUnlike = async () => {
    setLike(false);

    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json(",
      },
    });

    const data = await res.json();

    if (res.ok) {
      console.log("unliked", data);
    } else {
      setLike(true);
      console.log("unlike failed", data);
    }
  };

  useEffect(() => {
    hasLiked && setLike(true);
    return () => setLike(false);
  }, [hasLiked]);

  const handleClick = async () => {
    if (status === "unauthenticated") {
      return router.push("/signin");
    }

    if (hasLiked) {
      await handleUnlike();
      router.refresh();
    } else {
      await handleLike();
      router.refresh();
    }
  };

  // console.log("LIKES", likes);

  return (
    <div ref={node} className="flex items-center gap-3 text-sm relative">
      <button
        className={`font-bold active:scale-125 ${
          like ? "text-blue-500" : "text-emerald-400"
        } `}
        onClick={handleClick}
      >
        <LikeIcon />
      </button>
      {likes?.length ? (
        <div>
          <button
            className="text-gray-300 hover:text-gray-100"
            onClick={() => setShowLikes(!showLikes)}
          >
            {likes.length > 1 ? (
              <span>{likes.length} Likes</span>
            ) : (
              <span>{likes.length} Like</span>
            )}
          </button>

          {showLikes && (
            <div className="bg-gray-700 absolute left-0 top-[30px] w-full rounded min-w-[170px] border border-gray-600 overflow-hidden z-10">
              <div className="flex items-center justify-between py-2 px-3">
                <p className="self-center ">All Likes</p>
                <button
                  className="scale-75 rounded-full bg-gray-600 hover:bg-gray-600/50 p-1"
                  onClick={() => setShowLikes(false)}
                >
                  <ClearIcon />
                </button>
              </div>
              <div className="border-t border-gray-600 overflow-hidden max-h-[240px] overflow-y-auto scrollbar-thin scrollbar-track-gray-600/50 scrollbar-thumb-gray-500/50 ">
                {likes?.map((like, i) => (
                  <Link
                    key={i}
                    href={`/user/${like.userId}`}
                    // onClick={() => setShowLikes(false)}
                  >
                    <p
                      className={`w-full text-left p-3 text-xs hover:bg-gray-600 ${
                        like.userId === session?.user.id
                          ? "text-blue-500"
                          : "text-gray-100"
                      }`}
                    >
                      {like.user.username}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default LikeButton;
