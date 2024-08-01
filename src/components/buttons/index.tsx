import { Button, Flex } from "antd";
import Image from "next/image";
import { History } from "../game";

export default function Buttons({
  positionHistories,
  isPositionPressed,
  soundHistories,
  soundPressed,
  onLeftKeyDown,
  onRightKeyDown,
  onLeftKeyUp,
  onRightKeyUp,
}: {
  positionHistories: History[];
  isPositionPressed: boolean;
  soundHistories: History[];
  soundPressed: boolean;
  onLeftKeyDown: () => void;
  onRightKeyDown: () => void;
  onLeftKeyUp: () => void;
  onRightKeyUp: () => void;
}) {
  const positionMatch = positionHistories?.at(-1)?.match;
  const positionBackground = isPositionPressed
    ? positionMatch
      ? "green"
      : "red"
    : "white";

  const soundMatch = soundHistories?.at(-1)?.match;
  const soundBackground = soundPressed
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
        onMouseDown={onLeftKeyDown}
        onMouseUp={onLeftKeyUp}
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
        onMouseDown={onRightKeyDown}
        onMouseUp={onRightKeyUp}
      >
        Sound
      </Button>
    </Flex>
  );
}
