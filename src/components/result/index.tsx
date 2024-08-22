import { Flex, Table, Typography } from "antd";
import { ScoreCalculator } from "@/utils/getScore";
import { useStimuliContext } from "@/context/stimuliContext";

export default function Result() {
  const { Title } = Typography;
  const { Column, ColumnGroup } = Table;

  const { positionHistories, soundHistories } = useStimuliContext();

  const positionScoreCalculator = new ScoreCalculator(positionHistories);
  const soundScoreCalculator = new ScoreCalculator(soundHistories);

  const positionData = [
    {
      종류: "위치",
      "매치됨-누름": positionScoreCalculator.calculateResponses().잘누름,
      "매치됨-못누름": positionScoreCalculator.calculateResponses().못누름,
      "매치안됨-누름": positionScoreCalculator.calculateResponses().잘못누름,
      "매치안됨-안누름": positionScoreCalculator.calculateResponses().잘안누름,
      점수: positionScoreCalculator.getScore(),
    },
  ];

  const soundData = [
    {
      종류: "소리",
      "매치됨-누름": soundScoreCalculator.calculateResponses().잘누름,
      "매치됨-못누름": soundScoreCalculator.calculateResponses().못누름,
      "매치안됨-누름": soundScoreCalculator.calculateResponses().잘못누름,
      "매치안됨-안누름": soundScoreCalculator.calculateResponses().잘안누름,
      점수: soundScoreCalculator.getScore(),
    },
  ];

  const total = [
    {
      종류: "합계",
      점수:
        positionHistories.length > 0
          ? (
              (positionScoreCalculator.correctTrials() +
                soundScoreCalculator.correctTrials()) /
              (positionHistories.length + soundHistories.length)
            ).toFixed(2)
          : 0,
    },
  ];

  const data = [...positionData, ...soundData, ...total];

  return (
    <Flex vertical style={{ width: 400, justifyContent: "center" }}>
      <Title level={3}>점수</Title>
      <Table dataSource={data} pagination={false}>
        <Column title="" dataIndex="종류" key="종류" />
        <ColumnGroup title="매치됨">
          <Column
            title="누름"
            dataIndex="매치됨-누름"
            key="매치됨-누름"
            render={(value) => {
              return <span style={{ color: "blue" }}>{value}</span>;
            }}
          />
          <Column
            title="안누름"
            dataIndex="매치됨-못누름"
            key="매치됨-못누름"
            render={(value) => {
              return <span style={{ color: "red" }}>{value}</span>;
            }}
          />
        </ColumnGroup>
        <ColumnGroup title="매치 안됨">
          <Column
            title="누름"
            dataIndex="매치안됨-누름"
            key="매치안됨-누름"
            render={(value) => {
              return <span style={{ color: "red" }}>{value}</span>;
            }}
          />
          <Column
            title="안누름"
            dataIndex="매치안됨-안누름"
            key="매치안됨-안누름"
            render={(value) => {
              return <span style={{ color: "blue" }}>{value}</span>;
            }}
          />
        </ColumnGroup>
        <Column title="점수" dataIndex="점수" key="점수" width={70} />
      </Table>
    </Flex>
  );
}
