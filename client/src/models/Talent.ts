import {Activation, type Talent, TalentTier} from "../api/model";

export const emptyTalent = {
    id: '',
    name: '',
    description: '',
    summary: '',
    activation: Activation.Passive,
    tier: TalentTier.First,
    ranked: false,
} as Talent;