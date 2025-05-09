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
import useIsMobile from "@/hooks/useIsMobile";

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
  showResultModal: boolean;
  setShowResultModal: Dispatch<SetStateAction<boolean>>;
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
  const [showResultModal, setShowResultModal] = useState(false);

  const isMobile = useIsMobile();

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

    if (typeof window !== "undefined") {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
        timeoutId.current = undefined;
      }
      if (currentPositionIndexTimeoutId.current) {
        clearTimeout(currentPositionIndexTimeoutId.current);
        currentPositionIndexTimeoutId.current = undefined;
      }
    }

    if (isMobile) {
      setShowResultModal(true);
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

      if (typeof window !== "undefined") {
        currentPositionIndexTimeoutId.current = window.setTimeout(() => {
          setCurrentPositionIndex(undefined);
        }, stimulusInterval * 1000);

        timeoutId.current = window.setTimeout(() => {
          gameLoop(newTrialCounter, stimulusInterval);
        }, (stimulusInterval + 0.1) * 1000);
      }
    } else {
      stopGame();
      if (isMobile) {
        setShowResultModal(true);
      }
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
        showResultModal,
        setShowResultModal,
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
