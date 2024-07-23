import type { Metadata } from "next";
import { Inter } from "next/font/google";
import s from "./page.module.css";
import {
  GithubOutlined,
  InstagramOutlined,
  UserOutlined,
} from "@ant-design/icons";

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
        {children}
        <div className={s.footer}>
          <a
            href="https://github.com/yonyas"
            target="_blank"
            rel="noopener noreferrer"
          >
            <UserOutlined />
          </a>
          <a
            href="https://yonyas.github.io"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GithubOutlined />
          </a>
          <a
            href="https://www.instagram.com/mouseyon"
            target="_blank"
            rel="noopener noreferrer"
          >
            <InstagramOutlined />
          </a>
        </div>
      </body>
    </html>
  );
}
