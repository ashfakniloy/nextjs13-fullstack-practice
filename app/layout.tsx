import "./globals.css";
import { Inter } from "next/font/google";
import Session from "../components/Session";
import { Toaster } from "../components/ToastNotification";
import Log from "../components/Log";
import { Analytics } from "@vercel/analytics/react";

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
        className={`bg-[#111111]  text-gray-100 lg:max-w-[1000px] mx-3 lg:mx-auto ${inter.className}`}
      >
        <Toaster
          toastOptions={{
            duration: 3000,
          }}
        />
        <Session>{children}</Session>
        <Analytics />
        <Log />
      </body>
    </html>
  );
}
