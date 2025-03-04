import type { Metadata } from "next";
import { Inter } from "next/font/google";
import s from "./page.module.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import ThemeProvider from "@/context/ThemeContext";
import { ModalProvider } from "@/context/ModalContext";
import Main from "./(main)/index";

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
            <ModalProvider>
              <Main>{children}</Main>
            </ModalProvider>
          </ThemeProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
