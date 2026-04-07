import type { DefenseModifier } from './defenseModifier';
import type { DiceModifier } from './diceModifier';
import type { ManeuverDuration } from './maneuverDuration';
import type { ManeuverTarget } from './maneuverTarget';
import type { ResultsModifier } from './resultsModifier';
import type { Skill } from './skill';

export interface ManeuverData {
  /** Who this maneuver targets */
  target: ManeuverTarget;
  /** How long the effects of this maneuver last */
  duration: ManeuverDuration;
  /** Whether multiple uses of this maneuver stack (e.g., assist maneuver) */
  stackable: boolean;
  /** Maximum number of targets affected. Ignored when targetCountSkill is set. */
  maxTargets: number;
  /**
   * When set, the number of targets equals the performer's current rank in this skill
   * (e.g., Leadership for Coordinated Assault). Overrides maxTargets.
   */
  targetCountSkill?: Skill;
  /** When true, the effective range increases by one band per additional rank in the talent. */
  rangeScalesWithRank: boolean;
  /**
   * Dice added to affected characters' pools.
   * checkTarget=Self → performer; checkTarget=Opponent → maneuver's target(s).
   */
  diceModifiers: DiceModifier[];
  /**
   * Fixed result symbols (advantage, success, etc.) added to affected characters' checks.
   * checkTarget=Self → performer; checkTarget=Opponent → maneuver's target(s).
   */
  resultsModifiers: ResultsModifier[];
  /** Defense bonuses or penalties applied when this maneuver is performed. */
  defenseModifiers: DefenseModifier[];
}
