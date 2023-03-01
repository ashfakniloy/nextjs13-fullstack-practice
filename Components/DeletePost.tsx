"use client";

import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

function DeletePost({ postId }: { postId: string }) {
  const router = useRouter();
  const handleDelete = async () => {
    const loadingToast2 = toast.loading("Loading...");

    const res = await fetch(`/api/post/${postId}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (res.ok) {
      console.log("success", data);
      router.refresh();
      toast.dismiss(loadingToast2);
      toast.success("Deleted Successfully");
    } else {
      console.log("error", data);
      toast.dismiss(loadingToast2);
      toast.error(data.error);
    }
  };

  return (
    <button
      className="text-xs font-bold bg-red-900 px-3 py-1.5 rounded  uppercase"
      onClick={handleDelete}
    >
      Delete
    </button>
  );
}

export default DeletePost;
