import { fetchFfvb } from "../../shared/fetch-ffvb";
import { HTML } from "./types";

export const SAISON = "2026/2027";
export const CODENT = "PTPL44";
export const BASE_URL = "https://www.ffvbbeach.org/ffvbapp/resu";
export const POULE = "CD1";
export const USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64)";

export async function providePoolsData(
  season: string,
  codent: string,
): Promise<HTML> {
  const homeUrl = `${BASE_URL}/vbspo_home.php?saison=${encodeURIComponent(season)}&codent=${codent}`;
  console.log(`🔍 Extraction depuis : ${homeUrl}`);
  const html = await fetchFfvb(homeUrl);
  return html;
}

export async function provideTeamsData(
  season: string,
  codent: string,
  pool: string,
): Promise<HTML> {
  const url = `${BASE_URL}/vbspo_calendrier.php?saison=${encodeURIComponent(season)}&codent=${codent}&poule=${pool}`;
  console.log(`🔍 Extraction depuis : ${url}`);

  const html = await fetchFfvb(url);
  return html;
}
