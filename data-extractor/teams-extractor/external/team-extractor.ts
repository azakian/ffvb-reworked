import { cleanHtml } from "../../shared/clean-html";
import { ExternalTeam } from "./types";

export class TeamExtractor {
  private readonly teamHtml: string;
  readonly teams: ExternalTeam[] = [];

  constructor(html: string) {
    this.teamHtml = html;
    this.teams = this.extractTeams();
  }

  private extractTeams(): ExternalTeam[] {
    if (!this.teamHtml) {
      console.error("No html souce for pools");
      return [];
    }
    const teams: ExternalTeam[] = [];

    // L'expression régulière cible spécifiquement les lignes (<tr>) du tableau de classement :
    // - Colonne 1 : Le numéro du rang (suivi d'un point, ex: "1.")
    // - Colonne 2 : Le nom de l'équipe
    const rowRegex =
      /<tr[^>]*>\s*<td[^>]*align=["']right["'][^>]*>\s*(\d+)\.\s*<\/td>\s*<td[^>]*>\s*(.*?)\s*<\/td>/gi;
    let match: RegExpExecArray | null;

    while ((match = rowRegex.exec(this.teamHtml)) !== null) {
      const rankStr = match[1];
      let teamName = match[2];

      // Nettoyage de sécurité s'il y a des balises inattendues ou des espaces résiduels
      teamName = cleanHtml(teamName).trim();

      if (teamName) {
        teams.push({
          rank: parseInt(rankStr, 10),
          name: teamName,
        });
      }
    }
    return teams;
  }
}
