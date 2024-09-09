import type { Metadata } from "next";
import { Inter } from "next/font/google";
import s from "./page.module.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import Header from "./Header";
import Footer from "./Footer";
import ThemeProvider from "@/context/ThemeContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dual N Back",
  description: "Cognitive training exercise to improve memory ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${s.body}`}>
        <AntdRegistry>
          <ThemeProvider>
            <Header />

            <div style={{ flex: 1, display: "flex" }}>{children}</div>

            <Footer />
          </ThemeProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
