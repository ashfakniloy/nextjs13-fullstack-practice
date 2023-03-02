import Post from "../../components/Post";
import { prisma } from "../../lib/prisma";
// import { getServerSession } from "next-auth/next";
// import { authOptions } from "../../pages/api/auth/[...nextauth]";
import Search from "../../components/Search";
import Pagination from "../../components/Pagination";
import { RefreshPage } from "../../components/RefreshPage";

export const dynamic = "force-dynamic";

// type Searchparams = {
//   searchParams?: {
//     search?: string;
//   };
// };

type SearchParams = {
  searchParams: {
    page: string;
    limit: string;
  };
};

const PER_PAGE = 5;

async function getPosts(pageNumber: number, limitNumber: number) {
  // const currentPage = Math.max(Number(pageNumber || 1), 1);
  const currentPage = Math.max(pageNumber || 1, 1);

  const count = await prisma.post.count();

  const response = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: limitNumber || PER_PAGE,
    // skip: currentPage && limitNumber && (currentPage - 1) * limitNumber,
    skip: (currentPage - 1) * limitNumber || 0,
    include: {
      user: {
        select: {
          id: true,
          username: true,
          email: true,
        },
      },
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
      comments: true,
    },
  });

  const posts = JSON.parse(JSON.stringify(response));

  return {
    count,
    posts,
  };
}

async function HomePage({ searchParams: { page, limit } }: SearchParams) {
  const pageNumber = Number(page);
  const limitNumber = Number(limit);

  const data = await getPosts(pageNumber, limitNumber);

  const posts: Post[] = data.posts;
  const postCount: number = data.count;

  console.log("PAGEPARAMS", limit);

  return (
    <div className="">
      {/* temporary fix for page showing stale data when navigating with broswer back/forward button  */}
      {/* <RefreshPage /> */}

      <Search />

      <h4 className="mt-11 text-2xl text-gray-400 font-bold">All Posts</h4>

      <p className="my-2 text-sm text-gray-400">
        Showing {posts.length} {posts.length > 1 ? "items" : "item"} of{" "}
        {postCount}
      </p>

      <div className="mt-4 mb-8 space-y-5">
        {posts.length ? (
          posts.map((post) => (
            <Post
              key={post.id}
              id={post.id}
              title={post.title}
              category={post.category}
              description={post.description}
              user={post.user}
              createdAt={post.createdAt}
              updatedAt={post.updatedAt}
              likes={post.likes}
              comments={post.comments}
            />
          ))
        ) : (
          <p className="text-xl text-red-500">No post found</p>
        )}
      </div>

      {postCount > (limit || PER_PAGE) && (
        <Pagination postCount={postCount} limit={limitNumber || PER_PAGE} />
      )}
    </div>
  );
}

export default HomePage;
