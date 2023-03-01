"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

function CommentsForm({ postId }: { postId: string }) {
  const [comment, setComment] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch(`/api/comment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ comment, postId }),
    });

    const data = await res.json();

    if (res.ok) {
      toast.success("Comment Submitted");
      setComment("");
      router.refresh();
      console.log("success", data);
    } else {
      toast.error(`${data.error}`);
      console.log(data);
    }
  };

  return (
    <div className="w-full max-w-[500px]">
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <textarea
          className="field"
          placeholder="Write Comment"
          name="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />
        <div className="">
          <button className="px-3 py-1.5 bg-blue-600 text-sm font-medium rounded">
            Post
          </button>
        </div>
      </form>
    </div>
  );
}

export default CommentsForm;
