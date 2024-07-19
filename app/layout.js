import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./Navbar/page";
 

export const metadata = {
  title: "Bazil Suhail",
  description: "Portfolio of Bazil Suhail",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
