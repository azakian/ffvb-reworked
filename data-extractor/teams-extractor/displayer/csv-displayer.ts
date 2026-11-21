import { Displayer } from "../../shared/displayer";
import { ExternalTeamEntry } from "../external/types";
// @ts-ignore
import * as fs from "fs";

export class TeamCsvDisplayer implements Displayer {
  private readonly outputDir = "files";

  present(data: ExternalTeamEntry[]): void | Promise<void> {
    const csvContent = this.formatCsv(data);
    const fileName = this.formatFileName(data);
    this.writeFile(fileName, csvContent);
  }

  private formatCsv(data: ExternalTeamEntry[]) {
    const columns: { header: string; key: keyof ExternalTeamEntry }[] = [
      { header: "teamName", key: "teamName" },
      { header: "season", key: "saison" },
      { header: "codent", key: "codent" },
      { header: "poolCode", key: "poolCode" },
      { header: "poolName", key: "poolName" },
      { header: "poolUrl", key: "poolUrl" },
    ];

    const headerRow = columns.map((col) => col.header).join(",");
    const rows = data.map((r) =>
      columns.map((col) => r[col.key] ?? "").join(","),
    );

    const csvContent = [headerRow, ...rows].join("\n");
    return csvContent;
  }

  private formatFileName(data: ExternalTeamEntry[]): string {
    const firstElement = data.at(0);
    if (!firstElement) {
      console.error("No data can't build file name");
      throw Error("No data can't build file name");
    }

    return `${firstElement.saison}_${firstElement.codent}`
      .toLocaleLowerCase()
      .replace("/", "_");
  }

  private writeFile(fileName: string, csvContent: string) {
    const dir = "files";

    // Create the directory if it does not exist
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const _timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const _fullFileName = `${fileName}_${_timestamp}.csv`;
    const _filePath = `${dir}/${_fullFileName}`;

    fs.writeFileSync(_filePath, csvContent, "utf8");
    console.log(`Fichier CSV généré: ${fileName}`);
  }
}
