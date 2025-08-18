import "../styles/globals.css";
import { type Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./Providers";

export const metadata: Metadata = {
  title: "GridFlex Admin Portal",
  description: "Built by Momas/Epail MIC",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
