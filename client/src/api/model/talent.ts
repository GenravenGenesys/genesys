import type { AbilityModifiers } from './abilityModifiers';
import type { Activation } from './activation';
import type { Cost } from './cost';
import type { Limit } from './limit';
import type { ManeuverData } from './maneuverData';
import type { StatModifiers } from './statModifiers';
import type { TalentRollModifiers } from './talentRollModifiers';
import type { TalentSkillCheck } from './talentSkillCheck';
import type { TalentSkills } from './talentSkills';
import type { Tier } from './tier';

/**
 * Setting-specific talents
 */
export interface Talent {
  id: string;
  /** @minLength 1 */
  name: string;
  activation: Activation;
  /** Additional activation types (e.g. talent usable as both Action and Maneuver) */
  activations?: Activation[];
  tier: Tier;
  ranked: boolean;
  summary: string;
  description: string;
  cost: Cost;
  limit: Limit;
  talentSkills: TalentSkills;
  statModifiers: StatModifiers;
  abilityModifiers: AbilityModifiers;
  talentSkillCheck: TalentSkillCheck;
  talentRollModifiers: TalentRollModifiers[];
  /** Configuration for talents that function as a maneuver activation */
  maneuverData?: ManeuverData;
}
