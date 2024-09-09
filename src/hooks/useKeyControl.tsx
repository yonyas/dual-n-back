"use client";
import { History, Response } from "@/components/Game";
import { useGameControlContext } from "@/context/GameControlContext";
import { useStimuliContext } from "@/context/StimuliContext";
import { Dispatch, SetStateAction, useEffect } from "react";

export default function useKeyControl() {
  const {
    setIsPositionPressed,
    setPositionHistories,
    setIsSoundPressed,
    setSoundHistories,
  } = useStimuliContext();

  const { handleStop } = useGameControlContext();

  const addMyResponseToHistory = (
    myResponse: Response,
    setHistory: Dispatch<SetStateAction<History[]>>
  ) => {
    setHistory((prev) => {
      const lastItem = prev.at(-1);
      return [
        ...prev.slice(0, -1),
        {
          ...lastItem,
          myResponse,
        },
      ] as History[];
    });
  };

  const handleLeftKeyDown = () => {
    setIsPositionPressed(true);
    addMyResponseToHistory("response", setPositionHistories);
  };

  const handleLeftKeyUp = () => {
    setIsPositionPressed(false);
  };

  const handleRightKeyDown = () => {
    setIsSoundPressed(true);
    addMyResponseToHistory("response", setSoundHistories);
  };

  const handleRightKeyUp = () => {
    setIsSoundPressed(false);
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

  return {
    handleLeftKeyDown,
    handleLeftKeyUp,
    handleRightKeyDown,
    handleRightKeyUp,
  };
}
