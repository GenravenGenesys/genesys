import { ActorSkill } from "../../actor/Actor"
import { Difficulty } from "../../common/Difficulty"
import { RangeBand } from "../../common/RangeBand"

export default interface Action {
    skill: ActorSkill
    difficulty: Difficulty
    opposedSkill: ActorSkill
    range: RangeBand
}