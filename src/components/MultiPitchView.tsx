import { Count, Pitch } from "../types";
import Zone from "./Zone";
import Break from "./Break";
import * as d3 from "d3";
import { KeyValueMetric } from "./KeyValuePair";
import { useState } from "react";
import { SelectChangeEvent } from "@mui/material";
import { count } from "d3";

interface Props {
  data: Array<Pitch>;
  pitch: Pitch | null;
  onSelectPitch: (pitch: Pitch) => void;
}

type Metric = {
  label: string;
  unit: string;
  calc: number | undefined;
};

const getStats = (data: Array<Pitch>): Array<Metric> => {
  return [
    {
      label: "Avg. Plate speed",
      unit: "mph",
      calc: d3.mean(data, (d: Pitch) => parseFloat(d.plate_speed))
    },
    {
      label: "Avg. Initial speed",
      unit: "mph",
      calc: d3.mean(data, (d: Pitch) => parseFloat(d.initial_speed))
    },
    {
      label: "Avg. Init pos X",
      unit: "ft",
      calc: d3.mean(data, (d: Pitch) => parseFloat(d.init_pos_x))
    },
    {
      label: "Avg. Init pos Z",
      unit: "ft",
      calc: d3.mean(data, (d: Pitch) => parseFloat(d.init_pos_z))
    },
    {
      label: "Avg. Init vel X",
      unit: "ft/s",
      calc: d3.mean(data, (d: Pitch) => parseFloat(d.init_vel_x))
    },
    {
      label: "Avg. Init vel Y",
      unit: "ft/s",
      calc: d3.mean(data, (d: Pitch) => parseFloat(d.init_vel_y))
    },
    {
      label: "Avg. Init vel Z",
      unit: "ft/s",
      calc: d3.mean(data, (d: Pitch) => parseFloat(d.init_vel_z))
    },
    {
      label: "Avg. Init accel X",
      unit: "ft/s/s",
      calc: d3.mean(data, (d: Pitch) => parseFloat(d.init_accel_x))
    },
    {
      label: "Avg. Init accel Y",
      unit: "ft/s/s",
      calc: d3.mean(data, (d: Pitch) => parseFloat(d.init_accel_y))
    },
    {
      label: "Avg. Init accel Z",
      unit: "ft/s/s",
      calc: d3.mean(data, (d: Pitch) => parseFloat(d.init_accel_z))
    },
    {
      label: "Avg. Break X",
      unit: "ft",
      calc: d3.mean(data, (d: Pitch) => parseFloat(d.break_x))
    },
    {
      label: "Avg. Break Z",
      unit: "ft",
      calc: d3.mean(data, (d: Pitch) => parseFloat(d.break_z))
    }
  ];
};

export default function MultiPitchView({ data, pitch, onSelectPitch }: Props) {
  return (
    <div className="flex-container" style={{ width: "1200px" }}>
      <div>
        <h2 className="left">{`Pitches: ${data.length}`}</h2>
        {Object.values(getStats(data)).map((s, i) => (
          <KeyValueMetric
            key={i}
            label={s.label}
            metric={String(s.calc ?? 0)}
            unit={s.unit}
          />
        ))}
      </div>
      <Zone data={data} pitch={pitch} onHandleClick={onSelectPitch} />
      <Break data={data} pitch={pitch} onHandleClick={onSelectPitch} />
    </div>
  );
}
