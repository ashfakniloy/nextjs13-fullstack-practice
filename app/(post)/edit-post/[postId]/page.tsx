import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PostForm from "../../../../Components/PostForm";
import { prisma } from "../../../../lib/prisma";

export const dynamic = "force-dynamic";

type Props = {
  params: {
    postId: string;
  };
};

async function getPost(postId: string) {
  const response = await prisma.post.findUnique({
    where: {
      id: postId,
    },
  });

  const data = JSON.parse(JSON.stringify(response));

  return data;
}

export async function generateMetadata({
  params: { postId },
}: Props): Promise<Metadata> {
  const post: Post = await getPost(postId);
  return { title: `Edit ${post.title}` };
}

async function EditPostPage({ params: { postId } }: Props) {
  const post: Post = await getPost(postId);

  if (!post) {
    notFound();
  }

  const initialState = {
    title: post?.title,
    category: post?.category,
    description: post?.description,
  };

  return (
    <div>
      <h4 className="text-2xl text-gray-400 font-bold">Edit {post?.title}</h4>
      <div className="mt-5">
        <PostForm initialState={initialState} formType="edit" postId={postId} />
      </div>
    </div>
  );
}

export default EditPostPage;
