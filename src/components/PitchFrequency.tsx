import * as d3 from "d3";
import { Pitch } from "../types";

interface Props {
  data: Array<Pitch>;
  pitchTypes: Array<string>;
}

interface BarProps {
  height: number;
  percentage: string;
  label: string;
}

const HEIGHT = 60;
const WIDTH = 80;

function Bar({ height, percentage, label }: BarProps) {
  return (
    <div>
      <svg style={{ marginLeft: 10 }} width={WIDTH} height={HEIGHT + 20}>
        <text
          x={WIDTH / 2}
          y={height - 8}
          className="label"
          style={{
            textAnchor: "middle"
          }}
        >
          {percentage}
        </text>
        <path
          d={`M 0 ${HEIGHT} L 0  ${height} L ${WIDTH} ${height} L ${WIDTH} ${HEIGHT} Z`}
          fill="black"
        />
        <text
          x={WIDTH / 2}
          y={HEIGHT + 16}
          className="label"
          style={{
            textAnchor: "middle"
          }}
        >
          {label}
        </text>
      </svg>
    </div>
  );
}

export default function PitchFrequency({ data, pitchTypes }: Props) {
  const tot = data.length;
  const counts: { [key: string]: number } = {};
  pitchTypes.forEach((t) => {
    if (t !== "All") {
      counts[t] = 0;
    }
  });

  data.forEach((p: Pitch) => (counts[p.pitch_name] += 1));

  const yScale = d3
    .scaleLinear()
    .domain([0, tot + 10]) // leave room for label
    .range([HEIGHT, 0]);

  return (
    <div style={{ display: "flex" }}>
      {Object.keys(counts).map((type) => {
        const count = counts[type];
        return (
          <Bar
            key={type}
            height={yScale(count)}
            percentage={`${((count * 100.0) / tot).toFixed(1)} %`}
            label={type}
          />
        );
      })}
    </div>
  );
}
