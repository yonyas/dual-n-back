"use client";
import { useEffect, useRef, useState } from "react";
import { Flex } from "antd";
import { randomNum } from "@/utils/randomNum";
import Board from "../board";
import Buttons from "../buttons";
import Panel from "../panel";

export type History = {
  index: number;
  match: boolean;
};

export default function Game() {
  const [n, setN] = useState(2);
  const [trialCounter, setTrialCounter] = useState(0);
  const [gameActive, setGameActive] = useState(false);

  const [visualPressed, setVisualPressed] = useState(false);
  const [visualHistory, setVisualHistory] = useState<History[]>([]);

  const [audioPressed, setAudioPressed] = useState(false);
  const [audioHistory, setAudioHistory] = useState<History[]>([]);

  const timeoutId = useRef<number | undefined>();

  // const trials = n == 2 ? 22 : 2 * n + 17;
  const trials = 7;

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
          match: isVisualCorrect,
        },
      ];
    });

    setAudioHistory((prev) => {
      const isAudioCorrect = prev.at(-n - 1)?.index === randomAudioIndex;
      return [
        ...prev,
        {
          index: randomAudioIndex,
          match: isAudioCorrect,
        },
      ];
    });
  };

  const handleStop = () => {
    initGame();
    clearTimeout(timeoutId.current);
  };

  const handleLeftKeyDown = () => {
    setVisualPressed(true);
  };

  const handleLeftKeyUp = () => {
    setVisualPressed(false);
  };

  const handleRightKeyDown = () => {
    setAudioPressed(true);
  };

  const handleRightKeyUp = () => {
    setAudioPressed(false);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const eventcode = event.code;
      if (eventcode === "ArrowLeft") {
        handleLeftKeyDown();
      } else if (eventcode === "ArrowRight") {
        handleRightKeyDown();
      } else if (eventcode === "KeyQ") {
        handleStop();
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      const eventcode = event.code;
      if (eventcode === "ArrowLeft") {
        handleLeftKeyUp();
      } else if (eventcode === "ArrowRight") {
        handleRightKeyUp();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

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
      <Buttons
        visualHistory={visualHistory}
        visualPressed={visualPressed}
        audioHistory={audioHistory}
        audioPressed={audioPressed}
        onLeftKeyDown={handleLeftKeyDown}
        onLeftKeyUp={handleLeftKeyUp}
        onRightKeyDown={handleRightKeyDown}
        onRightKeyUp={handleRightKeyUp}
      />
    </Flex>
  );
}
