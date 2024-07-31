"use client";
import { useEffect, useMemo, useRef, useState } from "react";
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

  const [currentVisualIndex, setCurrentVisualIndex] = useState<number>();

  const [audioPressed, setAudioPressed] = useState(false);
  const [audioHistory, setAudioHistory] = useState<History[]>([]);

  const timeoutId = useRef<number | undefined>();

  const sounds: {
    [key: number]: HTMLAudioElement;
  } = useMemo(() => {
    return {
      1: new Audio("/sound/H.wav"),
      2: new Audio("/sound/J.wav"),
      3: new Audio("/sound/K.wav"),
      4: new Audio("/sound/L.wav"),
      5: new Audio("/sound/Q.wav"),
      6: new Audio("/sound/R.wav"),
      7: new Audio("/sound/S.wav"),
      8: new Audio("/sound/A.wav"),
      9: new Audio("/sound/G.wav"),
    };
  }, []);

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
      window.setTimeout(() => setCurrentVisualIndex(undefined), 1400);
      timeoutId.current = window.setTimeout(gameLoop(newTrialCounter), 1500);
    } else {
      initGame();
    }
  };

  const generateStimuli = () => {
    const randomVisualIndex = randomNum();
    const randomAudioIndex = randomNum();

    setVisualHistory((prev) => {
      const isVisualMatch = prev.at(-n)?.index === randomVisualIndex;
      return [
        ...prev,
        {
          index: randomVisualIndex,
          match: isVisualMatch,
        },
      ];
    });
    setCurrentVisualIndex(randomVisualIndex);

    setAudioHistory((prev) => {
      const isAudioMatch = prev.at(-n)?.index === randomAudioIndex;
      return [
        ...prev,
        {
          index: randomAudioIndex,
          match: isAudioMatch,
        },
      ];
    });
    sounds[randomAudioIndex].play();
  };

  const handleStop = () => {
    initGame();
    clearTimeout(timeoutId.current);
    setCurrentVisualIndex(undefined);
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
      <Board currentVisualIndex={currentVisualIndex} />
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
