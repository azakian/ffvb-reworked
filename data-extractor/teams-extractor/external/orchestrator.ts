import {
  CODENT,
  providePoolsData,
  provideTeamsData,
  SAISON,
} from "./data-providers";
import { PoolExtractor } from "./pool-extractor";
import { TeamExtractor } from "./team-extractor";
import { ExternalTeamEntry } from "./types";

export async function scrapTeams(): Promise<ExternalTeamEntry[]> {
  const poolsHtml = await providePoolsData(SAISON, CODENT);
  const poolsExtractor = new PoolExtractor(poolsHtml);

  const allEntries: ExternalTeamEntry[] = [];

  for (let i = 0; i < poolsExtractor.pools.length; i++) {
    // for (let i = 0; i < 10; i++) {
    const poule = poolsExtractor.pools[i];

    try {
      const teamsHtml = await provideTeamsData(SAISON, CODENT, poule.code);
      const teamsExtractor = new TeamExtractor(teamsHtml);

      allEntries.push(
        ...teamsExtractor.teams.map((team) => ({
          saison: SAISON,
          codent: CODENT,
          poolCode: poule.code,
          poolName: poule.name,
          teamName: team.name,
        })),
      );
    } catch (err: any) {
      console.log(`Erreur: ${err.message}`);
    }

    // Temporisation polie pour le serveur FFVB
    await new Promise((res) => setTimeout(res, 500));
  }

  return allEntries;
}
