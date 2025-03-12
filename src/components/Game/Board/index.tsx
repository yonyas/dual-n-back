import { useThemeContext } from "@/context/ThemeContext";
import s from "./styles.module.css";
import { useStimuliContext } from "@/context/StimuliContext";

export default function Board() {
  const { currentPositionIndex } = useStimuliContext();
  const { theme, stimulusColor } = useThemeContext();

  return (
    <div className="table-wrapper">
      <table className={`${s.table} ${theme === "dark" ? s.dark : ""}`}>
        <tbody>
          <tr>
            <td id={"1"}>
              <div
                className={`${s["box"]}`}
                style={{
                  backgroundColor:
                    currentPositionIndex === 1 ? stimulusColor : "transparent",
                }}
              />
            </td>
            <td id={"2"}>
              <div
                className={`${s["box"]}`}
                style={{
                  backgroundColor:
                    currentPositionIndex === 2 ? stimulusColor : "transparent",
                }}
              />
            </td>
            <td id={"3"}>
              <div
                className={`${s["box"]}`}
                style={{
                  backgroundColor:
                    currentPositionIndex === 3 ? stimulusColor : "transparent",
                }}
              />
            </td>
          </tr>
          <tr>
            <td id={"4"}>
              <div
                className={`${s["box"]}`}
                style={{
                  backgroundColor:
                    currentPositionIndex === 4 ? stimulusColor : "transparent",
                }}
              />
            </td>
            <td id={"5"}>
              <div
                className={`${s["box"]}`}
                style={{
                  backgroundColor:
                    currentPositionIndex === 5 ? stimulusColor : "transparent",
                }}
              />
            </td>
            <td id={"6"}>
              <div
                className={`${s["box"]}`}
                style={{
                  backgroundColor:
                    currentPositionIndex === 6 ? stimulusColor : "transparent",
                }}
              />
            </td>
          </tr>
          <tr>
            <td id={"7"}>
              <div
                className={`${s["box"]}`}
                style={{
                  backgroundColor:
                    currentPositionIndex === 7 ? stimulusColor : "transparent",
                }}
              />
            </td>
            <td id={"8"}>
              <div
                className={`${s["box"]}`}
                style={{
                  backgroundColor:
                    currentPositionIndex === 8 ? stimulusColor : "transparent",
                }}
              />
            </td>
            <td id={"9"}>
              <div
                className={`${s["box"]}`}
                style={{
                  backgroundColor:
                    currentPositionIndex === 9 ? stimulusColor : "transparent",
                }}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
