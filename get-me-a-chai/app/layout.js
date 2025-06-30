import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import SessionWrapper from "@/app/components/SessionWrapper";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Get-Me-A-Chai : fund your projects with chai",
  description: "this website is a crowdfunding platform for creators",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className="bg-[radial-gradient(#e5e7eb_1px,transparent_1px)]
  [background-size:16px_16px]"
      >
        <SessionWrapper>
        <Navbar />
        <div
          className="min-h-screen bg-[radial-gradient(#e5e7eb_1px,transparent_1px)]
  [background-size:16px_16px] text-white "
        >
          {children}
        </div>
        <Footer />
        </SessionWrapper>
      </body>
    </html>
  );
}
