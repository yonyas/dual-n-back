"use client";
import { History } from "@/components/game";
import { randomNum } from "@/utils/randomNum";
import { getSounds } from "@/utils/sounds";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

type StimuliContextType = {
  isPositionPressed: boolean;
  setIsPositionPressed: Dispatch<SetStateAction<boolean>>;
  currentPositionIndex: number | undefined;
  setCurrentPositionIndex: Dispatch<SetStateAction<number | undefined>>;
  isSoundPressed: boolean;
  setIsSoundPressed: Dispatch<SetStateAction<boolean>>;
  positionHistories: History[];
  setPositionHistories: Dispatch<SetStateAction<History[]>>;
  soundHistories: History[];
  setSoundHistories: Dispatch<SetStateAction<History[]>>;
  generateStimuli: (n: number) => void;
};

const StimuliContext = createContext<StimuliContextType>(
  {} as StimuliContextType
);

export default function StimuliProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isPositionPressed, setIsPositionPressed] = useState(false);
  const [currentPositionIndex, setCurrentPositionIndex] = useState<number>();

  const [isSoundPressed, setIsSoundPressed] = useState(false);

  const [positionHistories, setPositionHistories] = useState<History[]>([]);
  const [soundHistories, setSoundHistories] = useState<History[]>([]);

  const sounds = getSounds();

  const generateStimuli = (n: number) => {
    const randomPositionIndex = randomNum();
    const randomSoundIndex = randomNum();

    setPositionHistories((prev) => {
      const isPositionMatch = prev.at(-n)?.index === randomPositionIndex;
      return [
        ...prev,
        {
          index: randomPositionIndex,
          match: isPositionMatch,
          myResponse: "no-response",
        },
      ];
    });
    setCurrentPositionIndex(randomPositionIndex);

    setSoundHistories((prev) => {
      const isSoundMatch = prev.at(-n)?.index === randomSoundIndex;
      return [
        ...prev,
        {
          index: randomSoundIndex,
          match: isSoundMatch,
          myResponse: "no-response",
        },
      ];
    });
    sounds?.[randomSoundIndex]?.play();
  };

  return (
    <StimuliContext.Provider
      value={{
        isPositionPressed,
        setIsPositionPressed,
        currentPositionIndex,
        setCurrentPositionIndex,
        isSoundPressed,
        setIsSoundPressed,
        positionHistories,
        setPositionHistories,
        soundHistories,
        setSoundHistories,
        generateStimuli,
      }}
    >
      {children}
    </StimuliContext.Provider>
  );
}

export const useStimuliContext = () => {
  const context = useContext(StimuliContext);

  if (!context) {
    throw new Error("useStimuliContext must be used within a StimuliProvider");
  }
  return context;
};
