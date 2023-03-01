"use client";

import { useRouter } from "next/navigation";

function Back() {
  const router = useRouter();

  return (
    <button
      className="text-sm text-gray-400 mb-4"
      onClick={() => router.back()}
    >
      Go Back
    </button>
  );
}

export default Back;
