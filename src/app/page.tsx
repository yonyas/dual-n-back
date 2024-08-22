"use client";
import { ConfigProvider, Flex } from "antd";
import "./global.css";
import Game from "@/components/game";
import Result from "@/components/result";
import GameControlProvider from "@/context/gameControlContext";
import StimuliProvider from "@/context/stimuliContext";
import s from "./page.module.css";

export default function Home() {
  return (
    <main style={{ padding: "20px", flex: 1 }}>
      <ConfigProvider
        theme={{
          components: {
            Button: {
              lineWidthFocus: 0,
            },
            InputNumber: {
              controlWidth: 65,
            },
          },
          token: {
            motion: false,
          },
        }}
      >
        <StimuliProvider>
          <GameControlProvider>
            <Flex
              align="center"
              justify="space-around"
              className={s["container"]}
            >
              <Game />
              <Result />
            </Flex>
          </GameControlProvider>
        </StimuliProvider>
      </ConfigProvider>
    </main>
  );
}
