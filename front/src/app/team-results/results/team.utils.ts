export const checkTeamName = (team1Name: string, team2Name: string): boolean => {
  return team1Name.localeCompare(team2Name, undefined, { sensitivity: 'base' }) === 0;
};
