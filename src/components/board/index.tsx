import s from "./styles.module.css";
import { useStimuliContext } from "@/context/stimuliContext";

export default function Board() {
  const { currentPositionIndex } = useStimuliContext();
  return (
    <div className="table-wrapper">
      <table className={s["table"]}>
        <tbody>
          <tr>
            <td id={"1"}>
              <div
                className={`${s["box"]} ${
                  currentPositionIndex === 1 && s["show"]
                }`}
              />
            </td>
            <td id={"2"}>
              <div
                className={`${s["box"]} ${
                  currentPositionIndex === 2 && s["show"]
                }`}
              />
            </td>
            <td id={"3"}>
              <div
                className={`${s["box"]} ${
                  currentPositionIndex === 3 && s["show"]
                }`}
              />
            </td>
          </tr>
          <tr>
            <td id={"4"}>
              <div
                className={`${s["box"]} ${
                  currentPositionIndex === 4 && s["show"]
                }`}
              />
            </td>
            <td id={"5"}>
              <div
                className={`${s["box"]} ${
                  currentPositionIndex === 5 && s["show"]
                }`}
              />
            </td>
            <td id={"6"}>
              <div
                className={`${s["box"]} ${
                  currentPositionIndex === 6 && s["show"]
                }`}
              />
            </td>
          </tr>
          <tr>
            <td id={"7"}>
              <div
                className={`${s["box"]} ${
                  currentPositionIndex === 7 && s["show"]
                }`}
              />
            </td>
            <td id={"8"}>
              <div
                className={`${s["box"]} ${
                  currentPositionIndex === 8 && s["show"]
                }`}
              />
            </td>
            <td id={"9"}>
              <div
                className={`${s["box"]} ${
                  currentPositionIndex === 9 && s["show"]
                }`}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
