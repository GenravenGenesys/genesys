import type {Action, Activation, Cost, Limit, Modifier} from "../api/model";


export default interface Ability {
    name: string
    description: string
    activation: Activation
    cost: Cost
    limiter: Limit
    action: Action
    modifiers: Modifier[]
}