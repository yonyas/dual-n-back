import { Button, Flex } from "antd";
import Image from "next/image";

export default function Buttons() {
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
        onMouseUp={() => {}}
        // onMouseDown={handleLeftClick}
        // disabled={!gameActive}
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
        iconPosition="end"
        // disabled={!gameActive}
      >
        Sound
      </Button>
    </Flex>
  );
}
