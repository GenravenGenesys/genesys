export type Target = typeof Target[keyof typeof Target];

export const Target = {
  Self: 'Self',
  Opponent: 'Opponent',
  'Engaged_Ally': 'Engaged Ally',
  'Engaged_Enemy': 'Engaged Enemy',
  'Any_Ally': 'Any Ally',
  'Any_Enemy': 'Any Enemy',
} as const;
