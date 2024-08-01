import { useGameDataContext } from "@/context/gameDataContext";
import { Flex, Table, Typography } from "antd";
import { ScoreCalculator } from "@/utils/getScore";

export default function Result() {
  const { Title } = Typography;
  const { positionHistories, soundHistories } = useGameDataContext();

  const positionScoreCalculator = new ScoreCalculator(positionHistories);
  const soundScoreCalculator = new ScoreCalculator(soundHistories);

  const columns = [
    { title: "", dataIndex: "index", key: "index" },
    {
      title: "Hits",
      dataIndex: "hits",
      key: "hits",
    },
    {
      title: "False",
      dataIndex: "false",
      key: "false",
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
    },
  ];

  const positionData = [
    {
      index: "Position",
      hits: positionScoreCalculator.getScore().hits,
      false: positionScoreCalculator.getScore().false,
      total: positionScoreCalculator.getScore().total,
    },
  ];

  const soundData = [
    {
      index: "Sound",
      hits: soundScoreCalculator.getScore().hits,
      false: soundScoreCalculator.getScore().false,
      total: soundScoreCalculator.getScore().total,
    },
  ];

  const data = [...positionData, ...soundData];

  return (
    <Flex vertical>
      <Title level={3}>Score</Title>
      <Table columns={columns} dataSource={data} pagination={false} />
    </Flex>
  );
}
