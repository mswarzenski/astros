import { useEffect, useState } from "react";
import "../styles.css";
import { Pitch } from "../types";
import Dropdown from "./Dropdown";
import MultiPitchView from "./MultiPitchView";
import { SelectChangeEvent } from "@mui/material";
import SinglePitchView from "./SinglePitchView";
import PitchFrequency from "./PitchFrequency";

interface PageProps {
  data: Array<Pitch>;
  pitchers: Array<string>;
}

function Page({ data, pitchers }: PageProps) {
  const [showPitch, setShowPitch] = useState<boolean>(false);
  const [pitcher, setPitcher] = useState<string>("Beeks, Jalen");

  const pitcherData = data.filter((d) => d.pitcher_name === pitcher);
  const pitcherPitches = ["All"].concat(
    Array.from(new Set(pitcherData.map((d) => d.pitch_name)))
  );

  const [pitchType, setPitchType] = useState<string>(pitcherPitches[0]);
  const pitchData = pitcherData.filter((d) =>
    pitchType === "All" ? true : d.pitch_name === pitchType
  );

  const [pitch, setPitch] = useState<Pitch | null>(pitchData[0]);

  const onSelectPitcher = (e: SelectChangeEvent) => {
    setPitcher(e.target.value);
    setPitchType("All");
    setPitch(null);
  };

  const onSelectPitchType = (e: SelectChangeEvent) => {
    setPitchType(e.target.value);
    setPitch(null);
  };

  const onSelectPitch = (pitch: Pitch) => {
    setShowPitch(true);
    setPitch(pitch);
  };

  return (
    <div className="App">
      <div className="flex-container" style={{ alignItems: "center" }}>
        <Dropdown
          title="Select pitcher"
          value={pitcher}
          values={pitchers}
          onChange={onSelectPitcher}
          width={400}
        />
        <div className="flex-child" style={{ margin: 16, maxWidth: 700 }}>
          <PitchFrequency data={pitcherData} pitchTypes={pitcherPitches} />
        </div>
      </div>
      <div className="flex-container">
        <div className="flex-child pitch-box">
          <Dropdown
            title="Select pitch"
            value={pitchType}
            values={pitcherPitches}
            onChange={onSelectPitchType}
            width={200}
          />
          <MultiPitchView
            data={pitchData}
            pitch={pitch}
            onSelectPitch={onSelectPitch}
          />
          <p className="left footnote">
            <i>
              Zone height scaled to average sz_bottom and sz_top values in pitch
              set
            </i>
          </p>
        </div>
        <div className="flex-child">
          {showPitch && pitch && <SinglePitchView pitch={pitch} />}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [data, setData] = useState<Array<Pitch>>([]);

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/rd-astros/hiring-resources/master/pitches.json"
    )
      .then((response) => response.json())
      .then((data) => setData(data.queryResults.row));
  }, []);

  const pitchers: Array<string> = Array.from(
    new Set(data.map((d: Pitch) => d.pitcher_name))
  ).sort();

  return <Page data={data} pitchers={pitchers} />;
}
