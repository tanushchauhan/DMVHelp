import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "DMVHelp",
  description: "Get your Texas DMV appointments today",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      {/* the base background color is set here */}
      <body className={`${inter.className} bg-[#050711]`}>{children}</body>
    </html>
  );
}
