"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import useDebounce from "../hooks/useDebounce";
import { ClearIcon } from "./Icons/ClearIcon";

function Search() {
  const [title, setTitle] = useState("");

  const debouncedValue = useDebounce(title, 500);

  const [searchResult, setSearchResult] = useState<
    null | { id: String; title: string }[]
  >(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    title ? setLoading(true) : setLoading(false);
    setSearchResult(null);
  }, [title]);

  useEffect(() => {
    const getSearch = async () => {
      setSearchResult(null);
      const res = await fetch(`/api/search/${debouncedValue}`, {
        cache: "no-store",
      });
      const data = await res.json();

      if (res.ok) {
        setSearchResult(data);
        setLoading(false);
        console.log("data", data);
      } else {
        console.log(data);
        setLoading(false);
      }
    };

    debouncedValue && getSearch();

    // setLoading(false);
  }, [debouncedValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  return (
    <div className="flex flex-col justify-center items-center gap-3">
      <div className="w-full max-w-[350px] relative">
        <div className="relative">
          <input
            type="text"
            className={`w-full bg-gray-700 text-gray-200 p-2 outline-none rounded-md border-b ${
              searchResult
                ? "rounded-b-none border-gray-600"
                : "border-transparent"
            }`}
            placeholder="Search Post"
            name="search"
            autoComplete="off"
            value={title}
            onChange={handleChange}
          />
          {title && (
            <button
              className="absolute inset-y-0 flex items-center right-0 p-1 pr-2 text-gray-400 hover:text-gray-200"
              onClick={() => setTitle("")}
            >
              <ClearIcon />
            </button>
          )}
          {loading && (
            <div className="absolute -bottom-6 w-full">
              <p className="text-center text-sm">Searching...</p>
            </div>
          )}
        </div>
        {searchResult && (
          <div className="bg-gray-700 absolute top-[41px] w-full rounded-b-md overflow-hidden text-sm">
            {searchResult.length > 0 ? (
              <div className="max-h-[265px] overflow-y-auto scrollbar-thin scrollbar-track-gray-600/50 scrollbar-thumb-gray-500/50">
                {searchResult.map((result, i) => (
                  <Link key={i} href={`/post/${result.id}`}>
                    <p key={i} className="p-3 hover:bg-gray-600">
                      {result.title}
                    </p>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="p-3 text-center">No results found</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
