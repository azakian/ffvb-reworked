import { getExternalData } from './external/fetch';
import { TEAMS } from './external/manifest';
import { TerminalPresenter } from './displayer/terminal-displayer';

async function main() {
  const old = await getExternalData(TEAMS.VBL1, '2025/2026', 2);
  const current = await getExternalData(TEAMS.VBL1, '2026/2027', 1);

  const displayer = new TerminalPresenter();
  // const supabase = new SupabasePresenter();

  // displayer.present(old);
  // displayer.present(current);

  // csv.present(current);
  displayer.present(old);
  displayer.present(current);
}

main().catch(console.error);
