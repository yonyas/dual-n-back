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
                    borderColor: "var(--border-color)",
                    headerSplitColor: "var(--border-color)",
                    headerBg: "var(--game-header-color)",
                  }
                : {},
          },
          token: {
            motion: false,
            ...(theme === "dark"
              ? {
                  colorPrimary: "#1f1f1f",
                  colorBgBase: "var(--background-dark-color)",
                  colorTextBase: "var(--dark-text-color)",
                  colorBorder: "var(--game-border-color)",
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
