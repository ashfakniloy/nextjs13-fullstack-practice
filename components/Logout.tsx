"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

function Logout() {
  const router = useRouter();

  const handleLogout = () => {
    signOut({
      // redirect: false,
      callbackUrl: `${window.location.origin}`,
    });

    // router.refresh();
    // router.push("/signin");
  };

  return (
    <button
      className="bg-red-800 text-sm font-bold rounded px-2 py-1.5"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
}

export default Logout;
