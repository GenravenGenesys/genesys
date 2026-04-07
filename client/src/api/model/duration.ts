export type Duration = typeof Duration[keyof typeof Duration];

export const Duration = {
  Permanent: 'Permanent',
  Scene: 'Scene',
  Encounter: 'Encounter',
  'End_of_Next_Turn': 'End of Next Turn',
  'Next_Check': 'Next Check',
  'Next_Turn': 'Next Turn',
} as const;
