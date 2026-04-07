export type StatusEffectType = typeof StatusEffectType[keyof typeof StatusEffectType];

export const StatusEffectType = {
  Disoriented: 'Disoriented',
  Immobilized: 'Immobilized',
  Staggered: 'Staggered',
} as const;
