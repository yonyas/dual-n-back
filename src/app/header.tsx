"use client";
import { Switch } from "antd";
import s from "./page.module.css";
import { MoonOutlined, SunOutlined } from "@ant-design/icons";
import { useThemeContext } from "@/context/themeContext";
import Image from "next/image";
import blackLogo from "../../public/nback-logo/png/logo-black.png";
import whiteLogo from "../../public/nback-logo/png/logo-white.png";

export default function Header() {
  const { theme, setTheme } = useThemeContext();

  return (
    <div className={`${s.header} ${theme === "dark" ? s.dark : ""}`}>
      <div className="logo">
        <Image
          src={theme === "dark" ? blackLogo : whiteLogo}
          height={34}
          width={120}
          alt={"nback logo"}
        />
      </div>

      <Switch
        checked={theme === "dark"}
        onChange={(checked, e) => {
          if (e.type === "keydown") return;
          setTheme(checked ? "dark" : "light");
        }}
        checkedChildren={<MoonOutlined />}
        unCheckedChildren={<SunOutlined />}
      />
    </div>
  );
}
