import type { CheckTarget } from './checkTarget';
import type { DefenseType } from './defenseType';

export interface DefenseModifier {
  /** Whether this is a melee or ranged defense bonus */
  defenseType: DefenseType;
  /** Amount added to the specified defense (positive = bonus, negative = penalty) */
  amount: number;
  /** Whether this modifier applies to the performer (Self) or the maneuver's target (Opponent) */
  appliesTo: CheckTarget;
}
