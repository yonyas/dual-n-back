import { History } from "@/components/game";

type Response = {
  잘누름: number;
  잘못누름: number;
  안누름: number;
  잘안누름: number;
};

export class ScoreCalculator {
  private histories: History[];

  constructor(histories: History[]) {
    this.histories = histories;
  }

  private evaluateResponse(history: History) {
    const { match, myResponse } = history;

    if (myResponse === "response") {
      return match ? "잘누름" : "잘못누름";
    } else {
      return match ? "안누름" : "잘안누름";
    }
  }

  private calculateResponses() {
    return this.histories.reduce((acc, cur) => {
      const response = this.evaluateResponse(cur);
      acc[response] = (acc[response] || 0) + 1;
      return acc;
    }, {} as Response);
  }

  private calculateRatio(count: number, total: number) {
    return count && total ? count / total : 0;
  }

  public getScore() {
    const calculatedResponses = this.calculateResponses();
    const trials = this.histories.length;
    const shouldResponseCount = this.histories.filter((h) => h.match).length;
    const shouldNotResponseCount = trials - shouldResponseCount;

    return {
      hits: this.calculateRatio(
        calculatedResponses.잘누름,
        shouldResponseCount
      ).toFixed(2),
      false: this.calculateRatio(
        calculatedResponses.잘못누름,
        shouldNotResponseCount
      ).toFixed(2),
      total: this.calculateRatio(
        (calculatedResponses.잘누름 || 0) + (calculatedResponses.잘안누름 || 0),
        trials
      ).toFixed(2),
    };
  }
}
