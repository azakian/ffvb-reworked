import { cleanHtml } from "../../shared/clean-html";
import { ExternalPool } from "./types";

export class NationalPoolExtractor {
  readonly pools: ExternalPool[];

  constructor(html: string) {
    this.pools = this.extractPools(html);
  }

  private extractPools(html: string): ExternalPool[] {
    if (!html) {
      console.error("No HTML source for pools");
      return [];
    }

    const poulesMap = new Map<string, { name: string; url: string }>();

    // Groupe 1 : URL complète contenue dans le href
    // Groupe 2 : Code de la poule (ex: efa, 3fa, etc.)
    // Groupe 3 : Libellé brut à nettoyer
    const linkRegex =
      /<a[^>]+href=["']([^"']*\/index_([a-z0-9]+)\.htm)["'][^>]*>([\s\S]*?)<\/a>/gi;

    let match: RegExpExecArray | null;

    while ((match = linkRegex.exec(html)) !== null) {
      const url = match[1].trim();
      const code = match[2].trim().toUpperCase();
      const name = cleanHtml(match[3]);

      if (code && !poulesMap.has(code)) {
        poulesMap.set(code, {
          name: name || code,
          url,
        });
      }
    }

    if (poulesMap.size === 0) {
      console.warn("⚠️ Aucune poule nationale extraite.");
    }

    return Array.from(poulesMap.entries()).map(([code, data]) => ({
      code,
      name: data.name,
      url: data.url,
    }));
  }
}
