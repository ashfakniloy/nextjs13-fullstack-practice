"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

type Props = {
  initialState: {
    title: string;
    category: string;
    description: string;
  };
  formType: "post" | "edit";
  postId?: string;
};

function PostForm({ initialState, formType, postId }: Props) {
  const router = useRouter();

  const [post, setPost] = useState(initialState);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, name, type } = e.target;
    setPost({
      ...post,
      [name]: type === "number" ? parseInt(value) || value : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formType === "post") {
      const res = await fetch("/api/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      });

      const data = await res.json();

      // toast.promise(
      //   data,
      //   {
      //     loading: "Loading",
      //     success: "Post Created Successfully",
      //     error: "Something Went Wrong",
      //     // error: (err) => err.toString(),
      //   }
      //   // {
      //   //   id: "promise",
      //   // }
      // );

      if (res.ok) {
        console.log("success", data);
        setPost(initialState);
        toast.success("Post Created Successfully");
        router.push("/");
        router.refresh();
      } else {
        console.log("error", data);
        toast.error(data.error, {
          id: "post error",
        });
      }
    }

    if (formType === "edit") {
      // console.log("edit", post);

      const res = await fetch(`/api/post/${postId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      });

      const data = await res.json();

      if (res.ok) {
        console.log("success", data);
        // setPost(initialState);
        toast.success("Post Edited Successfully");
        router.push("/dashboard");
        router.refresh();
      } else {
        toast.error(data.error, {
          id: "edit error",
        });
        console.log("error", data);
      }
    }
  };

  return (
    <div>
      <form
        className="space-y-5 text-gray-400 lg:max-w-[500px]"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col">
          <label htmlFor="title">Post title</label>
          <input
            className="field"
            type="text"
            id="title"
            name="title"
            value={post.title}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="category">Category</label>
          <input
            className="field"
            type="text"
            id="category"
            name="category"
            value={post.category}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="description">Description</label>
          <textarea
            className="field"
            rows={4}
            id="description"
            name="description"
            value={post.description}
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className=" bg-cyan-900 px-4 py-2 rounded text-sm font-bold text-gray-200"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default PostForm;
