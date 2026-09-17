export const EXTERNAL_DATA_URL_CACHE = {
  'CD1 - 2026/2027':
    'https://www.ffvbbeach.org/ffvbapp/resu/vbspo_calendrier.php?saison=2026%2F2027&codent=PTPL44&poule=CD1&division=&tour=&calend=COMPLET&x=31&y=15',
  'CE1 - 2025/2026':
    'https://www.ffvbbeach.org/ffvbapp/resu/vbspo_calendrier.php?saison=2025/2026&codent=PTPL44&poule=CE1',
  'LD2 - 2025/2026':
    'https://www.ffvbbeach.org/ffvbapp/resu/vbspo_calendrier.php?saison=2025/2026&codent=PTPL44&poule=LD2',
  'CF1 - 2024/2025':
    'https://www.ffvbbeach.org/ffvbapp/resu/vbspo_calendrier.php?saison=2024/2025&codent=PTPL44&poule=CF1',
  'LE2 - 2024/2025':
    'https://www.ffvbbeach.org/ffvbapp/resu/vbspo_calendrier.php?saison=2024/2025&codent=PTPL44&poule=LE2',
  'LF2 - 2023/2024':
    'https://www.ffvbbeach.org/ffvbapp/resu/vbspo_calendrier.php?saison=2023/2024&codent=PTPL44&poule=LF2',
} as const satisfies Record<string, string>;

export const TEAMS = {
  VBL1: 'VBL1',
  VBL2: 'VBL2',
  VBL3: 'VBL3',
  VB_ELLES: 'VB.ELLES',
};

export type Team = (typeof TEAMS)[keyof typeof TEAMS];

export const TEAMS_URL = {
  [TEAMS.VBL1]: [
    {
      year: '2026/2027',
      seasonPhase: 1,
      url: 'https://www.ffvbbeach.org/ffvbapp/resu/vbspo_calendrier.php?saison=2026%2F2027&codent=PTPL44&poule=CD1&division=&tour=&calend=COMPLET&x=31&y=15',
    },
    {
      year: '2025/2026',
      seasonPhase: 2,
      url: 'https://www.ffvbbeach.org/ffvbapp/resu/vbspo_calendrier.php?saison=2025/2026&codent=PTPL44&poule=LD2',
    },
  ],
  [TEAMS.VBL2]: [
    {
      year: '2026/2027',
      seasonPhase: 1,
      url: 'https://www.ffvbbeach.org/ffvbapp/resu/vbspo_calendrier.php?saison=2026%2F2027&codent=PTPL44&poule=CF1&division=&tour=&calend=COMPLET&x=24&y=35',
    },
  ],
  [TEAMS.VBL3]: [
    {
      year: '2026/2027',
      seasonPhase: 1,
      url: 'https://www.ffvbbeach.org/ffvbapp/resu/vbspo_calendrier.php?saison=2026%2F2027&codent=PTPL44&poule=CF1&division=&tour=&calend=COMPLET&x=24&y=35',
    },
  ],
  [TEAMS.VB_ELLES]: [
    {
      year: '2026/2027',
      seasonPhase: 1,
      url: 'https://www.ffvbbeach.org/ffvbapp/resu/vbspo_calendrier.php?saison=2026%2F2027&codent=PTPL44&poule=CY2&division=&tour=&calend=COMPLET&x=37&y=20',
    },
  ],
} as const satisfies Record<string, { year: string; seasonPhase: 1 | 2; url: string }[]>;
