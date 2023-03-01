import { prisma } from "../../../../lib/prisma";
import Post from "../../../../Components/Post";
import type { Metadata } from "next";

export const dynamic = "auto";

type Props = {
  params: {
    userId: string;
  };
};

async function getPostsInfo(userId: string) {
  const response = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      username: true,
      posts: {
        orderBy: {
          createdAt: "desc",
        },
        // include: {
        //   likes: true,
        // },
        include: {
          likes: {
            include: {
              user: {
                select: {
                  username: true,
                  id: true,
                },
              },
            },
          },
        },
      },
      createdAt: true,
    },
  });
  const data = JSON.parse(JSON.stringify(response));
  return data;
}

export async function generateMetadata({
  params: { userId },
}: Props): Promise<Metadata> {
  const userInfo: User = await getPostsInfo(userId);

  return { title: `${userInfo.username}'s Details` };
}

async function UserPage({ params: { userId } }: Props) {
  const userInfo: User = await getPostsInfo(userId);

  return (
    <>
      {userInfo && (
        <div>
          <div className="mt-5">
            <p className="text-xl text-gray-400">User Details</p>
            <div className="mt-3 text-sm space-y-2">
              <p className="">Username: {userInfo.username}</p>
              <p className="">
                Joined at:{" "}
                {new Date(userInfo.createdAt).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>

          <div className="mt-7">
            <p className="text-xl text-gray-400">User&apos;s Posts</p>
            <div className="mt-5 space-y-5">
              {userInfo.posts?.map((post) => (
                <Post
                  key={post.id}
                  id={post.id}
                  title={post.title}
                  category={post.category}
                  description={post.description}
                  // user={post.user}
                  createdAt={post.createdAt}
                  updatedAt={post.updatedAt}
                  likes={post.likes}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default UserPage;
