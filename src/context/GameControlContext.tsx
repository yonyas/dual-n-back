"use client";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useRef,
  useState,
} from "react";
import { InputNumberProps } from "antd";
import { useStimuliContext } from "./StimuliContext";
import { STIMULUS_INTERVAL_MS } from "@/constants/constants";
import { getLocalStorage } from "@/utils/localStorage";

type GameControlContextType = {
  n: number;
  setN: Dispatch<SetStateAction<number>>;
  trialCounter: number;
  setTrialCounter: Dispatch<SetStateAction<number>>;
  gameActive: boolean;
  setGameActive: Dispatch<SetStateAction<boolean>>;
  handleStart: () => void;
  handleStop: () => void;
  handleTrialsChange: InputNumberProps["onChange"];
  stimulusInterval: number;
};

const GameControlContext = createContext<GameControlContextType>(
  {} as GameControlContextType
);

export default function GameControlProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [n, setN] = useState(2);
  const [trials, setTrials] = useState(60);
  const [trialCounter, setTrialCounter] = useState(0);
  const [gameActive, setGameActive] = useState(false);

  const stimulusInterval =
    getLocalStorage<number>("gameSpeed") ?? STIMULUS_INTERVAL_MS;

  const currentPositionIndexTimeoutId = useRef<number | undefined>();
  const timeoutId = useRef<number | undefined>();

  const {
    setCurrentPositionIndex,
    generateStimuli,
    setPositionHistories,
    setSoundHistories,
  } = useStimuliContext();

  const initGame = () => {
    setGameActive(true);
    setPositionHistories([]);
    setSoundHistories([]);
  };

  const stopGame = () => {
    setTrialCounter(0);
    setGameActive(false);
    setCurrentPositionIndex(undefined);
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
      timeoutId.current = undefined;
    }
    if (currentPositionIndexTimeoutId.current) {
      clearTimeout(currentPositionIndexTimeoutId.current);
      currentPositionIndexTimeoutId.current = undefined;
    }
  };

  const handleStart = () => {
    const stimulusInterval =
      getLocalStorage<number>("gameSpeed") ?? STIMULUS_INTERVAL_MS;

    initGame();
    gameLoop(trialCounter, stimulusInterval);
  };

  const gameLoop = (trialCounter: number, stimulusInterval: number) => {
    const newTrialCounter = trialCounter + 1;
    if (newTrialCounter < trials + 1) {
      generateStimuli(n);
      setTrialCounter(newTrialCounter);
      currentPositionIndexTimeoutId.current = window.setTimeout(() => {
        setCurrentPositionIndex(undefined);
      }, stimulusInterval * 1000);

      timeoutId.current = window.setTimeout(() => {
        gameLoop(newTrialCounter, stimulusInterval);
      }, (stimulusInterval + 0.1) * 1000);
    } else {
      stopGame();
    }
  };

  const handleStop = () => {
    stopGame();
  };

  const handleTrialsChange: InputNumberProps["onChange"] = (value) => {
    setTrials(value as number);
  };

  return (
    <GameControlContext.Provider
      value={{
        n,
        setN,
        trialCounter,
        setTrialCounter,
        gameActive,
        setGameActive,
        handleStart,
        handleStop,
        handleTrialsChange,
        stimulusInterval,
      }}
    >
      {children}
    </GameControlContext.Provider>
  );
}

export const useGameControlContext = () => {
  const context = useContext(GameControlContext);

  if (!context) {
    throw new Error(
      "useGameControlContext must be used within a GameControlProvider"
    );
  }
  return context;
};
