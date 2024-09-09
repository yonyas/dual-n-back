import { History } from "@/components/Game";

type Response = {
  잘누름: number;
  잘못누름: number;
  못누름: number;
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
      return match ? "못누름" : "잘안누름";
    }
  }

  public calculateResponses() {
    return this.histories.reduce(
      (acc, cur) => {
        const response = this.evaluateResponse(cur);
        acc[response] = acc[response] + 1;
        return acc;
      },
      {
        잘누름: 0,
        잘못누름: 0,
        못누름: 0,
        잘안누름: 0,
      } as Response
    );
  }

  private calculateRatio(count: number, total: number) {
    return count && total ? count / total : 0;
  }

  public correctTrials() {
    const calculatedResponses = this.calculateResponses();
    return (
      (calculatedResponses.잘누름 || 0) + (calculatedResponses.잘안누름 || 0)
    );
  }

  public getScore() {
    const trials = this.histories.length;

    return this.calculateRatio(this.correctTrials(), trials).toFixed(2);
  }
}
