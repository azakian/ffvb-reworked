import { Team, TEAMS_URL } from './manifest';
import { DataExtractor } from './extractor';
import { ExternalData } from './types';

/**
 * Fetch ffvb website.
 */
async function _getExternalData(url: string): Promise<string> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Erreur lors du chargement de l'URL : ${response.statusText}`);
  }
  const buffer = await response.arrayBuffer();
  return new TextDecoder('iso-8859-1').decode(buffer);
}

function getUrl(team: Team, year: string, seasonPhase: 1 | 2): string | undefined {
  return TEAMS_URL[team].find(
    (manifest) => manifest.year === year && manifest.seasonPhase === seasonPhase,
  )?.url;
}

export async function getExternalData(
  team: Team,
  year: string,
  seasonPhase: 1 | 2,
): Promise<ExternalData> {
  console.log(`Data for ${team} not found in cache. Fetching from URL...`);
  const url = getUrl(team, year, seasonPhase);

  if (!url) {
    throw new Error(`No URL found for key: ${team} ${year} phase ${seasonPhase}`);
  }

  const rawData = await _getExternalData(url);
  const rawHtml = rawData.replace(/<\/?form[^>]*>/gi, ''); // Nettoyage HTML

  const data = new DataExtractor(rawHtml);

  // EXTERNAL_DATA_CACHE[key] = new ExternalData(url, year, pool, data.rankingData, data.matchData);
  return { team, year, seasonPhase, games: data.gameByWeeks, ranking: data.rankings };
}
