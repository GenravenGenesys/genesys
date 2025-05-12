import {Option} from "../../components/common/InputSelectField";

export default interface Cost {
    type: CostType
    amount: number
    ranked: boolean
}

export enum CostType {
    None = 'None',
    Strain = 'Strain',
    StoryPoint = 'Story Point'
}

export const getCostOptions = (): Option[] => {
    return Object.values(CostType).map((value) => ({value}))
}

export class DefaultCost {
    static create(): Cost {
        return {
            type: CostType.None,
            amount: 0,
            ranked: false,
        }
    }
}