"use client";
import { ConfigProvider, Flex } from "antd";
import "./global.css";
import Game from "@/components/game";
import Result from "@/components/result";
import GameControlProvider from "@/context/gameControlContext";
import StimuliProvider from "@/context/stimuliContext";

export default function Home() {
  return (
    <main style={{ margin: "20px", height: "100%" }}>
      <ConfigProvider
        theme={{
          components: {
            Button: {
              lineWidthFocus: 0,
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
              justify="space-around"
              align="center"
              style={{ height: "100%" }}
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
