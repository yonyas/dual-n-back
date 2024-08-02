import { useGameControlContext } from "@/context/gameControlContext";
import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";
import { Button, Flex, Typography } from "antd";

export default function Panel() {
  const {
    n,
    setN,
    trialCounter,
    trials,
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
          disabled={gameActive}
        />
        <Typography>{n}</Typography>
        <Button
          icon={<CaretUpOutlined />}
          onClick={incrementN}
          disabled={gameActive}
        />
      </Flex>
      <Typography>{`${trialCounter} / ${trials}`}</Typography>
      <Button onClick={gameActive ? onStop : onStart}>
        {gameActive ? "끝내기" : "시작"}
      </Button>
      {/* TODO: setting 기능 나중에 개발 */}
      {/* <Button icon={<SettingOutlined />}></Button> */}
    </Flex>
  );
}
