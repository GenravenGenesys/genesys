import { ActorSkill } from "../../actor/Actor"
import { CharacteristicType } from "../../actor/Characteristic"
import { SkillType } from "../../actor/Skill"
import { DifficultyUI } from "../../common/DifficultyUI.ts"
import { RangeBand } from "../../common/RangeBand"

export default interface Action {
    skill: ActorSkill
    difficulty: DifficultyUI
    opposedSkill: ActorSkill
    rangeBand: RangeBand
}

export const getEmptyAction = (): Action => ({
  skill: {
      ranks: 0,
      id: "",
      characteristic: CharacteristicType.Brawn,
      type: SkillType.General,
      name: "",
      initiative: false
  },
  difficulty: DifficultyUI.Average,
  opposedSkill: {
      ranks: 0,
      id: "",
      characteristic: CharacteristicType.Brawn,
      type: SkillType.General,
      name: "",
      initiative: false
  },
  rangeBand: RangeBand.Engaged,
});
