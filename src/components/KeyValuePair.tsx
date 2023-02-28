interface KeyValueMetricProps {
  label: string;
  metric: string;
  unit?: string;
}

interface KeyValuePairProps {
  label: string;
  value: string;
}

export const getVal = (metric: string, unit: string): string => {
  return `${parseFloat(metric).toFixed(1)} ${unit}`;
};

export default function KeyValuePair({ label, value }: KeyValuePairProps) {
  return (
    <div className="left text">
      <b>{label}</b>: {value}
    </div>
  );
}

export function KeyValueMetric({
  label,
  metric,
  unit = ""
}: KeyValueMetricProps) {
  return (
    <div className="left text">
      <b>{label}</b>: {getVal(metric, unit)}
    </div>
  );
}
