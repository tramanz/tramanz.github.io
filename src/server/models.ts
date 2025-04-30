export interface Player {
  id: string;
  display_name: string;
}

export interface Match {
  id: string;
  index: number;
  date: string;
  player1?: Player;
  player2?: Player;
  player1_score?: number;
  player2_score?: number;
}

export enum RoundType {
  RoundRobin = "round-robin",
  TopTier = "top-tier",
  MediumTier = "medium-tier",
  LowTier = "low-tier",
}

export interface Round {
  id: string;
  index: number;
  matches: Match[];
  type: RoundType;
}

export interface Tournament {
  id: string;
  rounds: Round[];
}
