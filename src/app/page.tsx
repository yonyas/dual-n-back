import { Flex } from "antd";
import "./global.css";
import Game from "@/components/game";

export default function Home() {
  return (
    <main style={{ margin: "20px" }}>
      <Flex justify="center">
        <Game />
      </Flex>
    </main>
  );
}
