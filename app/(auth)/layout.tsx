import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";
import { authOptions } from "../../pages/api/auth/[...nextauth]";

async function UserLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  // const router = useRouter();

  // console.log(session);

  if (session) {
    redirect("/");
    //  notFound();
  }

  return <div className="">{children}</div>;
}

export default UserLayout;
