import { TeamCsvDisplayer } from "./displayer/csv-displayer";
import { TerminalDisplayer } from "./displayer/terminal-displayer";
import { CODENTS } from "./external/data-providers";
import {
  scrapNationalTeams,
  scrapRegionalTeams,
} from "./external/orchestrator";
import { ExternalTeamEntry } from "./external/types";

const levels: { label: string; scrap: () => Promise<ExternalTeamEntry[]> }[] = [
  { label: "National", scrap: scrapNationalTeams },
  ...CODENTS.map((codent) => ({
    label: codent,
    scrap: () => scrapRegionalTeams(codent),
  })),
];

async function main() {
  const displayer = new TerminalDisplayer();
  const csvDisplayer = new TeamCsvDisplayer();

  for (const level of levels) {
    console.log(`Extracting teams for ${level.label}...`);
    const teams = await level.scrap();

    if (!teams.length) {
      console.error(`❌ failed to scrap teams for ${level.label}`);
      continue;
    }

    displayer.presentTop(teams);
    csvDisplayer.present(teams);
  }
}

main().catch(console.error);
