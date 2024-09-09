"use client";
import { useThemeContext } from "@/context/ThemeContext";
import s from "./page.module.css";
import {
  GithubOutlined,
  InstagramOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { ThemeIcon } from "@/components/ThemeIcon";

export default function Footer() {
  const { theme } = useThemeContext();

  return (
    <footer className={`${s.footer} ${theme === "dark" ? s.dark : ""}`}>
      <a
        href="https://github.com/yonyas/dual-n-back"
        target="_blank"
        rel="noopener noreferrer"
      >
        <ThemeIcon icon={GithubOutlined} />
      </a>
      <a
        href="https://yonyas.github.io"
        target="_blank"
        rel="noopener noreferrer"
      >
        <ThemeIcon icon={UserOutlined} />
      </a>
      <a
        href="https://www.instagram.com/mouseyon"
        target="_blank"
        rel="noopener noreferrer"
      >
        <ThemeIcon icon={InstagramOutlined} />
      </a>
    </footer>
  );
}
