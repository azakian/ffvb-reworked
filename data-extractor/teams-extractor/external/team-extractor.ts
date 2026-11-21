import { cleanHtml } from "../../shared/clean-html";
import { ExternalTeam } from "./types";

export class TeamExtractor {
  private readonly html: string;
  readonly teams: ExternalTeam[] = [];

  // Expose l'URL si la page analysée est un Frameset
  readonly innerFrameUrl: string | null = null;

  constructor(html: string) {
    this.html = html;

    // 1. Détection du Frameset
    // Les pages nationales chargent souvent le calendrier via une iframe/frame
    const frameMatch =
      /<frame[^>]*name=["']calendrier["'][^>]*src=["']([^"']+)["']/i.exec(
        this.html,
      );

    if (frameMatch) {
      // On décode les `&amp;` potentiels en `&` pour avoir une URL valide
      this.innerFrameUrl = frameMatch[1].replace(/&amp;/g, "&");
      console.warn(
        `⚠️ Frameset détecté. Le script doit suivre cette URL : ${this.innerFrameUrl}`,
      );
    } else {
      // 2. Si ce n'est pas un Frameset, on extrait normalement les équipes
      this.teams = this.extractTeams();
    }
  }

  private extractTeams(): ExternalTeam[] {
    if (!this.html) {
      console.error("No html source for teams");
      return [];
    }

    const teams: ExternalTeam[] = [];

    // L'expression régulière cible spécifiquement les lignes (<tr>) du tableau de classement :
    // - Colonne 1 : Le numéro du rang (suivi d'un point, ex: "1.")
    // - Colonne 2 : Le nom de l'équipe
    const rowRegex =
      /<tr[^>]*>\s*<td[^>]*align=["']right["'][^>]*>\s*(\d+)\.\s*<\/td>\s*<td[^>]*>\s*(.*?)\s*<\/td>/gi;

    let match: RegExpExecArray | null;

    while ((match = rowRegex.exec(this.html)) !== null) {
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
