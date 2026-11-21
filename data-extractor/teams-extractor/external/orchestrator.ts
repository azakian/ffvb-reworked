import {
  provideNationalPoolsData,
  provideNationalTeamsData,
  providePoolsData,
  SAISON,
} from "./data-providers";
import { NationalPoolExtractor } from "./national-pool-extractor";
import { PoolExtractor } from "./pool-extractor";
import { TeamExtractor } from "./team-extractor";
import { ExternalPool, ExternalTeamEntry } from "./types";

export async function scrapNationalTeams(): Promise<ExternalTeamEntry[]> {
  const poolsHtml = await provideNationalPoolsData();
  const poolsExtractor = new NationalPoolExtractor(poolsHtml);
  return scrapPoolsTeams(poolsExtractor.pools, "National");
}

export async function scrapRegionalTeams(
  codent: string,
): Promise<ExternalTeamEntry[]> {
  const poolsHtml = await providePoolsData(SAISON, codent);
  const poolsExtractor = new PoolExtractor(poolsHtml, SAISON, codent);
  return scrapPoolsTeams(poolsExtractor.pools, codent);
}

async function scrapPoolsTeams(
  pools: ExternalPool[],
  codent: string,
): Promise<ExternalTeamEntry[]> {
  if (!pools.length) {
    console.error(`❌ No pools for ${codent}`);
    return [];
  }

  console.table(pools);
  const allEntries: ExternalTeamEntry[] = [];

  for (const poule of pools) {
    try {
      let teamsHtml = await provideNationalTeamsData(poule.url);
      let teamsExtractor = new TeamExtractor(teamsHtml);
      let rankingUrl = poule.url;

      // Si la page est un frameset, on résout l'URL de la frame et on charge la vraie page
      if (teamsExtractor.innerFrameUrl) {
        rankingUrl = new URL(teamsExtractor.innerFrameUrl, poule.url).href;
        teamsHtml = await provideNationalTeamsData(rankingUrl);
        teamsExtractor = new TeamExtractor(teamsHtml);
      }

      if (teamsExtractor.teams.length === 0) {
        console.warn(`⚠️ Aucune équipe trouvée pour la poule ${poule.code}`);
      } else {
        console.log(`✅ ${teamsExtractor.teams.length} équipe(s) extraite(s)`);
      }

      allEntries.push(
        ...teamsExtractor.teams.map((team) => ({
          saison: SAISON,
          codent,
          poolCode: poule.code,
          poolName: poule.name,
          poolUrl: rankingUrl,
          teamName: team.name,
        })),
      );
    } catch (err: any) {
      console.error(`❌ Erreur sur la poule ${poule.code}: ${err.message}`);
    }

    // Temporisation polie pour le serveur FFVB
    await new Promise((res) => setTimeout(res, 800));
  }
  return allEntries;
}
