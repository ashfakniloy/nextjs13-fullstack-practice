import Navbar from "../../Components/Navbar";

function Postlayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* @ts-expect-error Server Component */}
      <Navbar />

      <div className="my-5">{children}</div>
    </>
  );
}

export default Postlayout;
