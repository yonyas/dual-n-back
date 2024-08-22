import s from "./page.module.css";

import {
  GithubOutlined,
  InstagramOutlined,
  UserOutlined,
} from "@ant-design/icons";

export default function Footer() {
  return (
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
  );
}
