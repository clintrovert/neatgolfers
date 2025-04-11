export class RoundScores {
  prior: any;
  fantasy: number;
  total: number | null;
  roundStatus: string;
  teetime: string;
  scores: (number | null)[];
}

export class Player {
  id: string;
  display_name: string;
  display_name2: string;
  first_name: string;
  last_name: string;
  full_name: string;
  countryName: string;
  countryCode: string;
  live: string;
  video: boolean;
  pos: string;
  image: boolean;
  amateur: boolean;
  past: boolean;
  firsttimer: boolean;
  status: string;
  newStatus: string;
  active: boolean;
  us: boolean;
  intl: boolean;
  teetime: string;
  epoch: number;
  tee_order: string;
  sort_order: string;
  start: string;
  group: string;
  today: string;
  thru: string;
  groupHistory: string;
  thruHistory: string;
  lastHoleWithShot: string;
  holeProgress: number;
  topar: string;
  total: string;
  totalUnderPar: string;
  movement: string;
  last_highlight: string;
  round1: RoundScores;
  round2: RoundScores;
  round3: RoundScores;
  round4: RoundScores;
  posint: number;
  boy: string;
}

export class YardageOrPars {
  round1: number[];
  round2: number[];
  round3: number[];
  round4: number[];
}

export class TournamentData {
  currentRound: string;
  wallClockTime: string;
  statusRound: string;
  yardages: YardageOrPars;
  pars: YardageOrPars;
  player: Player[];
}

export class TournamentRoot {
  fileEpoch: string;
  data: TournamentData;
}