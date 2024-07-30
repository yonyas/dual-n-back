"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Button, Flex, Typography } from "antd";
import {
  CaretDownOutlined,
  CaretUpOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import s from "./styles.module.css";
import { randomNum } from "@/utils/randomNum";

export default function Game() {
  const [n, setN] = useState(2);
  const [trialCounter, setTrialCounter] = useState(0);
  const [gameActive, setGameActive] = useState(false);

  const [isVisualPressed, setIsVisualPressed] = useState(false);
  const [visualHistory, setVisualHistory] = useState<
    {
      index: number;
      correct: boolean;
    }[]
  >([]);
  console.log("visualHistory: ", visualHistory);

  const [isAudioPressed, setIsAudioPressed] = useState(false);
  const [audioHistory, setAudioHistory] = useState<
    {
      index: number;
      correct: boolean;
    }[]
  >([]);

  const timeoutId = useRef<number | undefined>();

  // const trials = n == 2 ? 22 : 2 * n + 17;
  const trials = 4;

  const initGame = () => {
    setTrialCounter(0);
    setGameActive(false);
    setVisualHistory([]);
    setAudioHistory([]);
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }
  };

  const handleStartClick = () => {
    setGameActive(true);

    timeoutId.current = window.setTimeout(gameLoop(trialCounter), 1500);
  };

  const gameLoop = (trialCounter: number) => () => {
    const newTrialCounter = trialCounter + 1;
    if (newTrialCounter < trials) {
      generateStimuli();
      setTrialCounter(newTrialCounter);
      timeoutId.current = window.setTimeout(gameLoop(newTrialCounter), 1500);
    } else {
      initGame();
    }
  };

  const generateStimuli = () => {
    const randomVisualIndex = randomNum();
    const randomAudioIndex = randomNum();

    setVisualHistory((prev) => {
      const isVisualCorrect = prev.at(-n - 1)?.index === randomVisualIndex;
      return [
        ...prev,
        {
          index: randomVisualIndex,
          correct: isVisualCorrect,
        },
      ];
    });

    setAudioHistory((prev) => {
      const isAudioCorrect = prev.at(-n - 1)?.index === randomAudioIndex;
      return [
        ...prev,
        {
          index: randomAudioIndex,
          correct: isAudioCorrect,
        },
      ];
    });
  };

  const handleStopClick = () => {
    initGame();
    clearTimeout(timeoutId.current);
  };

  const incrementN = () => {
    if (n < 9) setN(n + 1);
  };

  const decrementN = () => {
    if (n > 1) setN(n - 1);
  };

  const handleLeftClick = () => {};

  // useEffect(() => {
  //   const handleKeyDown = (event: KeyboardEvent) => {
  //     if (event.key === "ArrowLeft") {
  //       handleLeftClick();
  //     } else if (event.key === "ArrowRight") {
  //       // handleRightClick();
  //     }
  //   };

  //   window.addEventListener("keydown", handleKeyDown);
  //   return () => {
  //     window.removeEventListener("keydown", handleKeyDown);
  //   };
  // }, []);

  return (
    <Flex vertical gap={20}>
      <Flex justify="space-between" align="center" gap={20}>
        <Flex align="center" gap={8}>
          <Button
            icon={<CaretDownOutlined />}
            onClick={decrementN}
            disabled={gameActive}
          ></Button>
          <Typography>{n}</Typography>
          <Button
            icon={<CaretUpOutlined />}
            onClick={incrementN}
            disabled={gameActive}
          ></Button>
        </Flex>
        <Typography>{`${trialCounter} / ${trials}`}</Typography>
        <Button onClick={gameActive ? handleStopClick : handleStartClick}>
          {gameActive ? "끝내기" : "시작"}
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
          onMouseDown={handleLeftClick}
          onMouseUp={() => {}}
          disabled={!gameActive}
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
          disabled={!gameActive}
        >
          Sound
        </Button>
      </Flex>
    </Flex>
  );
}
