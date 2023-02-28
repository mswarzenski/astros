import * as d3 from "d3";
import { Pitch } from "../types";
import {
  SZ_WIDTH,
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
  canvasWidth?: number;
  canvasHeight?: number;
}

interface AxisProps {
  domain: Array<number>;
  range: Array<number>;
  width?: number;
}

function XAxis({ domain, range }: AxisProps) {
  const scale = d3.scaleLinear().domain(domain).range(range);
  const ticks = scale.ticks(5).map((value: number) => ({
    value,
    offset: scale(value)
  }));

  return (
    <svg>
      <g transform={`translate(0, ${HEIGHT})`}>
        <path
          d={`M ${range[0] - 1} 6 v -6 H ${range[1]} v 6`}
          fill="none"
          stroke="black"
        />
        {ticks.map(({ value, offset }) => (
          <g key={value} transform={`translate(${offset}, 0)`}>
            <line y2="6" stroke="black" />
            <text
              key={value}
              className="label"
              style={{
                textAnchor: "middle",
                transform: "translateY(20px)"
              }}
            >
              {value}
            </text>
          </g>
        ))}
      </g>
    </svg>
  );
}

function YAxis({ domain, range, width }: AxisProps) {
  const scale = d3.scaleLinear().domain(domain).range(range);
  const ticks = scale
    .ticks(10)
    .map((value: number) => ({
      value,
      offset: scale(value)
    }))
    .filter((x) => x.value !== 0 && x.offset !== 0);

  return (
    <svg>
      <g transform={`translate(${width}, 0)`}>
        <path
          d={`M 0 ${range[0]} v ${-HEIGHT} H 0 v ${range[1]}`}
          fill="none"
          stroke="black"
        />
        {ticks.map(({ value, offset }) => (
          <g key={value} transform={`translate(0, ${offset})`}>
            <line x2="6" stroke="black" />
            <text
              key={value}
              className="label"
              style={{
                textAnchor: "start",
                transform: "translate(10px, 4px)"
              }}
            >
              {value}
            </text>
          </g>
        ))}
      </g>
    </svg>
  );
}

export default function Break({
  data,
  pitch,
  onHandleClick,
  canvasWidth = DEFAULT_CANVAS_WIDTH,
  canvasHeight = DEFAULT_CANVAS_HEIGHT
}: Props) {
  const max_break = Number(
    d3.min(data, function (d: Pitch) {
      return parseFloat(d.break_z);
    })
  );

  const yScale = d3.scaleLinear().domain([max_break, 0]).range([HEIGHT, 0]);

  return (
    <svg width={canvasWidth} height={canvasHeight}>
      <g
        transform={`translate(${[canvasWidth / 2 - WIDTH / 2, 200].join(",")})`}
      >
        <rect width={WIDTH} height={HEIGHT} fill="lavender" />
        <text
          x={WIDTH / 2}
          y={14}
          style={{
            fontSize: "14px",
            textAnchor: "middle"
          }}
        >
          Break (ft)
        </text>
        {data.map((p: Pitch) => (
          <OverlayTrigger
            placement="top"
            overlay={renderTooltip(p)}
            key={p.sv_pitch_id}
          >
            <circle
              onClick={() => onHandleClick(p)}
              className={
                pitch?.sv_pitch_id === p.sv_pitch_id ? "focused-ball" : "ball"
              }
              cx={xScale(Number(p.break_x))}
              cy={yScale(Number(p.break_z))}
              r={BALL_RAD * WIDTH}
            />
          </OverlayTrigger>
        ))}
        <XAxis domain={[-SZ_WIDTH, SZ_WIDTH]} range={[0, WIDTH]} />
        <YAxis domain={[max_break, 0]} range={[HEIGHT, 0]} width={WIDTH} />
      </g>
    </svg>
  );
}
