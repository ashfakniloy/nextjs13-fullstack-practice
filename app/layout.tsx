import "./globals.css";
import { Inter } from "next/font/google";
import Session from "../Components/Session";
import { Toaster } from "../Components/ToastNotification";
import Log from "../Components/Log";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata = {
  title: "Nextjs 13 Fullstack Practice",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body
        className={`bg-gray-800 text-gray-100 lg:max-w-[1000px] mx-3 lg:mx-auto ${inter.className}`}
      >
        <Log />
        <Toaster
          toastOptions={{
            duration: 3000,
          }}
        />
        <Session>{children}</Session>
      </body>
    </html>
  );
}
