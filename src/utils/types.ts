type LeagueType = "NCAA" | "Pro" | "G-League" | "NBL" | string;

interface PlayerBio {
  name: string;
  playerId: number;
  firstName: string;
  lastName: string;
  birthDate: string; // ISO format e.g., "2006-12-21"
  height: number; // in inches
  weight: number; // in pounds
  highSchool: string | null;
  highSchoolState: string | null;
  homeTown: string;
  homeState: string | null;
  homeCountry: string;
  nationality: string;
  photoUrl: string | null;
  currentTeam: string;
  league: string;
  leagueType: "NCAA" | "Pro" | "G-League" | string;
}

interface ScoutRanking {
  playerId: number;
  "ESPN Rank": number | null;
  "Sam Vecenie Rank": number | null;
  "Kevin O'Connor Rank": number | null;
  "Kyle Boone Rank": number | null;
  "Gary Parrish Rank": number | null;
}

interface PlayerMeasurements {
  playerId: number;
  heightNoShoes?: number | null;  // in inches
  heightShoes?: number | null;    // in inches
  wingspan?: number | null;       // in inches
  reach?: number | null;          // standing reach in inches
  maxVertical?: number | null;    // vertical leap in inches
  noStepVertical?: number | null; // vertical leap without step
  weight?: number | null;         // in pounds
  bodyFat?: number | null;        // percentage
  handLength?: number | null;     // in inches
  handWidth?: number | null;      // in inches
  agility?: number | null;        // seconds
  sprint?: number | null;         // seconds
  shuttleLeft?: number | null;    // seconds
  shuttleRight?: number | null;   // seconds
  shuttleBest?: number | null;    // seconds
}

interface GameLog {
  playerId: number;
  gameId: number;
  season: number;
  league: string;
  date: string; // ISO format e.g., "2025-04-05 00:00:00"
  team: string;
  teamId: number;
  opponentId: number;
  isHome: number | null; // 1 for true, 0 for false
  opponent: string;
  homeTeamPts: number;
  visitorTeamPts: number;
  gp: number; // games played
  gs: number; // games started
  timePlayed: string; // format "MM:SS"
  fgm: number; // field goals made
  fga: number; // field goals attempted
  tpm: number; // three-pointers made
  tpa: number; // three-pointers attempted
  ftm: number; // free throws made
  fta: number; // free throws attempted
  oreb: number; // offensive rebounds
  dreb: number; // defensive rebounds
  reb: number; // total rebounds
  ast: number; // assists
  stl: number; // steals
  blk: number; // blocks
  tov: number; // turnovers
  pf: number; // personal fouls
  pts: number; // points scored
  plusMinus: number; // plus/minus rating
  rn: number; // rank or order in the game log
}

interface SeasonLog {
  playerId: number; // Unique identifier for the player
  age: string; // Player's age as a string
  Season: number; // The season year (e.g., 2025)
  League: string; // The league in which the player participated
  Team: string; // The team the player was part of
  w: number; // Number of wins for the team in the season
  l: number; // Number of losses for the team in the season
  GP: number; // Games played by the player
  GS: number; // Games started by the player
  MP: number; // Minutes played by the player
  FGM: number; // Field goals made by the player
  FGA: number; // Field goals attempted by the player
  "FG%": number; // Field goal percentage
  FG2M: number; // Two-point field goals made
  FG2A: number; // Two-point field goals attempted
  "FG2%": number; // Two-point field goal percentage
  "eFG%": number; // Effective field goal percentage
  "3PM": number; // Three-point field goals made
  "3PA": number; // Three-point field goals attempted
  "3P%": number; // Three-point field goal percentage
  FT: number; // Free throws made
  FTA: number; // Free throws attempted
  FTP: number; // Free throw percentage
  ORB: number; // Offensive rebounds
  DRB: number; // Defensive rebounds
  TRB: number; // Total rebounds
  AST: number; // Assists made by the player
  STL: number; // Steals made by the player
  BLK: number; // Blocks made by the player
  TOV: number; // Turnovers committed by the player
  PF: number; // Personal fouls committed by the player
  PTS: number; // Total points scored by the player
}

interface InternProjectData {
  bio: PlayerBio[];
  scoutRankings: ScoutRanking[];
  measurements: PlayerMeasurements[];
  gameLogs: GameLog[];
  seasonLogs: SeasonLog[];
}

interface FullPlayerData {
  playerId: number;
  playerBio: PlayerBio;
  gameLogs: GameLog[];
  seasonLog?: SeasonLog;
  scoutRanking?: ScoutRanking;
  measurements?: PlayerMeasurements;
}

export type { LeagueType, PlayerBio, ScoutRanking, PlayerMeasurements, InternProjectData, SeasonLog, GameLog, FullPlayerData };