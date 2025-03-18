"use client";
import { useState } from "react";
import { Modal, Slider, Typography, Button, Space, ColorPicker } from "antd";
import { STIMULUS_INTERVAL_MS } from "@/constants/constants";
import { useModalContext } from "@/context/ModalContext";
import { useThemeContext } from "@/context/ThemeContext";
import { getLocalStorage, setLocalStorage } from "@/utils/localStorage";

export default function ConfigModal() {
  const { isModalOpen, closeModal } = useModalContext();
  const { stimulusColor, changeStimulusColor } = useThemeContext();
  const [gameSpeed, setGameSpeed] = useState(() => {
    return getLocalStorage<number>("gameSpeed") ?? STIMULUS_INTERVAL_MS;
  });
  const [tempColor, setTempColor] = useState(stimulusColor);

  const saveSettings = () => {
    setLocalStorage("gameSpeed", gameSpeed);
    changeStimulusColor(tempColor);
    closeModal();
  };

  return (
    <Modal
      title="설정"
      open={isModalOpen}
      onOk={saveSettings}
      onCancel={closeModal}
      centered
      footer={[
        <Button key="cancel" onClick={closeModal}>
          취소
        </Button>,
        <Button key="save" type="primary" onClick={saveSettings}>
          저장
        </Button>,
      ]}
    >
      <Space direction="vertical" style={{ width: "100%" }}>
        <Typography.Title level={5}>
          게임 설정을 변경할 수 있습니다
        </Typography.Title>

        <div>
          <Typography.Text>자극 표시 속도</Typography.Text>
          <Slider
            min={1}
            max={5}
            step={1}
            value={gameSpeed}
            onChange={(value) => setGameSpeed(value)}
            tooltip={{
              open: false,
            }}
            marks={{
              1: "1초",
              2: "2초",
              3: "3초",
              4: "4초",
              5: "5초",
            }}
          />
        </div>

        <div>
          <Typography.Text>자극 색상 </Typography.Text>
          <ColorPicker
            value={tempColor}
            onChange={(value) => setTempColor(value.toRgbString())}
            style={{
              width: "35px",
              height: "35px",
              padding: "2px",
              cursor: "pointer",
            }}
          />
        </div>
      </Space>
    </Modal>
  );
}
