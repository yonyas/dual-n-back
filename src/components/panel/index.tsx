import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";
import { Button, Flex, Typography } from "antd";
import { Dispatch, SetStateAction } from "react";

export default function Panel({
  n,
  setN,
  trialCounter,
  trials,
  gameActive,
  onStop,
  onStart,
}: {
  n: number;
  setN: Dispatch<SetStateAction<number>>;
  trialCounter: number;
  trials: number;
  gameActive: boolean;
  onStop: () => void;
  onStart: () => void;
}) {
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
        ></Button>
        <Typography>{n}</Typography>
        <Button
          icon={<CaretUpOutlined />}
          onClick={incrementN}
          disabled={gameActive}
        ></Button>
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
