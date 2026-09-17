import { ExternalGame, ExternalWeekGames } from './external';

export interface Game {
  date: string;
  time: string;
  team1Name: string;
  team2Name: string;
  isPlayed: boolean;
  location: string | null;
  scores: { team1Score: number; team2Score: number } | null;
  setsScore: {
    allScore: string[];
    set1: string;
    set2: string;
    set3: string;
    set4: string | null;
    set5: string | null;
  } | null;
}

export interface WeekGames {
  week: string;
  games: Game[];
}

export const convertToGames = (externalGames: ExternalGame[]): Game[] =>
  externalGames.map(convertGame);

export const convertToGame = (externalGame: ExternalGame | null): Game | null => {
  if (!externalGame) {
    return null;
  }

  return convertGame(externalGame);
};

const convertGame = (externalGame: ExternalGame): Game => {
  const isPlayed = (externalGame.team1_score ?? 0) > 0 || (externalGame.team2_score ?? 0) > 0;
  return {
    date: externalGame.date,
    time: externalGame.time,
    location: externalGame.location,
    team1Name: externalGame.team1,
    team2Name: externalGame.team2,
    isPlayed,
    scores: isPlayed
      ? { team1Score: externalGame.team1_score!, team2Score: externalGame.team2_score! }
      : null,
    setsScore: isPlayed
      ? {
          allScore: [
            externalGame.set1,
            externalGame.set2,
            externalGame.set3,
            externalGame.set4,
            externalGame.set5,
          ].filter((s) => s !== null),
          set1: externalGame.set1!,
          set2: externalGame.set2!,
          set3: externalGame.set3!,
          set4: externalGame.set4,
          set5: externalGame.set5,
        }
      : null,
  };
};

export const convertToWeekGames = (externalWeekGames: ExternalWeekGames[]): WeekGames[] =>
  externalWeekGames.map(convertToWeekGame);

const convertToWeekGame = (externalWeekGame: ExternalWeekGames): WeekGames => {
  const games = convertToGames(externalWeekGame.games);
  return { week: externalWeekGame.week, games: games };
};
