"use client";
import { Flex } from "antd";
import Board from "../board";
import Buttons from "../buttons";
import Panel from "../panel";

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
