import "../styles.css";
import { Pitch } from "../types";
import Zone from "./Zone";
import KeyValuePair, { getVal, KeyValueMetric } from "./KeyValuePair";

interface Props {
  pitch: Pitch;
}

const WIDTH = 380;

export default function SinglePitchView({ pitch }: Props) {
  return (
    <div className="pitch-box" style={{ width: WIDTH, paddingBottom: 16 }}>
      <h3 className="left">{`${getVal(pitch.plate_speed, "mph")} ${
        pitch.pitch_name
      }`}</h3>
      <KeyValuePair
        label="Count"
        value={`${pitch.balls} - ${pitch.strikes} | ${pitch.outs} ${
          Number(pitch.outs) > 1 ? "outs" : "out"
        }`}
      />
      <KeyValuePair label="Umpire call" value={pitch.umpire_call} />
      <KeyValuePair
        label="Batter no. faced"
        value={`${pitch.pitcher_at_bat_number} (${Number(
          pitch.inning_at_bat_number
        )} of inning)`}
      />
      <br />
      <Zone
        data={[pitch]}
        pitch={pitch}
        onHandleClick={() => {}}
        showTooltip={false}
        showBreak={true}
        canvasWidth={WIDTH}
      />
      <br />
      <KeyValueMetric
        label="Initial speed"
        metric={pitch.initial_speed}
        unit="mph"
      />
      <KeyValueMetric label="Init pos X" metric={pitch.init_pos_x} unit="ft" />
      <KeyValueMetric label="Init pos Z" metric={pitch.init_pos_z} unit="ft" />
      <KeyValueMetric
        label="Init vel X"
        metric={pitch.init_vel_x}
        unit="ft/s"
      />
      <KeyValueMetric
        label="Init vel Y"
        metric={pitch.init_vel_y}
        unit="ft/s"
      />
      <KeyValueMetric
        label="Init vel Z"
        metric={pitch.init_vel_z}
        unit="ft/s"
      />
      <KeyValueMetric
        label="Init accel X"
        metric={pitch.init_accel_x}
        unit="ft/s/s"
      />
      <KeyValueMetric
        label="Init accel Y"
        metric={pitch.init_accel_y}
        unit="ft/s/s"
      />
      <KeyValueMetric
        label="Init accel Z"
        metric={pitch.init_accel_z}
        unit="ft/s/s"
      />
      <KeyValueMetric label="Break X" metric={pitch.break_x} unit="ft" />
      <KeyValueMetric label="Break Z" metric={pitch.break_z} unit="ft" />
    </div>
  );
}
