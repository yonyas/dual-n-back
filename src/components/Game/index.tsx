"use client";
import { Flex } from "antd";
import Board from "../Board";
import Buttons from "../Buttons";
import Panel from "../Panel";

export type Response = "response" | "no-response";

export type History = {
  index: number;
  match: boolean;
  myResponse: Response;
};

export default function Game() {
  return (
    <Flex vertical gap={20}>
      <Panel />
      <Board />
      <Buttons />
    </Flex>
  );
}
