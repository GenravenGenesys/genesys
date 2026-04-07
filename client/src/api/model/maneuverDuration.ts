export type ManeuverDuration = typeof ManeuverDuration[keyof typeof ManeuverDuration];

export const ManeuverDuration = {
  'End_of_Next_Turn': 'End of Next Turn',
  'Next_Check': 'Next Check',
  'Next_Turn': 'Next Turn',
  Scene: 'Scene',
  Encounter: 'Encounter',
  Permanent: 'Permanent',
} as const;
