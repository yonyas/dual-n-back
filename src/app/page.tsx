"use client";
import { Flex } from "antd";
import "./global.css";
import Game from "@/components/game";
import Result from "@/components/result";
import GameDataProvider from "@/context/gameDataContext";

export default function Home() {
  return (
    <main style={{ margin: "20px" }}>
      <GameDataProvider>
        <Flex justify="space-around" align="center">
          <Game />
          <Result />
        </Flex>
      </GameDataProvider>
    </main>
  );
}
