import s from "./styles.module.css";

export default function Board({
  currentVisualIndex,
}: {
  currentVisualIndex?: number;
}) {
  return (
    <div className="table-wrapper">
      <table className={s["table"]}>
        <tbody>
          <tr>
            <td id={"1"}>
              <div
                className={`${s["box"]} ${
                  currentVisualIndex === 1 && s["show"]
                }`}
              />
            </td>
            <td id={"2"}>
              <div
                className={`${s["box"]} ${
                  currentVisualIndex === 2 && s["show"]
                }`}
              />
            </td>
            <td id={"3"}>
              <div
                className={`${s["box"]} ${
                  currentVisualIndex === 3 && s["show"]
                }`}
              />
            </td>
          </tr>
          <tr>
            <td id={"4"}>
              <div
                className={`${s["box"]} ${
                  currentVisualIndex === 4 && s["show"]
                }`}
              />
            </td>
            <td id={"5"}>
              <div
                className={`${s["box"]} ${
                  currentVisualIndex === 5 && s["show"]
                }`}
              />
            </td>
            <td id={"6"}>
              <div
                className={`${s["box"]} ${
                  currentVisualIndex === 6 && s["show"]
                }`}
              />
            </td>
          </tr>
          <tr>
            <td id={"7"}>
              <div
                className={`${s["box"]} ${
                  currentVisualIndex === 7 && s["show"]
                }`}
              />
            </td>
            <td id={"8"}>
              <div
                className={`${s["box"]} ${
                  currentVisualIndex === 8 && s["show"]
                }`}
              />
            </td>
            <td id={"9"}>
              <div
                className={`${s["box"]} ${
                  currentVisualIndex === 9 && s["show"]
                }`}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
