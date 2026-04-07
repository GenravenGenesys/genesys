import type { AdversarySkill } from './adversarySkill';
import type { Difficulty } from './difficulty';
import type { PlayerSkill } from './playerSkill';
import type { StatusEffect } from './statusEffect';

export interface TalentSkillCheck {
  skill: PlayerSkill;
  difficulty: Difficulty;
  opposedSkill: AdversarySkill;
  /** Condition inflicted on the opponent when the check succeeds */
  onSuccessCondition?: StatusEffect;
}
