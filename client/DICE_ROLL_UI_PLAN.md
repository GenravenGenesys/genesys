# Dice Roll → Spend → Resolve UI Plan

## Context
The backend owns all encounter state. The UI drives three sequential phases:
**roll → spend → resolve** using three POST endpoints. The UI holds zero game state
between phases — it only passes IDs and choices.

---

## API Contract

| Phase           | Method + URL                   | Request Body            | Response                |
|-----------------|-------------------------------|-------------------------|-------------------------|
| Encounter start | POST /api/dice/encounter/start | `Participant[]`         | `{ status, participants }` |
| Melee roll      | POST /api/dice/combat/melee   | `CombatRollRequest`     | `RollEvaluationResponse` |
| Ranged roll     | POST /api/dice/combat/ranged  | `CombatRollRequest`     | `RollEvaluationResponse` |
| Resolve spends  | POST /api/dice/resolve        | `ResolveChoicesRequest` | `CombatLogEntry`        |

### CombatRollRequest
```json
{
  "attackerId": "string",
  "weaponInstanceId": "string",
  "targetEnemyInstanceId": "string",
  "environmentalSetbackDice": 0,
  "situationalBoostDice": 0
}