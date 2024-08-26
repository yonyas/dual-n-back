"use client";
import { Flex, Switch } from "antd";
import s from "./page.module.css";
import { MoonOutlined, SettingFilled, SunOutlined } from "@ant-design/icons";
import { useThemeContext } from "@/context/themeContext";
import Image from "next/image";
import blackLogo from "../../public/nback-logo/png/logo-black.png";
import whiteLogo from "../../public/nback-logo/png/logo-white.png";
import { ThemeButton } from "@/components/themeIcon";

export default function Header() {
  const { theme, changeTheme } = useThemeContext();

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

      <Flex gap={12} align="center">
        <Switch
          defaultChecked={theme === "dark"}
          checked={theme === "dark"}
          onChange={(checked, e) => {
            if (e.type === "keydown") return;
            changeTheme(checked ? "dark" : "light");
          }}
          checkedChildren={<MoonOutlined />}
          unCheckedChildren={<SunOutlined />}
        />

        <ThemeButton shape="circle" ghost={true} icon={SettingFilled} />
      </Flex>
    </div>
  );
}
