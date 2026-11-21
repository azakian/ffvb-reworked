import { Displayer } from "../../shared/displayer";
import { ExternalTeamEntry } from "../external/types";

export class TerminalDisplayer implements Displayer {
  present(data: ExternalTeamEntry[]): void | Promise<void> {
    console.table(data);
  }

  presentTop(data: ExternalTeamEntry[]): void | Promise<void> {
    const topData = data.slice(0, 30);
    this.present(topData);
  }
}
