"use client";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { History } from "@/components/Game";
import { randomNum } from "@/utils/randomNum";
import { getSounds } from "@/utils/sounds";

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

    const sound = sounds?.[randomSoundIndex];
    if (sound) {
      sound.currentTime = 0;

      const playPromise = sound.play();

      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.error("오디오 재생 실패:", error);
          setTimeout(() => {
            sound.currentTime = 0;
            sound.play().catch((e) => console.error("재시도 실패:", e));
          }, 100);
        });
      }
    } else {
      console.error("사운드 객체를 찾을 수 없음:", randomSoundIndex);
    }

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
