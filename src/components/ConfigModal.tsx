"use client";
import { useState } from "react";
import { Modal, Slider, Typography, Button, Space } from "antd";
import { useModalContext } from "@/context/ModalContext";
import { STIMULUS_INTERVAL_MS } from "@/constants/constants";
import { getLocalStorage, setLocalStorage } from "@/utils/localStorage";

export default function ConfigModal() {
  const { isModalOpen, closeModal } = useModalContext();
  const [gameSpeed, setGameSpeed] = useState(() => {
    return getLocalStorage<number>("gameSpeed") ?? STIMULUS_INTERVAL_MS;
  });

  const saveSettings = () => {
    setLocalStorage("gameSpeed", gameSpeed);
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
          <Typography.Text>자극 표시 속도: {gameSpeed}</Typography.Text>
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
              1: "1",
              2: "2",
              3: "3",
              4: "4",
              5: "5",
            }}
          />
        </div>
      </Space>
    </Modal>
  );
}
