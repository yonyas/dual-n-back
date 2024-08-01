import { useGameDataContext } from "@/context/gameDataContext";
import { Flex, Table, Typography } from "antd";
import { History } from "../game";

type Response = {
  잘누름: number;
  잘못누름: number;
  안누름: number;
  잘안누름: number;
};

export default function Result() {
  const { Title } = Typography;
  const { visualHistories, audioHistories } = useGameDataContext();

  const evaluateResponse = (history: History) => {
    const { match, myResponse } = history;

    if (myResponse === "response") {
      return match ? "잘누름" : "잘못누름";
    } else {
      return match ? "안누름" : "잘안누름";
    }
  };

  const calculateResponses = (histories: History[]) => {
    return histories.reduce((acc, cur) => {
      const response = evaluateResponse(cur);
      acc[response] = (acc[response] || 0) + 1;
      return acc;
    }, {} as Response);
  };

  const calculateRatio = (count: number, total: number) => {
    return count && total ? count / total : 0;
  };

  const getScore = (histories: History[]) => {
    const calculatedResponses = calculateResponses(histories);
    const trials = histories.length;
    const shouldResponseCount = histories.filter((h) => h.match).length;
    const shouldNotResponseCount = trials - shouldResponseCount;

    return {
      hits: calculateRatio(
        calculatedResponses.잘누름,
        shouldResponseCount
      ).toFixed(2),
      false: calculateRatio(
        calculatedResponses.잘못누름,
        shouldNotResponseCount
      ).toFixed(2),
      total: calculateRatio(
        (calculatedResponses.잘누름 || 0) + (calculatedResponses.잘안누름 || 0),
        trials
      ).toFixed(2),
    };
  };

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

  const visualData = [
    {
      index: "Visual",
      hits: getScore(visualHistories).hits,
      false: getScore(visualHistories).false,
      total: getScore(visualHistories).total,
    },
  ];

  const audioData = [
    {
      index: "Audio",
      hits: getScore(audioHistories).hits,
      false: getScore(audioHistories).false,
      total: getScore(audioHistories).total,
    },
  ];

  const data = visualData.concat(audioData);

  return (
    <Flex vertical>
      <Title level={3}>Score</Title>
      <Table columns={columns} dataSource={data} pagination={false} />
    </Flex>
  );
}
