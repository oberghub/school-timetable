import "./globals.css";
import type { Metadata } from "next";
import { Inter, Kanit, Noto_Sans_Thai, Sarabun } from "next/font/google";
import Navbar from "@/components/templates/Navbar";
import Menubar from "@/components/templates/Menubar";
import Content from "@/components/templates/Content";

// const inter = Inter({ subsets: ["latin"] });
// const kanit = Kanit({ subsets: ['thai'], weight : '300' });
const font = Sarabun({ subsets: ["thai"], weight: "400" });
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
      <body
        className={`overflow-scroll xl:overflow-x-hidden ${font.className}`}
      >
        <Navbar />
        <main className="flex justify-center w-[1280px] xl:w-full h-auto">
          {/* Content */}
          <Content children={children} />
        </main>
      </body>
    </html>
  );
}
