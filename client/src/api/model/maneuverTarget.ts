export type ManeuverTarget = typeof ManeuverTarget[keyof typeof ManeuverTarget];

export const ManeuverTarget = {
  Self: 'Self',
  'Engaged_Ally': 'Engaged Ally',
  'Engaged_Enemy': 'Engaged Enemy',
  'Any_Ally': 'Any Ally',
  'Any_Enemy': 'Any Enemy',
} as const;
