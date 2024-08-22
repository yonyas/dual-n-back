import { Image } from "antd";
import s from "./page.module.css";

export default function Header() {
  return (
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
    </header>
  );
}
