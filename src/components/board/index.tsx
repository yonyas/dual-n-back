import { History } from "../game";
import s from "./styles.module.css";

export default function Board({
  visualHistory,
}: // audioHistory,
{
  visualHistory: History[];
  // audioHistory: {
  //   index: number;
  //   correct: boolean;
  // }[];
}) {
  const visualIndex = visualHistory?.at(-1)?.index;

  return (
    <div className="table-wrapper">
      <table className={s["table"]}>
        <tbody>
          <tr>
            <td id={"1"}>
              <div
                className={`${s["box"]} ${visualIndex === 1 && s["show"]}`}
              />
            </td>
            <td id={"2"}>
              <div
                className={`${s["box"]} ${visualIndex === 2 && s["show"]}`}
              />
            </td>
            <td id={"3"}>
              <div
                className={`${s["box"]} ${visualIndex === 3 && s["show"]}`}
              />
            </td>
          </tr>
          <tr>
            <td id={"4"}>
              <div
                className={`${s["box"]} ${visualIndex === 4 && s["show"]}`}
              />
            </td>
            <td id={"5"}>
              <div
                className={`${s["box"]} ${visualIndex === 5 && s["show"]}`}
              />
            </td>
            <td id={"6"}>
              <div
                className={`${s["box"]} ${visualIndex === 6 && s["show"]}`}
              />
            </td>
          </tr>
          <tr>
            <td id={"7"}>
              <div
                className={`${s["box"]} ${visualIndex === 7 && s["show"]}`}
              />
            </td>
            <td id={"8"}>
              <div
                className={`${s["box"]} ${visualIndex === 8 && s["show"]}`}
              />
            </td>
            <td id={"9"}>
              <div
                className={`${s["box"]} ${visualIndex === 9 && s["show"]}`}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
