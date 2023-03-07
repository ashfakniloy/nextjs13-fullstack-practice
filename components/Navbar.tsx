import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../pages/api/auth/[...nextauth]";
import Logout from "./Logout";

async function Navbar() {
  const session = await getServerSession(authOptions);

  // console.log("session", session?.user);

  return (
    <div className="flex flex-col lg:flex-row justify-between items-center py-4 border-b border-gray-700">
      <div className="text-3xl font-bold tracking-widest">
        <Link href="/">logo</Link>
      </div>

      {session?.user ? (
        <div className="mt-3 lg:mt-0 flex flex-col lg:flex-row items-center gap-2 lg:gap-6 text-sm font-medium">
          <p className="text-gray-400 lg:pr-8">User: {session.user.username}</p>

          <div className="space-x-6">
            <Link href="/">Home</Link>

            <Link href="/add-post">Add Post</Link>
            <Link href="/dashboard">Dashboard</Link>

            <Logout />
          </div>
        </div>
      ) : (
        <div className="mt-5 lg:mt-0 text-sm font-medium space-x-7">
          <Link href="/signup">
            <button className="bg-green-900 px-2 py-1.5 rounded">Signup</button>
          </Link>
          <Link href="/signin">
            <button className="bg-blue-900 px-2 py-1.5 rounded">Login</button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Navbar;
