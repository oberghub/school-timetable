import "./globals.css";
import type { Metadata } from "next";
import { Inter, Kanit } from "next/font/google";
import Navbar from "@/components/templates/Navbar";
import Menubar from "@/components/templates/Menubar";

// const inter = Inter({ subsets: ["latin"] });
const kanit = Kanit({ subsets: ['thai'], weight : '300' });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`overflow-scroll xl:overflow-x-hidden ${kanit.className}`}>
        <Navbar />
        <div className="flex justify-center w-[1280px] xl:w-full h-auto">
          <Menubar />
          {/* Content */}
          <div className="w-[1190px] h-auto px-16 py-8">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
