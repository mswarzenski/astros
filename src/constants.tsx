import * as d3 from "d3";
import { Tooltip } from "react-bootstrap";
import { getVal } from "./components/KeyValuePair";
import { Pitch, Count } from "./types";

export const SZ_WIDTH = 17 / 12;
export const BALL_RAD = 0.5 / 12;

export const WIDTH = 220;
export const HEIGHT = WIDTH * (2.1 / SZ_WIDTH);

export const xScale = d3
  .scaleLinear()
  .domain([-SZ_WIDTH, SZ_WIDTH])
  .range([0, WIDTH]);

export const DEFAULT_CANVAS_WIDTH = 400;
export const DEFAULT_CANVAS_HEIGHT = 800;

export const COUNT_MAP: { [key: string]: Count } = {
  "0-0": Count.FirstPitch,
  "0-1": Count.Ahead,
  "0-2": Count.TwoStrikes,
  "1-0": Count.Behind,
  "1-1": Count.Even,
  "1-2": Count.Ahead,
  "2-0": Count.Behind,
  "2-1": Count.Behind,
  "2-2": Count.TwoStrikes,
  "3-0": Count.Behind,
  "3-1": Count.Behind,
  "3-2": Count.TwoStrikes
};

export const renderTooltip = (props: Pitch) => (
  <Tooltip {...props}>
    <div className="tooltip">
      <div className="left text">{`ID: ${props.sv_pitch_id}`}</div>
      <b className="left text">{`${getVal(props.plate_speed, "mph")} ${
        props.pitch_name
      }`}</b>
      <div className="left text">{`Break X: ${getVal(
        props.break_x,
        "ft"
      )}`}</div>
      <div className="left text">{`Break Z: ${getVal(
        props.break_z,
        "ft"
      )}`}</div>
    </div>
  </Tooltip>
);
