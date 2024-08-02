import { Button, Flex } from "antd";
import Image from "next/image";
import { useStimuliContext } from "@/context/stimuliContext";
import useKeyControl from "@/hooks/useKeyControl";

export default function Buttons() {
  const {
    positionHistories,
    isPositionPressed,
    soundHistories,
    isSoundPressed,
  } = useStimuliContext();

  const {
    handleLeftKeyDown,
    handleLeftKeyUp,
    handleRightKeyDown,
    handleRightKeyUp,
  } = useKeyControl();

  const positionMatch = positionHistories?.at(-1)?.match;
  const positionBackground = isPositionPressed
    ? positionMatch
      ? "green"
      : "red"
    : "white";

  const soundMatch = soundHistories?.at(-1)?.match;
  const soundBackground = isSoundPressed
    ? soundMatch
      ? "green"
      : "red"
    : "white";

  return (
    <Flex justify="center" gap={8}>
      <Button
        icon={
          <Image
            src="/arrow-left.png"
            width={20}
            height={20}
            alt="left arrow"
            style={{ verticalAlign: "middle" }}
          />
        }
        style={{ backgroundColor: positionBackground }}
        onMouseDown={handleLeftKeyDown}
        onMouseUp={handleLeftKeyUp}
      >
        Position
      </Button>

      <Button
        icon={
          <Image
            src="/arrow-right.png"
            width={20}
            height={20}
            alt="right arrow"
            style={{ verticalAlign: "middle" }}
          />
        }
        style={{ backgroundColor: soundBackground }}
        iconPosition="end"
        onMouseDown={handleRightKeyDown}
        onMouseUp={handleRightKeyUp}
      >
        Sound
      </Button>
    </Flex>
  );
}
