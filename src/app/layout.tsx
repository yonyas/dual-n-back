import type { Metadata } from "next";
import { Inter } from "next/font/google";
import s from "./page.module.css";
import {
  GithubOutlined,
  InstagramOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Image } from "antd";
import { AntdRegistry } from "@ant-design/nextjs-registry";

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
          <header className={s.header}>
            <div className="logo">
              <a href="#">
                <Image
                  src={"/Logo high-res.png"}
                  height={60}
                  preview={false}
                  alt={"nback logo"}
                />
              </a>
            </div>
            {/* TODO: login 기능은 나중에 개발 */}
            {/* <Button>Sign Up</Button> */}
            {/* <Button>Log In</Button> */}
          </header>

          {children}

          <footer className={s.footer}>
            <a
              href="https://github.com/yonyas/dual-n-back"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GithubOutlined />
            </a>
            <a
              href="https://yonyas.github.io"
              target="_blank"
              rel="noopener noreferrer"
            >
              <UserOutlined />
            </a>
            <a
              href="https://www.instagram.com/mouseyon"
              target="_blank"
              rel="noopener noreferrer"
            >
              <InstagramOutlined />
            </a>
          </footer>
        </AntdRegistry>
      </body>
    </html>
  );
}
