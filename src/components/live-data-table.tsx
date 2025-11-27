import { defineComponent } from "../tools/utils";
import type { useResources } from "../stores/use-resources";

interface LiveDataTableProps {
  state: ReturnType<typeof useResources>["state"];
}

export const LiveDataTable = defineComponent<LiveDataTableProps>((props) => (
  <table>
    <tbody>
      <tr>
        <td>Current Lap</td>
        <td>{props.state.lap.current}</td>
      </tr>
      <tr>
        <td>Total Laps</td>
        <td>{props.state.lap.total}</td>
      </tr>
      <tr>
        <td>Time</td>
        <td>{props.state.time}</td>
      </tr>
      <tr>
        <td>Shrooms</td>
        <td>{props.state.shrooms}</td>
      </tr>
      <tr>
        <td>Coins</td>
        <td>{props.state.coins}</td>
      </tr>
      <tr>
        <td>Map</td>
        <td>{props.state.map}</td>
      </tr>
    </tbody>
  </table>
));
