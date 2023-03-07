"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

function SignupPage() {
  const router = useRouter();

  const [user, setUser] = useState({
    username: "",
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

    const signupToast = toast.loading("Loading...");

    // const url = "/api/signup-old"
    const url = "/api/signup";

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const data = await res.json();

    if (res.ok) {
      toast.dismiss(signupToast);
      toast.success("Account Created SuccessFully");
      setTimeout(() => toast.success("Log in to continue"), 600);
      console.log("success", data);
      router.push("/signin");
    } else {
      toast.dismiss(signupToast);
      toast.error(data.error, {
        id: "signup error",
      });
      console.log("error", data);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="bg-gray-800/40 px-5 sm:px-10 py-10 w-full max-w-[420px] rounded-lg">
        <p className="text-center text-2xl font-bold text-gray-300">
          Create an Account
        </p>

        <form className="mt-10 space-y-5 text-gray-400" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label htmlFor="username">Username</label>
            <input
              className="field"
              type="text"
              id="username"
              name="username"
              value={user.username}
              onChange={handleChange}
              required
            />
          </div>
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
          <div className="pt-4 pb-2">
            <button
              type="submit"
              className=" w-full bg-cyan-900  py-3 rounded text-sm font-bold text-gray-200 active:scale-95 transition duration-200"
            >
              Submit
            </button>
          </div>
        </form>

        <div className="mt-4">
          <Link
            href="/signin"
            className="text-gray-400 text-sm hover:text-gray-300"
          >
            Already have an account? Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
