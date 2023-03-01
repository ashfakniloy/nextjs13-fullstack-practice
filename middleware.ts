export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    // "/",
    "/dashboard",
    "/add-post",
    "/edit-post",
    // "/post/:path*",
    // "/user/:path*",
  ],
};
