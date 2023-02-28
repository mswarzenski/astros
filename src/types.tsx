export enum Count {
  All = "All",
  FirstPitch = "First Pitch",
  Even = "Even",
  Ahead = "Ahead",
  Behind = "Behind",
  TwoStrikes = "2 Strikes"
}

export interface Pitch {
  game_pk: string;
  game_id: string;
  away_team_name: string;
  away_team_code: string;
  home_team_name: string;
  home_team_code: string;
  play_id: string;
  sv_pitch_id: string;
  sequence_number: string;
  at_bat_number: string;
  pitch_number: string;
  event_pitch_number: string;
  inning: string;
  inning_half: string;
  batting_team_name: string;
  batting_team_code: string;
  fielding_team_name: string;
  fielding_team_code: string;
  event_number: string;
  event_type: string;
  pbp_number: string;
  event_result: string;
  umpire_id: string;
  umpire_call: string;
  batter_id: string;
  batter_name: string;
  bat_side: string;
  p_bat_side: string;
  pitcher_id: string;
  pitcher_name: string;
  pitcher_throws: string;
  sz_top: string;
  sz_bottom: string;
  inning_at_bat_number: string;
  pitcher_at_bat_number: string;
  balls: string;
  strikes: string;
  outs: string;
  initial_speed: string;
  init_pos_x: string;
  init_pos_y: string;
  init_pos_z: string;
  init_vel_x: string;
  init_vel_y: string;
  init_vel_z: string;
  init_accel_x: string;
  init_accel_y: string;
  init_accel_z: string;
  plate_speed: string;
  plate_x: string;
  plate_y: string;
  plate_z: string;
  break_x: string;
  break_z: string;
  pitch_type: string;
  pitch_name: string;
  time_stamp: string;
  game_date: string;
  game_nbr: string;
  year: string;
  game_type: string;
  event_id: string;
  time_code: string;
}
