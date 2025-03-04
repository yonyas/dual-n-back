"use client";
import Image from "next/image";
import { Flex, Switch } from "antd";
import s from "./page.module.css";
import { MoonOutlined, SettingFilled, SunOutlined } from "@ant-design/icons";
import { useThemeContext } from "@/context/ThemeContext";
import { useModalContext } from "@/context/ModalContext";
import blackLogo from "../../public/nback-logo/png/logo-black.png";
import whiteLogo from "../../public/nback-logo/png/logo-white.png";
import { ThemeButton } from "@/components/ThemeIcon";

export default function Header() {
  const { theme, changeTheme } = useThemeContext();
  const { openModal } = useModalContext();

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

        <ThemeButton
          shape="circle"
          ghost={true}
          icon={SettingFilled}
          onClick={openModal}
        />
      </Flex>
    </div>
  );
}
