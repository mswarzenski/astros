import { Fragment } from "react";
import * as d3 from "d3";
import { Pitch } from "../types";
import {
  WIDTH,
  HEIGHT,
  BALL_RAD,
  xScale,
  DEFAULT_CANVAS_WIDTH,
  DEFAULT_CANVAS_HEIGHT,
  renderTooltip
} from "../constants";
import { OverlayTrigger } from "react-bootstrap";

interface Props {
  data: Array<Pitch>;
  pitch: Pitch | null;
  onHandleClick: (pitch: Pitch) => void;
  showBreak?: boolean;
  showTooltip?: boolean;
  canvasWidth?: number;
  canvasHeight?: number;
}

const LINES = [
  { x1: 0, x2: WIDTH, y1: HEIGHT / 3, y2: HEIGHT / 3 },
  { x1: 0, x2: WIDTH, y1: (HEIGHT * 2) / 3, y2: (HEIGHT * 2) / 3 },
  { x1: WIDTH / 3, x2: WIDTH / 3, y1: 0, y2: HEIGHT },
  { x1: (WIDTH * 2) / 3, x2: (WIDTH * 2) / 3, y1: 0, y2: HEIGHT }
];

export default function Zone({
  data,
  pitch,
  onHandleClick,
  showBreak = false,
  showTooltip = true,
  canvasWidth = DEFAULT_CANVAS_WIDTH,
  canvasHeight = DEFAULT_CANVAS_HEIGHT
}: Props) {
  const bot = Number(
    d3.mean(data, function (d: Pitch) {
      return parseFloat(d.sz_bottom);
    })
  );

  const top = Number(
    d3.mean(data, function (d: Pitch) {
      return parseFloat(d.sz_top);
    })
  );

  const yScale = d3.scaleLinear().domain([bot, top]).range([HEIGHT, 0]);

  return (
    <svg width={canvasWidth} height={canvasHeight}>
      <g
        transform={`translate(${[canvasWidth / 2 - WIDTH / 2, 200].join(",")})`}
      >
        <rect width={WIDTH} height={HEIGHT} fill="lavender" />
        {LINES.map((d, i) => (
          <line key={i} {...d} stroke="blue" />
        ))}
        <text
          x={WIDTH}
          y={8}
          className="label"
          style={{
            textAnchor: "start",
            transform: "translateX(2px)"
          }}
        >
          {`${top.toFixed(1)} ft`}
        </text>
        <text
          x={WIDTH}
          y={HEIGHT}
          className="label"
          style={{
            textAnchor: "start",
            transform: "translateX(2px)"
          }}
        >
          {`${bot.toFixed(1)} ft`}
        </text>
        {data.map((p: Pitch) => {
          const x = Number(p.plate_x);
          const y = Number(p.plate_z);
          const x2 = x - Number(p.break_x);
          const y2 = y - Number(p.break_z);

          const ball = (
            <circle
              onClick={() => onHandleClick(p)}
              className={
                pitch?.sv_pitch_id === p.sv_pitch_id ? "focused-ball" : "ball"
              }
              cx={xScale(x)}
              cy={yScale(y)}
              r={BALL_RAD * WIDTH}
            />
          );

          return (
            <Fragment key={p.sv_pitch_id}>
              {showBreak && (
                <>
                  <circle cx={xScale(x2)} cy={yScale(y2)} r={4} fill="black" />
                  <line
                    x1={xScale(x)}
                    x2={xScale(x2)}
                    y1={yScale(y)}
                    y2={yScale(y2)}
                    stroke="black"
                  />
                </>
              )}
              {showTooltip ? (
                <OverlayTrigger placement="top" overlay={renderTooltip(p)}>
                  {ball}
                </OverlayTrigger>
              ) : (
                ball
              )}
            </Fragment>
          );
        })}
      </g>
    </svg>
  );
}
