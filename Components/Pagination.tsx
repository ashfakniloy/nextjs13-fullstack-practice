"use client";

// import Link from "next/link";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

function Pagination({
  postCount,
  limit,
}: {
  postCount: number;
  limit: number;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const pageParam = Number(params?.get("page"));

  const numberOfPages = Math.ceil(postCount / limit);
  const pages = Array.from({ length: numberOfPages }, (_, i) => i + 1);

  const handlePaginate = (page: number) => {
    if (pageParam === page) return;

    router.push(`/${pathname}?page=${page}&limit=${limit}`);

    // if (page === 1) {
    //   if (!pageParam) return;
    //   router.push(`/${pathname}`);
    // } else {
    //   router.push(`/${pathname}?page=${page}&limit=${limit}`);
    // }
  };

  const handleNext = () => {
    if (pageParam >= numberOfPages) return;

    const nextPage = pageParam === 0 ? 2 : pageParam + 1;

    router.push(`/${pathname}?page=${nextPage}&limit=${limit}`);
  };

  const handleLast = () => {
    // if (pageParam >= numberOfPages) return;

    // const nextPage = pageParam === 0 ? 2 : pageParam + 1;

    router.push(`/${pathname}?page=${numberOfPages}&limit=${limit}`);
  };

  const handlePrev = () => {
    if (pageParam <= 1) return;

    const prevPage = pageParam - 1;

    router.push(`/${pathname}?page=${prevPage}&limit=${limit}`);

    // prevPage === 1
    //   ? router.push(`/${pathname}`)
    //   : router.push(`/${pathname}?page=${prevPage}&limit=${limit}`);
  };

  const handleFirst = () => {
    // router.push(`/${pathname}`);

    router.push(`/${pathname}?page=1&limit=${limit}`);
  };

  return (
    <div className="flex justify-center items-center gap-2 text-sm">
      <button
        className="paginateButton"
        onClick={handleFirst}
        disabled={pageParam <= 1}
      >
        First
      </button>

      <button
        className="paginateButton"
        onClick={handlePrev}
        disabled={pageParam <= 1}
      >
        Prev
      </button>

      <div className="flex overflow-x-auto sm:scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-700">
        {pages.map((page, i) => (
          // <Link
          //   key={i}
          //   href={`/?page=${page}&limit=${limit}`}
          //   shallow={false}
          // >
          //   {page}
          // </Link>
          <button
            key={i}
            className={`px-3.5 py-2 border first:border-l border-l-0 border-gray-500 hover:bg-gray-700 disabled:cursor-not-allowed ${
              page === pageParam || (page === 1 && !pageParam)
                ? "bg-gray-700"
                : "bg-transparent"
            }`}
            onClick={() => handlePaginate(page)}
            disabled={page === pageParam || (page === 1 && !pageParam)}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        className="paginateButton"
        onClick={handleNext}
        disabled={pageParam === numberOfPages}
      >
        Next
      </button>

      <button
        className="paginateButton"
        onClick={handleLast}
        disabled={pageParam === numberOfPages}
      >
        Last
      </button>
    </div>
  );
}

export default Pagination;
