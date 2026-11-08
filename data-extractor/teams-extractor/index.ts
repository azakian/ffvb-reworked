import { TeamCsvDisplayer } from "./displayer/csv-displayer";
import { TerminalDisplayer } from "./displayer/terminal-displayer";
import { scrapTeams } from "./external/orchestrator";

async function main() {
  console.log("Extracting teams...");
  const teams = await scrapTeams();
  const displayer = new TerminalDisplayer();
  displayer.presentTop(teams);

  const csvDisplayer = new TeamCsvDisplayer();
  csvDisplayer.present(teams);
}

main().catch(console.error);
