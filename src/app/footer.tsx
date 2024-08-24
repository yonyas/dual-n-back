"use client";
import { Theme, useThemeContext } from "@/context/themeContext";
import s from "./page.module.css";
import {
  GithubOutlined,
  InstagramOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import { AntdIconProps } from "@ant-design/icons/lib/components/AntdIcon";

export default function Footer() {
  const { theme } = useThemeContext();

  return (
    <footer className={`${s.footer} ${theme === "dark" ? s.dark : ""}`}>
      <a
        href="https://github.com/yonyas/dual-n-back"
        target="_blank"
        rel="noopener noreferrer"
      >
        {themeIcon(GithubOutlined, theme)}
      </a>
      <a
        href="https://yonyas.github.io"
        target="_blank"
        rel="noopener noreferrer"
      >
        {themeIcon(UserOutlined, theme)}
      </a>
      <a
        href="https://www.instagram.com/mouseyon"
        target="_blank"
        rel="noopener noreferrer"
      >
        {themeIcon(InstagramOutlined, theme)}
      </a>
    </footer>
  );
}

const themeIcon = (
  Icon: ForwardRefExoticComponent<
    Omit<AntdIconProps, "ref"> & RefAttributes<HTMLSpanElement>
  >,
  theme: Theme
) => {
  return <Icon style={{ color: theme === "dark" ? "white" : "black" }} />;
};
