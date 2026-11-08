import { cleanHtml } from "../../shared/clean-html";
import { ExternalPool } from "./types";

export class PoolExtractor {
  private readonly poolsHtml: string;
  readonly pools: ExternalPool[];

  constructor(html: string) {
    // ÉTAPE 1 : Extraire uniquement le sous-arbre HTML du tableau des compétitions.
    // Gère "Accès direct aux Compétitions du Comité Départemental", "de la Ligue Régionale", etc.
    const tableMatch = html.match(
      /Accès direct aux Compétitions[\s\S]*?<\/table>/i,
    );

    if (!tableMatch) {
      console.warn(
        "⚠️ Repère 'Accès direct aux Compétitions' introuvable, tentative sur la page complète.",
      );
    }

    this.poolsHtml = tableMatch ? tableMatch[0] : html;

    this.pools = this.extractPools();
  }

  private extractPools(): ExternalPool[] {
    if (!this.poolsHtml) {
      console.error("No html souce for pools");
      return [];
    }

    const poulesMap = new Map<string, string>();
    // ÉTAPE 2 : Extraire les codes et libellés des poules depuis ce sous-ensemble ciblé
    const linkRegex =
      /<a[^>]+href=["'][^"']*vbspo_calendrier\.php\?[^"']*poule=([A-Z0-9]+)[^"']*["'][^>]*>([\s\S]*?)<\/a>/gi;

    let match: RegExpExecArray | null;

    while ((match = linkRegex.exec(this.poolsHtml)) !== null) {
      const code = match[1].trim();
      const label = cleanHtml(match[2]);

      if (code && !poulesMap.has(code)) {
        poulesMap.set(code, label || code);
      }
    }

    return Array.from(poulesMap.entries()).map(([code, name]) => ({
      code,
      name,
    }));
  }
}
