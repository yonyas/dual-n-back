"use client";
import { ConfigProvider, Flex } from "antd";
import "./global.css";
import Game from "@/components/Game";
import Result from "@/components/Result";
import GameControlProvider from "@/context/GameControlContext";
import StimuliProvider from "@/context/StimuliContext";
import s from "./page.module.css";
import { useThemeContext } from "@/context/ThemeContext";

export default function Home() {
  const { theme } = useThemeContext();

  return (
    <main
      style={{ padding: "40px", flex: 1 }}
      className={theme === "dark" ? s.dark : s.light}
    >
      <ConfigProvider
        theme={{
          components: {
            Button: {
              lineWidthFocus: 0,
            },
            InputNumber: {
              controlWidth: 65,
            },
            Table:
              theme === "dark"
                ? {
                    borderColor: "#a4a4a4",
                    headerSplitColor: "#a4a4a4",
                    headerBg: "#4b4b4b",
                  }
                : {},
          },
          token: {
            motion: false,
            ...(theme === "dark"
              ? {
                  colorPrimary: "#1f1f1f",
                  colorBgBase: "#121212",
                  colorTextBase: "#ffffff",
                  colorBorder: "#a4a4a4",
                }
              : {}),
          },
        }}
      >
        <StimuliProvider>
          <GameControlProvider>
            <Flex align="center" justify="space-around" className={s.container}>
              <Game />
              <Result />
            </Flex>
          </GameControlProvider>
        </StimuliProvider>
      </ConfigProvider>
    </main>
  );
}
