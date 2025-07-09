import { ActorSkill } from "../../actor/Actor"
import { CharacteristicType } from "../../actor/Characteristic"
import { SkillType } from "../../actor/Skill"
import { Difficulty } from "../../common/Difficulty"
import { RangeBand } from "../../common/RangeBand"

export default interface Action {
    skill: ActorSkill
    difficulty: Difficulty
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
  difficulty: Difficulty.Average,
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
