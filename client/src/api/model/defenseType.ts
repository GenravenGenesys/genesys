export type DefenseType = typeof DefenseType[keyof typeof DefenseType];

export const DefenseType = {
  Melee: 'Melee',
  Ranged: 'Ranged',
} as const;
