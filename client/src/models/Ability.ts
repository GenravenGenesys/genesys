import {Activation} from "./Talent";
import Modifier from "./common/Modifier";
import Cost from "./common/Cost";
import Limit from "./common/Limit";
import Action from "./campaign/encounter/Action";

export default interface Ability {
    name: string
    description: string
    activation: Activation
    cost: Cost
    limiter: Limit
    action: Action
    modifiers: Modifier[]
}