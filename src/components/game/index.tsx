"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import { Button, Flex, Typography } from "antd";
import {
  CaretDownOutlined,
  CaretUpOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { sleep } from "@/utils/sleep";
import s from "./styles.module.css";

export default function Game() {
  const [n, setN] = useState(2);
  const [trialCounter, setTrialCounter] = useState(0);

  const [inGame, setInGame] = useState(false);
  const inGameRef = useRef(false);

  // const trials = n == 2 ? 22 : 2 * n + 17;
  const trials = 3;

  const handleStartClick = async () => {
    setInGame(true);
    inGameRef.current = true;

    for (let i = 0; i < trials; i++) {
      if (!inGameRef.current) {
        break;
      }
      setTrialCounter((prev) => prev + 1);

      const div = document.createElement("div");
      div.className = s["box"];

      await sleep(100);

      const randomIndex = Math.floor(Math.random() * 9) + 1;
      const tdByRadomIndex = document.getElementById(randomIndex.toString());

      tdByRadomIndex?.appendChild(div);
      await sleep(1000);
      if (tdByRadomIndex?.contains(div)) tdByRadomIndex?.removeChild(div);

      if (i == trials - 1) {
        resetGameState();
      }
    }
  };

  const handleStopClick = () => {
    setInGame(false);
    resetGameState();
    inGameRef.current = false;

    const boxes = document.querySelectorAll(`.${s["box"]}`);
    boxes.forEach((box) => box.remove());
  };

  const resetGameState = () => {
    setTrialCounter(0);
    setInGame(false);
  };

  const incrementN = () => {
    if (n < 9) setN(n + 1);
  };

  const decrementN = () => {
    if (n > 1) setN(n - 1);
  };

  return (
    <Flex vertical gap={20}>
      <Flex justify="space-between" align="center" gap={20}>
        <Flex align="center" gap={8}>
          <Button
            icon={<CaretDownOutlined />}
            onClick={decrementN}
            disabled={inGame}
          ></Button>
          <Typography>{n}</Typography>
          <Button
            icon={<CaretUpOutlined />}
            onClick={incrementN}
            disabled={inGame}
          ></Button>
        </Flex>
        <Typography>{`${trialCounter} / ${trials}`}</Typography>
        <Button onClick={inGame ? handleStopClick : handleStartClick}>
          {inGame ? "끝내기" : "시작"}
        </Button>
        {/* TODO: setting 기능 나중에 개발 */}
        {/* <Button icon={<SettingOutlined />}></Button> */}
      </Flex>

      <div className="table-wrapper">
        <table className={s["table"]}>
          <tbody>
            <tr>
              <td id={"1"}></td>
              <td id={"2"}></td>
              <td id={"3"}></td>
            </tr>
            <tr>
              <td id={"4"}></td>
              <td id={"5"}></td>
              <td id={"6"}></td>
            </tr>
            <tr>
              <td id={"7"}></td>
              <td id={"8"}></td>
              <td id={"9"}></td>
            </tr>
          </tbody>
        </table>
      </div>

      <Flex justify="center" gap={8}>
        <Button
          icon={
            <Image
              src="/arrow-left.png"
              width={20}
              height={20}
              alt="left arrow"
              style={{ verticalAlign: "middle" }}
            />
          }
        >
          Position
        </Button>

        <Button
          icon={
            <Image
              src="/arrow-right.png"
              width={20}
              height={20}
              alt="right arrow"
              style={{ verticalAlign: "middle" }}
            />
          }
          iconPosition="end"
        >
          Sound
        </Button>
      </Flex>
    </Flex>
  );
}
