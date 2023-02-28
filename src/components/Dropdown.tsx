import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { ReactElement, ReactNode } from "react";

interface Props {
  title: string;
  value: string;
  values: Array<string>;
  onChange: (event: SelectChangeEvent<string>, child: ReactNode) => void;
  width: number;
}

export default function Dropdown({
  title,
  value,
  values,
  onChange,
  width
}: Props): ReactElement {
  return (
    <Box className="dropdown" style={{ width: width }}>
      <FormControl fullWidth>
        <InputLabel>{title}</InputLabel>
        <Select value={value} label={title} onChange={onChange}>
          {values.map((v: string) => (
            <MenuItem key={v} value={v}>
              {v}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
