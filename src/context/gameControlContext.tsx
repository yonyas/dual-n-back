"use client";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useRef,
  useState,
} from "react";
import { useStimuliContext } from "./stimuliContext";

type GameControlContextType = {
  n: number;
  setN: Dispatch<SetStateAction<number>>;
  trialCounter: number;
  setTrialCounter: Dispatch<SetStateAction<number>>;
  trials: number;
  gameActive: boolean;
  setGameActive: Dispatch<SetStateAction<boolean>>;
  handleStart: () => void;
  handleStop: () => void;
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
  const [trialCounter, setTrialCounter] = useState(0);
  const [gameActive, setGameActive] = useState(false);

  const currentPositionIndexTimeoutId = useRef<number | undefined>();
  const timeoutId = useRef<number | undefined>();

  const trials = n == 2 ? 22 : 2 * n + 17;

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
    initGame();
    gameLoop(trialCounter)();
  };

  const gameLoop = (trialCounter: number) => () => {
    const newTrialCounter = trialCounter + 1;
    if (newTrialCounter < trials + 1) {
      generateStimuli(n);
      setTrialCounter(newTrialCounter);
      currentPositionIndexTimeoutId.current = window.setTimeout(
        () => setCurrentPositionIndex(undefined),
        2500
      );
      timeoutId.current = window.setTimeout(gameLoop(newTrialCounter), 2600);
    } else {
      stopGame();
    }
  };

  const handleStop = () => {
    stopGame();
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
        trials,
        handleStart,
        handleStop,
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
