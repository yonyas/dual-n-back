import { useGameControlContext } from "@/context/GameControlContext";
import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";
import { Button, Flex, InputNumber, Typography } from "antd";

export default function Panel() {
  const {
    n,
    setN,
    trialCounter,
    handleTrialsChange,
    gameActive,
    handleStop: onStop,
    handleStart: onStart,
  } = useGameControlContext();

  const incrementN = () => {
    if (n < 9) setN(n + 1);
  };

  const decrementN = () => {
    if (n > 1) setN(n - 1);
  };

  return (
    <Flex justify="space-between" align="center" gap={20}>
      <Flex align="center" gap={8}>
        <Button
          icon={<CaretDownOutlined />}
          onClick={decrementN}
          disabled={gameActive || n === 2}
        />
        <Typography>{n}</Typography>
        <Button
          icon={<CaretUpOutlined />}
          onClick={incrementN}
          disabled={gameActive}
        />
      </Flex>
      <Flex gap={4} align="center">
        <Typography>{`${trialCounter} /`}</Typography>
        <InputNumber
          min={2 * n + 17}
          max={500}
          defaultValue={60}
          onChange={handleTrialsChange}
          size={"small"}
        />
      </Flex>
      <Button onClick={gameActive ? onStop : onStart}>
        {gameActive ? "끝내기" : "시작"}
      </Button>
    </Flex>
  );
}
