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
  positionHistories: History[];
  setPositionHistories: Dispatch<SetStateAction<History[]>>;
  soundHistories: History[];
  setSoundHistories: Dispatch<SetStateAction<History[]>>;
};

const GameDataContext = createContext<GameDataContextType>(
  {} as GameDataContextType
);

export default function GameDataProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [positionHistories, setPositionHistories] = useState<History[]>([]);
  const [soundHistories, setSoundHistories] = useState<History[]>([]);

  return (
    <GameDataContext.Provider
      value={{
        positionHistories,
        setPositionHistories,
        soundHistories,
        setSoundHistories,
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
