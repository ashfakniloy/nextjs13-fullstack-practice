"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { toast } from "react-hot-toast";

function SigninPage() {
  const router = useRouter();

  const { status } = useSession();

  // if (status === "authenticated") {
  //   return router.push("/");
  // }

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, name, type } = e.target;
    setUser({
      ...user,
      [name]: type === "number" ? parseInt(value) || value : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log(user);
    const loginToast = toast.loading("Loading...");

    const res = await signIn("credentials", {
      email: user.email,
      password: user.password,
      // callbackUrl: `${window.location.origin}`,
      redirect: false,
    });

    if (res?.ok) {
      toast.dismiss(loginToast);
      toast.success("Login Successfull");
      console.log("success", res);
      router.push("/");
      router.refresh();
    } else {
      toast.dismiss(loginToast);
      toast.error(`${res?.error}`);
      console.log("error", res);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="bg-gray-900/40 rounded-lg px-5 sm:px-10 py-10 w-full max-w-[420px]">
        <p className="text-center text-2xl font-bold text-gray-300">Sign In</p>

        <form className="mt-10 space-y-5 text-gray-400" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label htmlFor="email">Email</label>
            <input
              className="field"
              type="email"
              id="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password">Password</label>
            <input
              className="field"
              type="password"
              id="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              autoComplete="on"
              required
            />
          </div>
          <div className="pt-4">
            <button
              type="submit"
              className=" w-full bg-cyan-800  py-3 rounded text-sm font-bold text-gray-200 active:scale-95 transition duration-200"
            >
              Submit
            </button>
          </div>
        </form>

        <div className="mt-4">
          <Link
            href="/signup"
            className="text-gray-400 text-sm hover:text-gray-300"
          >
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SigninPage;
