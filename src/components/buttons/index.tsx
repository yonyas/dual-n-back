import { Button, Flex } from "antd";
import Image from "next/image";
import { History } from "../game";

export default function Buttons({
  visualHistories,
  visualPressed,
  audioHistories,
  audioPressed,
  onLeftKeyDown,
  onRightKeyDown,
  onLeftKeyUp,
  onRightKeyUp,
}: {
  visualHistories: History[];
  visualPressed: boolean;
  audioHistories: History[];
  audioPressed: boolean;
  onLeftKeyDown: () => void;
  onRightKeyDown: () => void;
  onLeftKeyUp: () => void;
  onRightKeyUp: () => void;
}) {
  const visualMatch = visualHistories?.at(-1)?.match;
  const visualBackground = visualPressed
    ? visualMatch
      ? "green"
      : "red"
    : "white";

  const audioMatch = audioHistories?.at(-1)?.match;
  const audioBackground = audioPressed
    ? audioMatch
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
        style={{ backgroundColor: visualBackground }}
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
        style={{ backgroundColor: audioBackground }}
        iconPosition="end"
        onMouseDown={onRightKeyDown}
        onMouseUp={onRightKeyUp}
      >
        Sound
      </Button>
    </Flex>
  );
}
