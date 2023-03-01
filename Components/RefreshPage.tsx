"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export function RefreshPage() {
  const router = useRouter();
  const params = useSearchParams();

  useEffect(() => {
    router.refresh();
    console.log("Refresh for dynamic page, temporary fix");
  }, [params]);

  return null;
}
