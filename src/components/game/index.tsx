"use client";
import { useRef, useState } from "react";
import { Flex } from "antd";
import { randomNum } from "@/utils/randomNum";
import Board from "../board";
import Buttons from "../buttons";
import Panel from "../panel";

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

  const handleStart = () => {
    setGameActive(true);

    gameLoop(trialCounter)();
  };

  const gameLoop = (trialCounter: number) => () => {
    const newTrialCounter = trialCounter + 1;
    if (newTrialCounter < trials + 1) {
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

  const handleStop = () => {
    initGame();
    clearTimeout(timeoutId.current);
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
      <Panel
        n={n}
        setN={setN}
        gameActive={gameActive}
        trialCounter={trialCounter}
        trials={trials}
        onStop={handleStop}
        onStart={handleStart}
      />
      <Board visualHistory={visualHistory} />
      <Buttons />
    </Flex>
  );
}
