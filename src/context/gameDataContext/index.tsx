"use client";
import { History } from "@/components/game";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

type GameDataContextType = {
  visualHistories: History[];
  setVisualHistories: Dispatch<SetStateAction<History[]>>;
  audioHistories: History[];
  setAudioHistories: Dispatch<SetStateAction<History[]>>;
};

const GameDataContext = createContext<GameDataContextType>(
  {} as GameDataContextType
);

export default function GameDataProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [visualHistories, setVisualHistories] = useState<History[]>([]);
  const [audioHistories, setAudioHistories] = useState<History[]>([]);

  return (
    <GameDataContext.Provider
      value={{
        visualHistories,
        setVisualHistories,
        audioHistories,
        setAudioHistories,
      }}
    >
      {children}
    </GameDataContext.Provider>
  );
}

export const useGameDataContext = () => {
  const context = useContext(GameDataContext);

  if (!context) {
    throw new Error("useGameDataContext must be used within a GameDataContext");
  }
  return context;
};
